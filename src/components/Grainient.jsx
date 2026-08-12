import { useEffect, useRef } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import './Grainient.css'

const hexToRgb = (hex) => {
  const value = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return value ? value.slice(1).map((part) => parseInt(part, 16) / 255) : [1, 1, 1]
}

const vertex = `#version 300 es
in vec2 position;
void main(){gl_Position=vec4(position,0.,1.);}`

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution; uniform float iTime; uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3;
out vec4 fragColor;
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){
  vec2 uv=gl_FragCoord.xy/iResolution.xy;
  float t=iTime*.13;
  float wave=sin((uv.x+uv.y)*5.2+t)+cos(uv.x*4.1-t*.7);
  float blend=smoothstep(-.8,.9,wave);
  vec3 base=mix(uColor1,uColor2,smoothstep(.05,.95,uv.x+sin(uv.y*3.+t)*.12));
  vec3 color=mix(base,uColor3,blend*.28+smoothstep(.2,1.,uv.y)*.15);
  color+=(hash(uv*iResolution.xy*.35)-.5)*.025;
  fragColor=vec4(color,1.);
}`

export default function Grainient({ color1 = '#d8f6ff', color2 = '#a9c9ff', color3 = '#e6c8ff', className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    // 小屏设备（手机）跳过 WebGL 动画：滚动时持续渲染 WebGL 会拖垮
    // 移动端浏览器（尤其微信内置内核），导致卡顿甚至滚动位置异常跳顶。
    // 用静态渐变替代，观感接近且零开销。
    if (window.matchMedia('(max-width: 767px)').matches) {
      container.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 55%, ${color3} 100%)`
      return
    }
    const renderer = new Renderer({ webgl: 2, alpha: true, antialias: false, dpr: Math.min(devicePixelRatio || 1, 1.5) })
    const { gl } = renderer
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uColor1: { value: new Float32Array(hexToRgb(color1)) },
        uColor2: { value: new Float32Array(hexToRgb(color2)) },
        uColor3: { value: new Float32Array(hexToRgb(color3)) },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      renderer.setSize(Math.max(1, width), Math.max(1, height))
      program.uniforms.iResolution.value.set([gl.drawingBufferWidth, gl.drawingBufferHeight])
    }
    const observer = new ResizeObserver(resize)
    observer.observe(container)
    resize()
    container.appendChild(gl.canvas)
    let frame = 0
    let lastRender = 0
    const start = performance.now()
    const render = (time) => {
      frame = requestAnimationFrame(render)
      if (time - lastRender < 1000 / 30) return
      lastRender = time
      program.uniforms.iTime.value = (time - start) / 1000
      renderer.render({ scene: mesh })
    }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const setPlayback = () => {
      cancelAnimationFrame(frame)
      frame = 0
      if (!document.hidden && !reducedMotion) frame = requestAnimationFrame(render)
      else renderer.render({ scene: mesh })
    }
    document.addEventListener('visibilitychange', setPlayback)
    setPlayback()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener('visibilitychange', setPlayback)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      gl.canvas.remove()
    }
  }, [color1, color2, color3])

  return <div ref={containerRef} className={`grainient-container ${className}`.trim()} aria-hidden="true" />
}
