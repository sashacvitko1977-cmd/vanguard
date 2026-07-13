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

export const SECTIONS = [
  {
    id: 'projects',
    eyebrow: 'Портфолио',
    title: 'Проекты',
    lead: 'От DeFi-протоколов до NFT-коллекций — мы запускаем продукты, которые задают стандарт рынка.',
    animation: 'fade-up' as const,
    cards: [
      { title: 'NovaDEX', text: 'Брендинг и фронтенд для DEX с $120M TVL за первый квартал.' },
      { title: 'ChainVault', text: 'Кастодиальное Web3-приложение с мультиподписью и аналитикой.' },
      { title: 'MetaForge', text: 'NFT-маркетплейс с 3D-витриной и интеграцией кошельков.' },
    ],
  },
  {
    id: 'ecosystem',
    eyebrow: 'Сеть',
    title: 'Экосистема',
    lead: 'Партнёрства с ведущими протоколами Ethereum, Solana, Base и Layer-2 сетями.',
    animation: 'slide-blur' as const,
    cards: [
      { title: 'Интеграции', text: 'WalletConnect, MetaMask, Phantom — нативная поддержка из коробки.' },
      { title: 'Партнёры', text: 'Совместные кампании с топ-протоколами и фондами индустрии.' },
      { title: 'Сообщество', text: 'Discord, Telegram и X-стратегии для роста холдеров и пользователей.' },
    ],
  },
  {
    id: 'services',
    eyebrow: 'Что мы делаем',
    title: 'Услуги',
    lead: 'Полный цикл: стратегия, дизайн, разработка, маркетинг и запуск токеномики.',
    animation: 'scale-rotate' as const,
    cards: [
      { title: 'Бренд и дизайн', text: 'Визуальная идентичность, UI/UX, motion и 3D для Web3-продуктов.' },
      { title: 'Смарт-контракты', text: 'Разработка, готовая к аудиту, деплой и интеграция с фронтендом.' },
      { title: 'Рост', text: 'Выход на рынок, KOL-кампании, листинги и управление сообществом.' },
    ],
  },
  {
    id: 'launch',
    eyebrow: 'Начать сейчас',
    title: 'Запуск',
    lead: 'Готовы вывести ваш проект на рынок? Свяжитесь с нами — первая консультация бесплатно.',
    animation: 'clip-wipe' as const,
    cards: [] as { title: string; text: string }[],
  },
] as const