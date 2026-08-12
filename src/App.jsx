import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import GooeyNav from './components/GooeyNav'
import TextType from './components/TextType'
import TiltedCard from './components/TiltedCard'
import BorderGlow from './components/BorderGlow'
import DepthCarousel from './components/DepthCarousel'

const Grainient = lazy(() => import('./components/Grainient'))

const experiences = [
  {
    date: '2025.09 — 2025.11',
    company: '效果不错（重庆）文化传媒有限公司',
    role: '新媒体运营实习生',
    details: [
      '内容运营：参与小红书旅游账号日常运营，根据账号定位完成图文内容发布、文案优化及内容维护。',
      '用户互动：负责用户评论及私信回复，日均沟通 30+ 条，根据用户反馈了解用户需求，辅助优化内容方向。',
    ],
    stats: [
      ['30+', '日均评论及私信沟通'],
      ['图文内容', '发布、优化与维护'],
      ['用户反馈', '辅助优化内容方向'],
    ],
  },
  {
    date: '2024.06 — 2024.08',
    company: '深圳京华物业管理有限公司',
    role: '新媒体运营实习生',
    details: [
      '提升用户体验：负责企业微信公众号图文排版与日常维护，通过优化配色、布局及信息呈现方式，将用户阅读完成率提升约 30%。',
      '视觉内容设计：独立设计消防日主题板报等宣传物料，并负责多平台内容同步分发，累计精准触达用户超 1500 人次。',
      '活动内容支持：参与策划“安保夏日清凉”活动，负责活动方案 PPT 制作、物资清单整理及现场执行协助，活动覆盖 35+ 人次。',
    ],
    stats: [
      ['30%', '阅读完成率提升'],
      ['1500+', '多平台精准触达'],
      ['35+', '线下活动覆盖人次'],
    ],
  },
]

const projects = [
  {
    index: '01',
    title: '抖音干货分享账号',
    meta: '账号搭建 / 选题策划 / 文案改编 / 视频二创',
    award: '代表内容最高播放量 8,985',
    description:
      '围绕大学生活、成长规划和经验避坑策划内容，以统一的粉色 IP 形象和标题模板建立账号识别度。',
    image: '/assets/gallery/douyin-content-feed-new.jpg',
    gallery: [
      '/assets/gallery/douyin-content-feed-new.jpg',
      '/assets/gallery/douyin-content-detail.png',
      '/assets/gallery/douyin-content-detail-new.jpg',
    ],
    alt: '抖音大学生干货分享账号作品截图',
    className: 'project-card--phone',
  },
  {
    index: '02',
    title: '小红书干货分享账号',
    meta: '内容选题 / 图文排版 / 账号维护',
    award: '单篇最高浏览量 7,846 · 最高点赞 167 · 最高收藏 133',
    description:
      '围绕社交话术、解压方式、个性签名及生活娱乐等方向搭建内容矩阵，通过统一萌系 IP、洋红色标题栏与情绪化封面形成账号视觉识别。',
    image: '/assets/xiaohongshu-content-account.jpg',
    gallery: [
      '/assets/gallery/xhs-content-01.png',
      '/assets/gallery/xhs-content-replies.png',
    ],
    alt: '小红书生活干货分享账号作品截图',
    className: 'project-card--phone project-card--reverse',
  },
  {
    index: '03',
    title: '小红书好物账号',
    meta: '从零搭建 / 内容选题 / 素材二剪 / 账号运维',
    award: '账号粉丝 1,194 · 点赞与收藏 870',
    description:
      '独立完成好物内容生产与日常维护，通过复盘笔记互动数据持续迭代选题方向和内容表达。',
    image: '/assets/xiaohongshu-goods-operation.png',
    gallery: ['/assets/gallery/xhs-goods-01.jpeg', '/assets/gallery/xhs-goods-02.jpeg'],
    alt: '小红书个人好物账号运营作品展示',
    className: 'project-card--wide',
  },
  {
    index: '04',
    title: '抖音短视频二创账号',
    meta: '账号搭建 / 素材二剪 / 文案改编 / 发布运营',
    award: '单条最高播放量 1.7 万 · 账号获赞 1,431',
    description:
      '围绕影视娱乐热点进行选题，完成素材筛选、二次剪辑、文案改编及发布，根据播放与互动表现持续调整内容方向。',
    image: '/assets/douyin-remix-operation.png',
    gallery: [
      '/assets/gallery/douyin-remix-01.jpeg',
      '/assets/gallery/douyin-remix-02.jpeg',
      '/assets/gallery/douyin-remix-03.jpeg',
    ],
    alt: '抖音短视频二创账号运营作品展示',
    className: 'project-card--wide',
  },
  {
    index: '05',
    title: '美食公众号运营',
    meta: '选题撰稿 / 图文排版 / 发布复盘',
    award: '单篇最高阅读量 3,674 · 多篇内容获得推荐',
    description:
      '自主运营美食分享公众号，依据内容表现持续调整选题、图文节奏与发布策略。',
    image: '/assets/wechat-food-operation.png',
    gallery: [
      '/assets/gallery/wechat-food-01.jpeg',
      '/assets/gallery/wechat-food-02.png',
      '/assets/gallery/wechat-food-03.png',
    ],
    alt: '美食公众号运营作品与阅读数据展示',
    className: 'project-card--wide',
  },
  {
    index: '06',
    title: '消防主题宣传展板',
    meta: 'Photoshop / 信息整合 / 企业传播',
    award: '安全知识问卷正确率提升 25% · 复用于季度安全宣传',
    description:
      '为企业内部消防活动完成横幅、展板与知识材料的全流程视觉设计，统一现场传播信息。',
    image: '/assets/fire-safety-design.png',
    gallery: ['/assets/gallery/fire-design-01.jpeg', '/assets/gallery/fire-design-02.jpeg'],
    alt: '消防主题宣传展板设计作品',
    className: 'project-card--wide',
  },
  {
    index: '07',
    title: '小红书养生科普图文',
    meta: 'AI 辅助生成 / 知识整合 / Canva 排版',
    award: '统一萌系人物 IP 与系列化健康知识版式',
    description:
      '围绕颈椎舒缓与阳虚体质等主题组织科普信息，完成人物视觉、知识结构和长图排版。',
    image: '/assets/wellness-xhs-design.png',
    gallery: ['/assets/gallery/wellness-01.jpeg', '/assets/gallery/wellness-02.jpeg'],
    alt: '小红书养生主题科普长图作品',
    className: 'project-card--wide',
  },
]

const aiProjects = [
  {
    title: 'AI辅助个人作品集网站',
    meta: '需求规划 / 信息架构 / Codex辅助搭建 / 交互迭代',
    award: '从0-1完成个人作品集网站搭建与持续迭代',
    description:
      '从个人求职与作品展示需求出发，自主规划网站信息架构、内容模块与视觉方向，通过 Codex 辅助完成页面搭建，并根据实际展示效果持续优化内容结构与交互体验。',
    process: ['需求构思', '找视觉参考', '规划模块', 'Codex实现', '测试', '反馈修改', '最终页面'],
    image: '/assets/ai/portfolio-home.webp',
    gallery: [
      '/assets/ai/portfolio-home.jpg',
      '/assets/ai/codex-conversation.webp',
      '/assets/ai/resume-to-website.webp',
    ],
    alt: 'AI 辅助个人作品集网站搭建与迭代过程',
    className: 'project-card--wide',
  },
  {
    title: 'AI个人效率工作台',
    meta: '需求规划 / 功能设计 / AI辅助搭建 / 功能迭代',
    award: '集成学习管理、简历投递、习惯打卡与内容运营等多场景功能',
    description:
      '围绕个人学习、求职、运动与内容运营等日常需求，自主规划功能模块与使用流程，借助 AI 工具完成个人效率工作台搭建，并根据实际使用需求持续调整功能与交互。',
    image: '/assets/ai/workbuddy-01.webp',
    gallery: [
      '/assets/ai/workbuddy-01.webp',
      '/assets/ai/workbuddy-02.webp',
      '/assets/ai/workbuddy-03.webp',
      '/assets/ai/workbuddy-04.webp',
      '/assets/ai/workbuddy-05.webp',
      '/assets/ai/workbuddy-06.webp',
    ],
    alt: 'AI 个人效率工作台功能界面',
    className: 'project-card--wide project-card--reverse',
  },
]

const planningProjects = [
  {
    title: '404 青丝计划',
    meta: '品牌洞察 / 整合营销 / 数字互动 / 媒介预算',
    award: '敦煌文化 IP × 养元青 · 预热、爆破、长尾三阶段传播',
    description:
      '围绕 Z 世代脱发焦虑构建“404 青丝”传播符号，策划品牌短片、高校 H5、AR 互动、感应壁画与游戏小程序，并完成媒介排期与预算整合。',
    image: '/assets/planning/404-10.webp',
    gallery: [
      '/assets/planning/404-10.webp',
      '/assets/planning/404-12.webp',
      '/assets/planning/404-14.webp',
      '/assets/planning/404-18.webp',
      '/assets/planning/404-24.webp',
    ],
    alt: '404 青丝计划品牌洞察、传播节奏与互动方案内页',
    className: 'project-card--wide',
  },
  {
    title: '纳爱斯「草本护龈，愈见心声」',
    meta: '营销策划 / 用户互动 / AI 应用 / 渠道整合',
    award: '负责 02 营销策划：预热期、爆发期、延续期',
    description:
      '负责营销策划板块，设计悬念海报解谜、KOL 情感诊断、草本闯关、AI 笑容能量挑战、牙科联名及公益守护等分阶段活动。',
    image: '/assets/planning/naes-02.webp',
    gallery: [
      '/assets/planning/naes-02.webp',
      '/assets/planning/naes-11.webp',
      '/assets/planning/naes-12.webp',
      '/assets/planning/naes-14.webp',
      '/assets/planning/naes-15.webp',
      '/assets/planning/naes-16.webp',
    ],
    alt: '纳爱斯草本护龈营销策划职责、活动地图与分阶段方案内页',
    className: 'project-card--wide project-card--reverse',
  },
  {
    title: '银龄智环',
    meta: '项目统筹 / 用户调研 / 需求分析 / 路演答辩',
    award: '主要项目负责人 · 大创广西区赛铜奖 · “挑战杯”广西区赛三等奖',
    description:
      '统筹任务分配与项目进度，组织用户需求调研，完成计划书、需求分析报告和路演 PPT，并负责方案汇报与答辩协同。',
    image: '/assets/planning/silver-01.webp',
    gallery: [
      '/assets/planning/silver-01.webp',
      '/assets/planning/silver-05.webp',
      '/assets/planning/silver-06.webp',
      '/assets/planning/silver-07.webp',
      '/assets/planning/silver-09.webp',
      '/assets/planning/silver-20.webp',
    ],
    alt: '银龄智环项目负责人、用户痛点、解决方案与项目流程内页',
    className: 'project-card--wide',
  },
  {
    title: '悬浮智库',
    meta: '项目统筹 / 多感交互 / 教育场景 / 路演呈现',
    award: '主要项目负责人 · 广西大学生计算机设计大赛区赛三等奖',
    description:
      '担任项目负责人，统筹 AI 多感互动学习磁悬浮地球仪的方案梳理与路演呈现，围绕多感交互、3D 投影及 AI 辩论助手等功能组织教育场景与商业模式表达。',
    image: '/assets/planning/float-01.webp',
    gallery: [
      '/assets/planning/float-01.webp',
      '/assets/planning/float-05.webp',
      '/assets/planning/float-06.webp',
      '/assets/planning/float-08.webp',
      '/assets/planning/float-10.webp',
      '/assets/planning/float-14.webp',
    ],
    alt: '悬浮智库项目负责人、核心功能、学习场景与商业模式内页',
    className: 'project-card--wide project-card--reverse',
  },
]

const skills = [
  ['01', '内容策划', '选题洞察', '文案写作', '热点捕捉', '内容矩阵'],
  ['02', '账号运营', '小红书', '抖音', '微信公众号', '用户维护'],
  ['03', '视频创作', '摄影摄像', '剪映', '素材二创', '节奏与字幕'],
  ['04', '视觉设计', 'Photoshop', 'Canva', '秀米排版', 'PPT 视觉'],
  ['05', '数据与用户', '阅读量', '互动率', '涨粉数据', '反馈转化'],
  ['06', '语言与协作', 'CET-6', '计算机二级', '项目统筹', '跨团队沟通'],
]

const operationDirectories = [
  ['抖音账号', '短视频选题、二创与发布运营', 'ops-douyin', '01'],
  ['小红书账号', '内容矩阵、图文排版与账号维护', 'ops-xiaohongshu', '02'],
  ['公众号', '选题撰稿、图文编辑与数据复盘', 'ops-wechat', '03'],
]

const workDirectories = [
  ['AI 创作', 'AI个人作品集网站 / AI个人工作台', 'works-ai', '01'],
  ['视觉设计', '新媒体视觉物料合集', 'works-design', '02'],
  ['视频剪辑', '素材二创与节奏表达', 'works-video', '03'],
  ['项目策划', '营销方案、项目汇报与路演呈现', 'works-ppt', '04'],
]

const videoCollections = [
  ['01', 'AI 创作', '生成式视觉与品牌短片', [
    ['G-style', '/assets/videos/ai-g-style.mp4'],
    ['广西跑酷小游戏', '/assets/videos/ai-parkour.mp4'],
    ['领克 07GT', '/assets/videos/ai-lynk-07gt.mp4'],
    ['一瓦一木', 'https://zhu-yanfei-videos-1465406041.cos.ap-guangzhou.myqcloud.com/ai-wood.mp4'],
  ]],
  ['02', '二创剪辑', '素材重组、节奏设计与情绪表达', [
    ['二创作品 01', '/assets/videos/remix-01.mp4'],
    ['二创作品 02', '/assets/videos/remix-02.mp4'],
    ['二创作品 03', '/assets/videos/remix-03.mp4'],
    ['银河 E5', '/assets/videos/remix-galaxy-e5.mp4'],
  ]],
  ['03', '口播账号视频', '大学生活选题、文案与短视频包装', [
    ['宿舍关系：边界感比搞好关系重要', '/assets/videos/talk-dorm.mp4'],
    ['大一最容易挂的课', 'https://zhu-yanfei-videos-1465406041.cos.ap-guangzhou.myqcloud.com/talk-failed-courses.mp4'],
    ['社团和学生会到底要不要加？', '/assets/videos/talk-clubs.mp4'],
    ['实习、竞赛、科研、交换到底怎么选？', 'https://zhu-yanfei-videos-1465406041.cos.ap-guangzhou.myqcloud.com/talk-opportunity-choice.mp4'],
  ]],
  ['04', '微电影与短片', '叙事剪辑、音乐节奏与情绪氛围', [
    ['干杯 MV', 'https://zhu-yanfei-videos-1465406041.cos.ap-guangzhou.myqcloud.com/film-cheers-mv.mp4'],
    ['破茧', 'https://zhu-yanfei-videos-1465406041.cos.ap-guangzhou.myqcloud.com/film-breakthrough.mp4'],
    ['选择', 'https://zhu-yanfei-videos-1465406041.cos.ap-guangzhou.myqcloud.com/film-choice.mp4'],
    ['逐光', 'https://zhu-yanfei-videos-1465406041.cos.ap-guangzhou.myqcloud.com/film-light.mp4'],
  ]],
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M14 7l5 5-5 5" />
    </svg>
  )
}

function CloudDoodle({ className = '' }) {
  return (
    <svg className={`cloud-doodle ${className}`} viewBox="0 0 190 175" aria-hidden="true">
      <path d="M45 75c-18 0-31-12-31-28s13-29 30-29c7 0 14 2 19 6C70 10 84 2 100 2c22 0 40 16 42 36 19 1 34 14 34 31 0 18-16 31-38 31H49" />
      <path className="drop drop-a" d="M52 118c0 8-5 14-11 14s-11-6-11-14c0-6 11-23 11-23s11 17 11 23Z" />
      <path className="drop drop-b" d="M113 136c0 8-5 14-11 14s-11-6-11-14c0-6 11-23 11-23s11 17 11 23Z" />
      <path className="star" d="m151 110 4 9 10 1-8 6 2 10-8-5-9 5 2-10-7-6 10-1 4-9Z" />
      <path className="thread" d="M72 99v31M132 98v21" />
    </svg>
  )
}

function Clothesline({ className = '' }) {
  return (
    <svg className={`clothesline ${className}`} viewBox="0 0 1600 190" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-30 28c355 85 918 143 1670-18" />
      <path className="line-star" d="m305 91 5 12 13 1-10 8 3 13-11-7-11 7 3-13-10-8 13-1 5-12Z" />
      <path className="line-drop" d="M1334 92c0 8-5 14-11 14s-11-6-11-14c0-6 11-23 11-23s11 17 11 23Z" />
    </svg>
  )
}

const navItems = [
  ['top', '首页'],
  ['experience', '经历'],
  ['operations', '运营'],
  ['works', '作品'],
  ['skills', '技能'],
]

function Header({ activeSection }) {
  const activeIndex = Math.max(0, navItems.findIndex(([id]) => id === activeSection))
  const items = navItems.map(([id, label]) => ({ label, href: `#${id}` }))

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="返回首页">
        ZHU YANFEI<span>+</span>
      </a>
      <GooeyNav
        items={items}
        activeIndex={activeIndex}
        particleCount={12}
        particleDistances={[52, 8]}
        particleR={70}
        animationTime={520}
        timeVariance={180}
      />
      <a className="header-resume" href="/assets/zhu-yanfei-resume.pdf" download>
        简历.pdf <ArrowIcon />
      </a>
    </header>
  )
}

function Hero() {
  const [loadVideo, setLoadVideo] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadVideo(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="hero" id="top">
      <video
        className="hero-video"
        src={loadVideo ? 'https://zhu-yanfei-videos-1465406041.cos.ap-guangzhou.myqcloud.com/hero-desk.mp4' : undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="hero-video-fallback" aria-hidden="true" />
      <div className="page-shell hero-shell">
        <div className="hero-glass-word" aria-hidden="true">hello</div>
        <div className="hero-copy">
          <span className="hero-kicker">HELLO / 你好</span>
          <TextType
            as="h1"
            text={'Hi,\n我是朱彦霏'}
            typingSpeed={95}
            initialDelay={260}
            loop={false}
            showCursor
            hideCursorOnComplete
            cursorCharacter="|"
            startOnVisible
            aria-label="Hi，我是朱彦霏"
          />
          <strong className="hero-role-line">内容运营 / 数字营销 / AI应用</strong>
          <p>我关注内容如何被看见、被理解，并最终带来行动。</p>
          <div className="hero-tags" aria-label="个人技能">
            <span>内容策划</span>
            <span>用户运营</span>
            <span>视觉创作</span>
            <span>AI应用</span>
          </div>
          <div className="hero-actions">
            <BorderGlow className="action-glow">
              <a className="button-link" href="/assets/zhu-yanfei-resume.pdf" download>
                下载简历 <ArrowIcon />
              </a>
            </BorderGlow>
            <BorderGlow className="action-glow">
              <a className="button-link button-link--ghost button-link--down" href="#works">
                查看作品 <ArrowIcon />
              </a>
            </BorderGlow>
          </div>
        </div>
        <div className="hero-portrait">
          <span className="hero-portrait-halo" aria-hidden="true" />
          <DepthCarousel items={[
            { image: '/assets/portrait-lifestyle.webp', alt: '朱彦霏手持相机的生活照片', position: 'center 45%' },
            { image: '/assets/hero-photo-1.webp', alt: '朱彦霏在湖边张开双臂', position: 'center 46%' },
            { image: '/assets/hero-photo-2.webp', alt: '朱彦霏在树荫下的生活照片', position: 'center 42%' },
            { image: '/assets/hero-photo-3.webp', alt: '朱彦霏在雪山前的冬日照片', position: '56% center' },
          ]} />
        </div>
        <Clothesline className="hero-clothesline" />
        <CloudDoodle className="hero-cloud" />
        <div className="hanging-note" aria-hidden="true">
          <span className="clip" />
          <small>Content</small>
          <strong>Ideas</strong>
          <i />
          <i />
          <i />
        </div>
        <a className="scroll-cue" href="#experience" aria-label="继续浏览工作经历">
          <span>SCROLL</span>
          <ArrowIcon />
        </a>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section experience-section" id="experience" data-reveal>
      <div className="page-shell">
        <div className="section-heading section-heading--experience">
          <span>ABOUT ME / WORK EXPERIENCE</span>
          <h2><span>把工作结果，</span><span>放在经历的中心。</span></h2>
          <p>数字媒体技术本科在读，专注新媒体运营、内容策划与用户沟通。</p>
        </div>

        <div className="company-list">
          {experiences.map((item, index) => (
            <article className="company-panel" key={item.company} data-reveal>
              <div className="company-panel__number">0{index + 1}</div>
              <div className="company-panel__meta">
                <time>{item.date}</time>
                <span>{item.role}</span>
              </div>
              <div className="company-panel__body">
                <h3>{item.company}</h3>
                <ul>
                  {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
              <div className="company-panel__stats" aria-label={`${item.company}关键数据`}>
                {item.stats.map(([value, label]) => (
                  <BorderGlow className="company-stat-glow" key={label}>
                    <div className="company-stat" tabIndex="0">
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </div>
                  </BorderGlow>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectGallery({ project }) {
  const railRef = useRef(null)
  const dragRef = useRef(null)
  const images = project.gallery ?? [project.image]
  const [active, setActive] = useState(0)

  const move = (direction) => {
    const rail = railRef.current
    rail?.scrollBy({ left: direction * rail.clientWidth * 0.78, behavior: 'smooth' })
  }

  const startDrag = (event) => {
    const rail = railRef.current
    if (!rail) return
    rail.setPointerCapture(event.pointerId)
    dragRef.current = { x: event.clientX, left: rail.scrollLeft }
    rail.classList.add('is-dragging')
  }

  const drag = (event) => {
    if (!dragRef.current || !railRef.current) return
    railRef.current.scrollLeft = dragRef.current.left - (event.clientX - dragRef.current.x)
  }

  const stopDrag = () => {
    dragRef.current = null
    railRef.current?.classList.remove('is-dragging')
  }

  return (
    <div className="project-gallery" data-parallax>
      <div
        className="project-gallery__rail"
        ref={railRef}
        tabIndex="0"
        aria-label={`${project.title}作品图集，共 ${images.length} 张`}
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onScroll={(event) => {
          const rail = event.currentTarget
          const cards = [...rail.children]
          const closest = cards.reduce((best, card, index) => (
            Math.abs(card.offsetLeft - rail.scrollLeft) < Math.abs(cards[best].offsetLeft - rail.scrollLeft) ? index : best
          ), 0)
          setActive(closest)
        }}
      >
        {images.map((image, index) => (
          <figure className="project-gallery__slide" key={image}>
            <img src={image} alt={`${project.alt} ${index + 1}/${images.length}`} draggable="false" loading="lazy" decoding="async" />
            <figcaption>{project.index}.{String(index + 1).padStart(2, '0')}</figcaption>
          </figure>
        ))}
      </div>
      <div className="project-gallery__controls">
        <span>{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        <div>
          <button type="button" onClick={() => move(-1)} aria-label={`查看${project.title}上一张作品`} disabled={active === 0}><ArrowIcon /></button>
          <button type="button" onClick={() => move(1)} aria-label={`查看${project.title}下一张作品`} disabled={active === images.length - 1}><ArrowIcon /></button>
        </div>
      </div>
    </div>
  )
}

function Directory({ items, label }) {
  return (
    <nav className="project-directory" aria-label={label}>
      {items.map(([title, description, target, index]) => (
        <BorderGlow className="directory-glow" key={title}>
          <a href={`#${target}`}>
            <span>{index}</span>
            <strong>{title}</strong>
            <p>{description}</p>
            <ArrowIcon />
          </a>
        </BorderGlow>
      ))}
    </nav>
  )
}

function VideoLibrary() {
  return (
    <div className="video-library">
      {videoCollections.map(([index, title, description, videos]) => (
        <section className="video-category" key={title}>
          <header>
            <span>{index}</span>
            <div>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          </header>
          <div className="video-grid">
            {videos.map(([name, src], videoIndex) => (
              <figure className="video-card" key={src}>
                <video controls playsInline preload="none" aria-label={name}>
                  <source src={src} type="video/mp4" />
                </video>
                <figcaption><span>{String(videoIndex + 1).padStart(2, '0')}</span>{name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function BackToDirectory({ href }) {
  return <a className="back-to-directory" href={href}>← 返回目录</a>
}

function ProjectList({ items, idPrefix }) {
  return (
    <div className="projects-grid">
      {items.map((project, index) => {
        const localIndex = String(index + 1).padStart(2, '0')
        const displayProject = { ...project, index: localIndex }
        return (
        <article className={`project-card ${project.className}`} id={`${idPrefix}-${localIndex}`} key={project.title} data-reveal>
          <div className="project-copy">
            <span className="project-index">{localIndex}</span>
            <div>
              <h3>{project.title}</h3>
              <p className="project-meta">{project.meta}</p>
              <p className="project-description">{project.description}</p>
              {project.process && (
                <ol className="project-process" aria-label="项目实现流程">
                  {project.process.map((step) => <li key={step}>{step}</li>)}
                </ol>
              )}
              <p className="project-award">☆ {project.award}</p>
            </div>
          </div>
          <ProjectGallery project={displayProject} />
        </article>
      )})}
    </div>
  )
}

function Operations() {
  return (
    <section className="section projects operations-section" id="operations" data-reveal>
      <div className="page-shell">
        <div className="section-heading section-heading--catalog" id="operations-directory">
          <span>ACCOUNT OPERATIONS</span>
          <h2>运营账号目录</h2>
          <p>按平台进入对应案例，查看账号搭建、内容生产与数据表现。</p>
        </div>
        <Directory items={operationDirectories} label="运营账号分类目录" />
        <div className="platform-group" id="ops-douyin">
          <h3><span>01</span>DOUYIN / 抖音</h3>
          <BackToDirectory href="#operations-directory" />
          <ProjectList idPrefix="douyin" items={projects.slice(0, 1).concat(projects.slice(3, 4))} />
        </div>
        <div className="platform-group" id="ops-xiaohongshu">
          <h3><span>02</span>XIAOHONGSHU / 小红书</h3>
          <BackToDirectory href="#operations-directory" />
          <ProjectList idPrefix="xiaohongshu" items={projects.slice(1, 3)} />
        </div>
        <div className="platform-group" id="ops-wechat">
          <h3><span>03</span>WECHAT / 公众号</h3>
          <BackToDirectory href="#operations-directory" />
          <ProjectList idPrefix="wechat" items={projects.slice(4, 5)} />
        </div>
      </div>
    </section>
  )
}

function Works() {
  return (
    <section className="section projects works-section" id="works" data-reveal>
      <div className="page-shell">
        <div className="section-heading section-heading--catalog" id="works-directory">
          <span>SELECTED WORKS</span>
          <h2>作品分类目录</h2>
          <p>从 AI 辅助创作到视觉、剪辑与项目汇报，点击卡片直达对应作品。</p>
        </div>
        <Directory items={workDirectories} label="作品分类目录" />
        {[
          ['works-ai', '01', 'AI CREATION / AI 创作', aiProjects],
          ['works-design', '02', 'VISUAL DESIGN / 视觉设计', projects.slice(5, 7)],
          ['works-video', '03', 'VIDEO EDITING / 视频剪辑', null],
          ['works-ppt', '04', 'PROJECT PLANNING / 项目策划', planningProjects],
        ].map(([id, index, title, items]) => (
          <div className="platform-group" id={id} key={id}>
            <h3><span>{index}</span>{title}</h3>
            <BackToDirectory href="#works-directory" />
            {items ? <ProjectList idPrefix={id} items={items} /> : <VideoLibrary />}
          </div>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  const [activeSkill, setActiveSkill] = useState(0)
  const [index, title, ...items] = skills[activeSkill]

  return (
    <section className="section skills-section" id="skills" data-reveal>
      <div className="page-shell">
        <div className="skills-draw">
          <div className="skills-draw__copy">
            <span>SKILLS &amp; TOOLS</span>
            <h2>抽取一张<br />我的技能卡</h2>
            <p>六组专业能力，点击按钮逐张查看。</p>
            <button type="button" onClick={() => setActiveSkill((activeSkill + 1) % skills.length)}>
              抽取下一张 <ArrowIcon />
            </button>
          </div>
          <div className="skill-deck" aria-live="polite">
            <TiltedCard className="skill-file-card" key={activeSkill}>
              <article>
                <small>{index} / {String(skills.length).padStart(2, '0')}</small>
                <span>PROFESSIONAL SKILL</span>
                <h3>{title}</h3>
                <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </TiltedCard>
          </div>
        </div>
      </div>
    </section>
  )
}

function MusicControl() {
  const iframeRef = useRef(null)
  const widgetRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [volume, setVolume] = useState(0.18)

  const toggleMusic = () => playing ? widgetRef.current?.pause() : widgetRef.current?.play()

  useEffect(() => {
    widgetRef.current?.setVolume(volume * 100)
  }, [volume])

  useEffect(() => {
    const connect = () => {
      if (!window.SC || !iframeRef.current) return
      const widget = window.SC.Widget(iframeRef.current)
      widgetRef.current = widget
      widget.bind(window.SC.Widget.Events.READY, () => {
        widget.setVolume(volume * 100)
        setReady(true)
      })
      widget.bind(window.SC.Widget.Events.PLAY, () => setPlaying(true))
      widget.bind(window.SC.Widget.Events.PAUSE, () => setPlaying(false))
      widget.bind(window.SC.Widget.Events.FINISH, () => widget.play())
    }

    const existing = document.querySelector('script[data-soundcloud-widget]')
    if (existing) {
      if (window.SC) connect()
      else existing.addEventListener('load', connect, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://w.soundcloud.com/player/api.js'
    script.async = true
    script.dataset.soundcloudWidget = ''
    script.addEventListener('load', connect, { once: true })
    document.head.appendChild(script)
  }, [])

  return (
    <div className="music-control" title="Happy Cooking — Kirara Magic">
      <iframe
        ref={iframeRef}
        className="music-control__source"
        title="Happy Cooking — Kirara Magic"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent('https://soundcloud.com/kiraramagic/happy-cooking')}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`}
        allow="autoplay"
      />
      <button type="button" onClick={toggleMusic} disabled={!ready} aria-label={playing ? '暂停 Happy Cooking' : '播放 Happy Cooking'} aria-pressed={playing}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          {playing ? <path d="M17 8c1 1 2 2 2 4s-1 3-2 4M19 5c2 2 3 4 3 7s-1 5-3 7" /> : <path d="m17 9 5 6M22 9l-5 6" />}
        </svg>
      </button>
      <input
        type="range"
        min="0"
        max="0.4"
        step="0.02"
        value={volume}
        onInput={(event) => setVolume(Number(event.currentTarget.value))}
        aria-label="背景音乐音量"
      />
    </div>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact" data-reveal>
      <div className="page-shell contact-shell">
        <span className="contact-label">LET&apos;S WORK TOGETHER / 联系</span>
        <h2>
          期待与你一起，
          <br />
          把好内容做得更有影响力。
        </h2>
        <p>如果你正在寻找新媒体运营 / 内容运营伙伴，欢迎联系我。</p>
        <div className="contact-actions">
          <BorderGlow className="action-glow">
            <a className="button-link" href="mailto:2244391427@qq.com">
              发送邮件 <ArrowIcon />
            </a>
          </BorderGlow>
          <BorderGlow className="action-glow">
            <a className="button-link button-link--ghost" href="tel:19317152889">
              电话联系
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 3h3l1 5-2 1c1 3 3 5 6 6l1-2 5 1v3c0 2-2 4-4 4C9 20 4 15 3 7c0-2 2-4 4-4Z" />
              </svg>
            </a>
          </BorderGlow>
        </div>
        <Clothesline className="contact-line" />
        <CloudDoodle className="contact-cloud" />
        <footer>
          <a className="wordmark" href="#top">
            ZHU YANFEI<span>+</span>
          </a>
          <span>NEW MEDIA &amp; CONTENT OPERATIONS</span>
        </footer>
      </div>
    </section>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    const revealItems = [...document.querySelectorAll('[data-reveal]')]
    const parallaxItems = [...document.querySelectorAll('[data-parallax]')]
    const visibleParallaxItems = new Set()
    const navSections = navItems.map(([id]) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.02 },
    )

    revealItems.forEach((item) => observer.observe(item))
    const parallaxObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => (
        entry.isIntersecting ? visibleParallaxItems.add(entry.target) : visibleParallaxItems.delete(entry.target)
      )),
      { rootMargin: '20% 0px' },
    )
    parallaxItems.forEach((item) => parallaxObserver.observe(item))

    let frame
    const updateScrollEffects = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        document.documentElement.style.setProperty('--scroll-progress', max > 0 ? window.scrollY / max : 0)
        document.documentElement.style.setProperty('--hero-progress', Math.min(1, window.scrollY / window.innerHeight))
        const active = navSections.reduce(
          (current, section) => section.getBoundingClientRect().top <= window.innerHeight * 0.38 ? section.id : current,
          'top',
        )
        setActiveSection(active)
        visibleParallaxItems.forEach((item) => {
          const rect = item.getBoundingClientRect()
          const offset = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight))
          item.style.setProperty('--parallax-y', `${offset * -18}px`)
        })
      })
    }

    updateScrollEffects()
    window.addEventListener('scroll', updateScrollEffects, { passive: true })

    return () => {
      observer.disconnect()
      parallaxObserver.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateScrollEffects)
    }
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <Grainient
          className="site-grainient"
          color1="#dff8ff"
          color2="#a8d8ff"
          color3="#72a9e8"
        />
      </Suspense>
      <div className="page-intro" aria-hidden="true"><span>ZHU YANFEI+</span></div>
      <div className="scroll-progress" aria-hidden="true"><span /></div>
      <a className="skip-link" href="#experience">
        跳到主要内容
      </a>
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <Experience />
        <Operations />
        <Works />
        <Skills />
        <Contact />
      </main>
      <MusicControl />
    </>
  )
}
