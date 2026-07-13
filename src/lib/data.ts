import type { LucideIcon } from 'lucide-react'
import {
  Layers,
  Shield,
  Box,
  ArrowLeftRight,
  CreditCard,
  Plug,
  Handshake,
  Users,
  Server,
  Lock,
  Palette,
  Code2,
  TrendingUp,
  Coins,
  Sparkles,
  Rocket,
  Clock,
  Headphones,
  BarChart3,
} from 'lucide-react'

export const NAV_LINKS = [
  { id: 'projects', label: 'Проекты' },
  { id: 'ecosystem', label: 'Экосистема' },
  { id: 'services', label: 'Услуги' },
  { id: 'launch', label: 'Запуск' },
] as const

export const HEADLINES = ['Создавай.', 'Запускай.', 'Доминируй.'] as const

export const STATS = [
  { value: 50, suffix: '+', label: 'Запущено Web3-проектов' },
  { value: 120, suffix: 'M+', label: 'USD в TVL' },
  { value: 18, suffix: '+', label: 'Блокчейн-сетей' },
] as const

export const PARTNERS = [
  'Ethereum',
  'Solana',
  'Base',
  'Arbitrum',
  'Polygon',
  'Uniswap',
  'Aave',
  'Chainlink',
  'OpenSea',
  'Ledger',
] as const

export type CardMockup = {
  gradient: string
  pattern?: string
  label?: string
}

export type CardData = {
  title: string
  text: string
  tag: string
  metric?: string
  icon: LucideIcon
  accent: 'violet' | 'cyan' | 'amber' | 'rose' | 'emerald'
  mockup?: CardMockup
  layoutClass?: string
}

export type SectionData = {
  id: string
  eyebrow: string
  title: string
  lead: string
  animation: 'fade-up' | 'slide-blur' | 'scale-rotate' | 'clip-wipe'
  cards: CardData[]
}

export const SECTIONS: SectionData[] = [
  {
    id: 'projects',
    eyebrow: 'Портфолио',
    title: 'Проекты',
    lead: 'От DeFi-протоколов до NFT-коллекций — мы запускаем продукты, которые задают стандарт рынка.',
    animation: 'fade-up',
    cards: [
      {
        title: 'NovaDEX',
        text: 'Полный ребрендинг и фронтенд для DEX нового поколения с real-time графиками и мульти-чейн свопами.',
        tag: 'DeFi',
        metric: '$120M TVL',
        icon: Layers,
        accent: 'violet',
        layoutClass: 'lg:col-span-7 lg:row-span-2',
        mockup: {
          gradient: 'from-violet-600/50 via-indigo-900/40 to-[#0a0612]',
          pattern: 'bg-[radial-gradient(circle_at_30%_20%,rgba(167,139,250,0.35),transparent_50%)]',
          label: 'Swap · Pool · Chart',
        },
      },
      {
        title: 'ChainVault',
        text: 'Кастодиальное приложение с мультиподписью, аналитикой портфеля и институциональным UI.',
        tag: 'Custody',
        metric: '12K+ users',
        icon: Shield,
        accent: 'cyan',
        layoutClass: 'lg:col-span-5',
        mockup: {
          gradient: 'from-cyan-500/40 via-slate-900/50 to-[#050a10]',
          pattern: 'bg-[linear-gradient(135deg,rgba(34,211,238,0.15)_0%,transparent_60%)]',
          label: 'Vault · Multisig',
        },
      },
      {
        title: 'MetaForge',
        text: 'NFT-маркетплейс с 3D-витриной, AR-превью и нативной интеграцией 8 кошельков.',
        tag: 'NFT',
        metric: '2.4M vol',
        icon: Box,
        accent: 'amber',
        layoutClass: 'lg:col-span-5',
        mockup: {
          gradient: 'from-amber-500/45 via-orange-950/40 to-[#100a05]',
          pattern: 'bg-[radial-gradient(ellipse_at_70%_60%,rgba(251,191,36,0.25),transparent_55%)]',
          label: '3D Gallery · Mint',
        },
      },
      {
        title: 'PulseBridge',
        text: 'Кросс-чейн мост с визуализацией маршрутов, gas-оптимизацией и live-трекингом транзакций.',
        tag: 'Bridge',
        metric: '18 сетей',
        icon: ArrowLeftRight,
        accent: 'emerald',
        layoutClass: 'lg:col-span-4',
        mockup: {
          gradient: 'from-emerald-500/35 via-teal-950/40 to-black',
          label: 'Route · Bridge',
        },
      },
      {
        title: 'ZenithPay',
        text: 'Crypto-to-fiat платёжные рельсы с мгновенным онбордингом и white-label виджетом.',
        tag: 'Payments',
        metric: '2M+ tx',
        icon: CreditCard,
        accent: 'rose',
        layoutClass: 'lg:col-span-4',
        mockup: {
          gradient: 'from-rose-500/35 via-pink-950/40 to-black',
          label: 'Pay · Widget',
        },
      },
      {
        title: 'OrbitDAO',
        text: 'Governance-портал с делегированием, snapshot-голосованиями и интерактивной токеномикой.',
        tag: 'DAO',
        metric: '340K voters',
        icon: BarChart3,
        accent: 'violet',
        layoutClass: 'lg:col-span-4',
        mockup: {
          gradient: 'from-violet-500/30 via-purple-950/45 to-black',
          label: 'Vote · Delegate',
        },
      },
    ],
  },
  {
    id: 'ecosystem',
    eyebrow: 'Сеть',
    title: 'Экосистема',
    lead: 'Партнёрства с ведущими протоколами Ethereum, Solana, Base и Layer-2 сетями.',
    animation: 'slide-blur',
    cards: [
      {
        title: 'Интеграции',
        text: 'WalletConnect v2, MetaMask, Phantom, Ledger — нативная поддержка из коробки за 48 часов.',
        tag: 'Wallets',
        metric: '8+ SDK',
        icon: Plug,
        accent: 'cyan',
      },
      {
        title: 'Партнёры',
        text: 'Совместные GTM-кампании с топ-протоколами, фондами и KOL-сетями индустрии.',
        tag: 'Alliances',
        metric: '30+ brands',
        icon: Handshake,
        accent: 'violet',
      },
      {
        title: 'Сообщество',
        text: 'Discord, Telegram, Farcaster — стратегии роста холдеров, амбассадоров и power-users.',
        tag: 'Community',
        metric: '500K reach',
        icon: Users,
        accent: 'amber',
      },
      {
        title: 'Инфраструктура',
        text: 'RPC-ноды, индексация The Graph, субграфы и мониторинг on-chain событий 24/7.',
        tag: 'Infra',
        metric: '99.9% uptime',
        icon: Server,
        accent: 'emerald',
      },
      {
        title: 'Безопасность',
        text: 'Аудиты CertiK & Trail of Bits, bug bounty программы и формальная верификация контрактов.',
        tag: 'Security',
        metric: '0 exploits',
        icon: Lock,
        accent: 'rose',
      },
      {
        title: 'Аналитика',
        text: 'Dune-дашборды, on-chain метрики, cohort-анализ и TVL-трекинг в реальном времени.',
        tag: 'Data',
        metric: 'Live metrics',
        icon: BarChart3,
        accent: 'cyan',
      },
    ],
  },
  {
    id: 'services',
    eyebrow: 'Что мы делаем',
    title: 'Услуги',
    lead: 'Полный цикл: стратегия, дизайн, разработка, маркетинг и запуск токеномики.',
    animation: 'scale-rotate',
    cards: [
      {
        title: 'Бренд и дизайн',
        text: 'Визуальная идентичность, UI/UX-системы, motion-графика и 3D-ассеты для Web3-продуктов.',
        tag: 'Design',
        metric: 'Figma → Prod',
        icon: Palette,
        accent: 'violet',
      },
      {
        title: 'Смарт-контракты',
        text: 'Solidity, Rust, Move — разработка audit-ready контрактов, деплой и интеграция с фронтендом.',
        tag: 'Dev',
        metric: 'Audit-ready',
        icon: Code2,
        accent: 'cyan',
      },
      {
        title: 'Рост',
        text: 'Go-to-market, KOL-кампании, листинги на CEX/DEX и community management.',
        tag: 'Growth',
        metric: '10x avg ROI',
        icon: TrendingUp,
        accent: 'emerald',
      },
      {
        title: 'Токеномика',
        text: 'Моделирование supply, vesting, staking-механик и симуляция рыночной динамики.',
        tag: 'Token',
        metric: 'Sim-driven',
        icon: Coins,
        accent: 'amber',
      },
      {
        title: 'Motion & 3D',
        text: 'Cinematic hero-ролики, Lottie-анимации, WebGL-сцены и интерактивные 3D-витрины.',
        tag: 'Motion',
        metric: '60fps WebGL',
        icon: Sparkles,
        accent: 'rose',
      },
      {
        title: 'Стратегия',
        text: 'Позиционирование, конкурентный анализ, roadmap и pitch-deck для инвесторов.',
        tag: 'Strategy',
        metric: '$45M raised',
        icon: Rocket,
        accent: 'violet',
      },
    ],
  },
  {
    id: 'launch',
    eyebrow: 'Начать сейчас',
    title: 'Запуск',
    lead: 'Готовы вывести ваш проект на рынок? Свяжитесь с нами — первая консультация бесплатно.',
    animation: 'clip-wipe',
    cards: [
      {
        title: 'Бесплатная консультация',
        text: '30-минутный разбор вашего проекта: стратегия, дизайн, техстек и timeline запуска.',
        tag: 'Free',
        metric: '0₽ старт',
        icon: Headphones,
        accent: 'violet',
      },
      {
        title: 'MVP за 2 недели',
        text: 'Лендинг, бренд-кит, смарт-контракт и тестнет-деплой — от идеи до демо за 14 дней.',
        tag: 'Fast',
        metric: '14 дней',
        icon: Clock,
        accent: 'cyan',
      },
      {
        title: 'Full-stack запуск',
        text: 'Полный цикл: дизайн, разработка, аудит, маркетинг и mainnet-деплой под ключ.',
        tag: 'Full',
        metric: 'End-to-end',
        icon: Rocket,
        accent: 'amber',
      },
    ],
  },
]