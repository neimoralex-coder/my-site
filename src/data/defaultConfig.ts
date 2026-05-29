export interface ServicePage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  processImages: string[];
  processSteps: { title: string; description: string }[];
  repairs: { name: string; description: string; priceFrom: string; image: string }[];
}

export interface PriceItem {
  model: string;
  screen: string;
  battery: string;
  charging: string;
  camera: string;
  water: string;
  other: string;
}

export interface PriceCategory {
  id: string;
  name: string;
  icon: string;
  items: PriceItem[];
}

export interface Review {
  name: string;
  device: string;
  service: string;
  rating: number;
  text: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Messenger {
  id: string;
  name: string;
  icon: string;
  url: string;
}

export interface WorkDay {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface ScreenReplacement {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  benefits: string[];
  featureList: string[];
}

export interface WhyUsFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface OtherService {
  icon: string;
  title: string;
  description: string;
}

export interface SiteConfig {
  siteName: string;
  phone: string;
  email: string;
  address: string;
  metro: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  guaranteeText: string;
  clientsCount: string;
  galleryImages: GalleryImage[];
  reviews: Review[];
  servicePages: ServicePage[];
  priceCategories: PriceCategory[];
  messengers: Messenger[];
  socialLinks: { name: string; url: string }[];
  workSchedule: WorkDay[];
  screenReplacement: ScreenReplacement;
  whyUsFeatures: WhyUsFeature[];
  processSteps: ProcessStep[];
  otherServices: OtherService[];
}

export const defaultConfig: SiteConfig = {
  siteName: 'МАГБУК',
  phone: '+7 (999) 123-45-67',
  email: 'info@ifix.ru',
  address: 'г. Москва, ул. Арбат, 15',
  metro: 'Ст. метро «Смоленская», 5 мин пешком',
  heroTitle: 'Ремонт техники Apple',
  heroSubtitle: 'с гарантией 1 год',
  heroDescription:
    'Профессиональная замена стекла дисплея, ремонт iPhone, iPad, MacBook и Apple Watch. Оригинальные запчасти и бережное отношение к вашей технике.',
  guaranteeText: 'Гарантия 365 дней',
  clientsCount: '2 400+',
  galleryImages: [
    {
      src: '/images/hero-repair.jpg',
      alt: 'Ремонт iPhone',
      caption: 'Профессиональный ремонт в сервисном центре',
    },
    {
      src: '/images/cracked-screen.jpg',
      alt: 'Трещины на экране',
      caption: 'До ремонта — разбитый дисплей',
    },
    {
      src: '/images/illustration-repair.png',
      alt: 'Процесс ремонта',
      caption: 'Тщательная диагностика каждого устройства',
    },
    {
      src: '/images/hero-repair.jpg',
      alt: 'Сервисный центр',
      caption: 'Современное оборудование',
    },
    {
      src: '/images/cracked-screen.jpg',
      alt: 'Результат ремонта',
      caption: 'После ремонта — как новый',
    },
  ],
  reviews: [
    {
      name: 'Александр К.',
      device: 'iPhone 15 Pro Max',
      service: 'Замена стекла',
      rating: 5,
      text: 'Уронил стекло на новом iPhone 15 Pro Max. Обратился в iFix — сделали за 40 минут. Качество отличное, ничего не отличишь от оригинала. Дали гарантийный талон на год. Рекомендую!',
    },
    {
      name: 'Мария С.',
      device: 'iPad Air 5',
      service: 'Замена дисплея',
      rating: 5,
      text: 'Ребёнок уронил планшет. Думала, придётся покупать новый, но в iFix отремонтировали за день и за очень приятную цену. Спасибо большое!',
    },
    {
      name: 'Дмитрий В.',
      device: 'MacBook Pro 14"',
      service: 'Замена клавиатуры',
      rating: 5,
      text: 'Полил кофе на клавиатуру MacBook. Принёс в мастерскую — через два дня забрал как новый. Профессиональный подход, всё объяснили и показали.',
    },
    {
      name: 'Елена П.',
      device: 'iPhone 13',
      service: 'Замена батареи',
      rating: 5,
      text: 'Телефон стал быстро разряжаться. Заменили батарею за 20 минут. Теперь держит заряд весь день. Очень довольна!',
    },
    {
      name: 'Игорь М.',
      device: 'Apple Watch Series 9',
      service: 'Замена стекла',
      rating: 5,
      text: 'Ударил часы о каменную ограждение. Думал, всё — покупай новые. Но в iFix заменили стекло и дисплей за полцены новых часов. Супер!',
    },
  ],
  servicePages: [
    {
      id: 'iphone',
      title: 'Ремонт iPhone',
      subtitle: 'Профессиональный ремонт всех моделей iPhone',
      description:
        'Выполняем полный спектр работ по ремонту iPhone любой модели — от замены стекла до сложной пайки материнской платы. Используем только оригинальные и сертифицированные комплектующие.',
      heroImage: '/images/hero-repair.jpg',
      processImages: [
        '/images/hero-repair.jpg',
        '/images/cracked-screen.jpg',
        '/images/illustration-repair.png',
      ],
      processSteps: [
        {
          title: 'Приём устройства',
          description:
            'Принимаем iPhone, фиксируем внешнее состояние и проводим первичную диагностику.',
        },
        {
          title: 'Диагностика',
          description:
            'Полная диагностика всех систем устройства с помощью профессионального оборудования.',
        },
        {
          title: 'Разборка',
          description:
            'Аккуратная разборка в антистатических условиях с использованием специализированного инструмента.',
        },
        {
          title: 'Ремонт',
          description:
            'Выполнение необходимых работ — замена компонентов, пайка, восстановление цепей питания.',
        },
        {
          title: 'Сборка и тестирование',
          description:
            'Сборка устройства и многоступенчатое тестирование всех функций.',
        },
        {
          title: 'Выдача с гарантией',
          description:
            'Выдаём устройство с гарантийным талоном сроком на 1 год.',
        },
      ],
      repairs: [
        {
          name: 'Замена стекла',
          description: 'Замена только стекла с сохранением оригинального OLED дисплея',
          priceFrom: 'от 7 900 ₽',
          image: '/images/cracked-screen.jpg',
        },
        {
          name: 'Замена дисплея',
          description: 'Полная замена дисплейного модуля оригинальным комплектом',
          priceFrom: 'от 9 900 ₽',
          image: '/images/hero-repair.jpg',
        },
        {
          name: 'Замена батареи',
          description: 'Установка нового аккумулятора с калибровкой системы',
          priceFrom: 'от 3 900 ₽',
          image: '/images/illustration-repair.png',
        },
        {
          name: 'Замена заднего стекла',
          description: 'Замена задней панели с сохранением беспроводной зарядки',
          priceFrom: 'от 5 900 ₽',
          image: '/images/hero-repair.jpg',
        },
        {
          name: 'Ремонт после воды',
          description: 'Полная очистка платы, замена повреждённых компонентов',
          priceFrom: 'от 4 900 ₽',
          image: '/images/cracked-screen.jpg',
        },
        {
          name: 'Замена камеры',
          description: 'Замена основной или фронтальной камеры',
          priceFrom: 'от 3 500 ₽',
          image: '/images/hero-repair.jpg',
        },
        {
          name: 'Замена разъёма зарядки',
          description: 'Замена порта Lightning и восстановление контактов',
          priceFrom: 'от 2 900 ₽',
          image: '/images/illustration-repair.png',
        },
        {
          name: 'Ремонт кнопок',
          description: 'Замена кнопок громкости, включения или боковой кнопки',
          priceFrom: 'от 2 500 ₽',
          image: '/images/hero-repair.jpg',
        },
      ],
    },
    {
      id: 'ipad',
      title: 'Ремонт iPad',
      subtitle: 'Ремонт всех моделей iPad и iPad Pro',
      description:
        'Специализируемся на ремонте iPad любого поколения. От замены экрана до восстановления после попадания влаги.',
      heroImage: '/images/hero-repair.jpg',
      processImages: [
        '/images/hero-repair.jpg',
        '/images/cracked-screen.jpg',
        '/images/illustration-repair.png',
      ],
      processSteps: [
        {
          title: 'Приём и диагностика',
          description: 'Оцениваем состояние iPad, проверяем все функции устройства.',
        },
        {
          title: 'Разборка',
          description: 'Осторожная разборка с нагревом для размягчения клея.',
        },
        {
          title: 'Ремонт',
          description:
            'Выполняем необходимые работы с использованием оригинальных комплектующих.',
        },
        {
          title: 'Тестирование',
          description:
            'Проверяем сенсор, дисплей, звук, камеру и все функции.',
        },
        {
          title: 'Гарантия',
          description: 'Выдаём гарантийный талон на 1 год на все виды работ.',
        },
      ],
      repairs: [
        {
          name: 'Замена стекла',
          description: 'Замена тачскрина с сохранением оригинального дисплея',
          priceFrom: 'от 9 900 ₽',
          image: '/images/cracked-screen.jpg',
        },
        {
          name: 'Замена дисплея',
          description: 'Полная замена дисплейного модуля',
          priceFrom: 'от 12 900 ₽',
          image: '/images/hero-repair.jpg',
        },
        {
          name: 'Замена батареи',
          description: 'Установка нового аккумулятора',
          priceFrom: 'от 5 900 ₽',
          image: '/images/illustration-repair.png',
        },
        {
          name: 'Ремонт после воды',
          description: 'Очистка и восстановление после попадания влаги',
          priceFrom: 'от 5 900 ₽',
          image: '/images/cracked-screen.jpg',
        },
        {
          name: 'Замена разъёма',
          description: 'Замена порта зарядки USB-C или Lightning',
          priceFrom: 'от 3 900 ₽',
          image: '/images/hero-repair.jpg',
        },
      ],
    },
    {
      id: 'macbook',
      title: 'Ремонт MacBook',
      subtitle: 'Ремонт MacBook Air и MacBook Pro всех поколений',
      description:
        'Ремонтируем MacBook любой сложности — от замены клавиатуры до восстановления логической платы. Работаем с M1, M2, M3 и Intel.',
      heroImage: '/images/hero-repair.jpg',
      processImages: [
        '/images/hero-repair.jpg',
        '/images/cracked-screen.jpg',
        '/images/illustration-repair.png',
      ],
      processSteps: [
        {
          title: 'Диагностика',
          description: 'Полная диагностика железа и программного обеспечения.',
        },
        {
          title: 'Разборка',
          description:
            'Аккуратная разборка с соблюдением всех технологических процессов Apple.',
        },
        {
          title: 'Ремонт',
          description: 'Замена компонентов, пайка BGA-чипов, восстановление цепей.',
        },
        {
          title: 'Тестирование',
          description:
            'Стресс-тесты, проверка температурного режима и всех портов.',
        },
        {
          title: 'Гарантия',
          description: 'Гарантия 1 год на все виды работ и запчасти.',
        },
      ],
      repairs: [
        {
          name: 'Замена матрицы',
          description: 'Замена дисплея Retina оригинальным модулем',
          priceFrom: 'от 18 900 ₽',
          image: '/images/cracked-screen.jpg',
        },
        {
          name: 'Замена клавиатуры',
          description: 'Замена клавиатурного модуля в сборе',
          priceFrom: 'от 12 900 ₽',
          image: '/images/hero-repair.jpg',
        },
        {
          name: 'Замена батареи',
          description: 'Установка нового аккумулятора с калибровкой',
          priceFrom: 'от 7 900 ₽',
          image: '/images/illustration-repair.png',
        },
        {
          name: 'Замена SSD',
          description: 'Увеличение объёма накопителя',
          priceFrom: 'от 9 900 ₽',
          image: '/images/hero-repair.jpg',
        },
        {
          name: 'Чистка системы охлаждения',
          description: 'Полная чистка от пыли, замена термопасты',
          priceFrom: 'от 3 900 ₽',
          image: '/images/cracked-screen.jpg',
        },
        {
          name: 'Ремонт платы',
          description: 'Восстановление логической платы после залива или КЗ',
          priceFrom: 'от 14 900 ₽',
          image: '/images/hero-repair.jpg',
        },
      ],
    },
    {
      id: 'applewatch',
      title: 'Ремонт Apple Watch',
      subtitle: 'Ремонт всех серий Apple Watch и Ultra',
      description:
        'Ремонтируем Apple Watch Series 4-9, SE и Ultra. Замена стекла, дисплея, батареи и кнопок.',
      heroImage: '/images/hero-repair.jpg',
      processImages: [
        '/images/hero-repair.jpg',
        '/images/cracked-screen.jpg',
        '/images/illustration-repair.png',
      ],
      processSteps: [
        {
          title: 'Приём',
          description: 'Оцениваем состояние часов и степень повреждения.',
        },
        {
          title: 'Разборка',
          description: 'Очень деликатная разборка под микроскопом.',
        },
        {
          title: 'Ремонт',
          description: 'Замена повреждённых компонентов.',
        },
        {
          title: 'Герметизация',
          description: 'Восстановление водозащиты после сборки.',
        },
        {
          title: 'Гарантия',
          description: 'Гарантия 1 год на все работы.',
        },
      ],
      repairs: [
        {
          name: 'Замена стекла',
          description: 'Замена сапфирового или Ion-X стекла',
          priceFrom: 'от 6 900 ₽',
          image: '/images/cracked-screen.jpg',
        },
        {
          name: 'Замена дисплея',
          description: 'Полная замена дисплейного модуля',
          priceFrom: 'от 9 900 ₽',
          image: '/images/hero-repair.jpg',
        },
        {
          name: 'Замена батареи',
          description: 'Установка нового аккумулятора',
          priceFrom: 'от 3 900 ₽',
          image: '/images/illustration-repair.png',
        },
        {
          name: 'Ремонт кнопок',
          description: 'Замена Digital Crown и боковой кнопки',
          priceFrom: 'от 2 500 ₽',
          image: '/images/hero-repair.jpg',
        },
      ],
    },
    {
      id: 'other',
      title: 'Ремонт других устройств',
      subtitle: 'Samsung, Xiaomi, Huawei, Google Pixel и другие',
      description:
        'Также ремонтируем смартфоны, планшеты и ноутбуки других производителей. Качество не уступает ремонту Apple.',
      heroImage: '/images/hero-repair.jpg',
      processImages: [
        '/images/hero-repair.jpg',
        '/images/cracked-screen.jpg',
        '/images/illustration-repair.png',
      ],
      processSteps: [
        {
          title: 'Диагностика',
          description: 'Бесплатная диагностика любого устройства.',
        },
        {
          title: 'Ремонт',
          description: 'Работаем с любыми брендами и моделями.',
        },
        {
          title: 'Тестирование',
          description: 'Полная проверка после ремонта.',
        },
        {
          title: 'Гарантия',
          description: 'Гарантия 1 год на все работы.',
        },
      ],
      repairs: [
        {
          name: 'Замена экрана Samsung',
          description: 'Super AMOLED и LCD дисплеи',
          priceFrom: 'от 6 900 ₽',
          image: '/images/cracked-screen.jpg',
        },
        {
          name: 'Замена экрана Xiaomi',
          description: 'AMOLED и IPS дисплеи',
          priceFrom: 'от 4 900 ₽',
          image: '/images/hero-repair.jpg',
        },
        {
          name: 'Ремонт ноутбуков',
          description: 'Lenovo, HP, Dell, ASUS и другие',
          priceFrom: 'от 3 900 ₽',
          image: '/images/illustration-repair.png',
        },
        {
          name: 'Замена батареи',
          description: 'Для любых смартфонов и ноутбуков',
          priceFrom: 'от 2 500 ₽',
          image: '/images/hero-repair.jpg',
        },
      ],
    },
  ],
  priceCategories: [
    {
      id: 'iphone',
      name: 'iPhone',
      icon: 'Smartphone',
      items: [
        {
          model: 'iPhone 15 Pro Max',
          screen: '18 900 ₽',
          battery: '5 900 ₽',
          charging: '3 900 ₽',
          camera: '4 900 ₽',
          water: '7 900 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 15 Pro',
          screen: '17 900 ₽',
          battery: '5 500 ₽',
          charging: '3 900 ₽',
          camera: '4 500 ₽',
          water: '7 500 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 15 Plus',
          screen: '15 900 ₽',
          battery: '5 500 ₽',
          charging: '3 500 ₽',
          camera: '4 500 ₽',
          water: '7 500 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 15',
          screen: '14 900 ₽',
          battery: '5 500 ₽',
          charging: '3 500 ₽',
          camera: '4 500 ₽',
          water: '7 500 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 14 Pro Max',
          screen: '16 900 ₽',
          battery: '5 500 ₽',
          charging: '3 900 ₽',
          camera: '4 500 ₽',
          water: '7 500 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 14 Pro',
          screen: '15 900 ₽',
          battery: '5 200 ₽',
          charging: '3 900 ₽',
          camera: '4 200 ₽',
          water: '7 200 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 14 Plus',
          screen: '13 900 ₽',
          battery: '5 200 ₽',
          charging: '3 500 ₽',
          camera: '4 200 ₽',
          water: '7 200 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 14',
          screen: '12 900 ₽',
          battery: '5 200 ₽',
          charging: '3 500 ₽',
          camera: '4 200 ₽',
          water: '7 200 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 13 Pro Max',
          screen: '14 900 ₽',
          battery: '4 900 ₽',
          charging: '3 500 ₽',
          camera: '4 200 ₽',
          water: '6 900 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 13 Pro',
          screen: '13 900 ₽',
          battery: '4 500 ₽',
          charging: '3 500 ₽',
          camera: '3 900 ₽',
          water: '6 500 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 13',
          screen: '10 900 ₽',
          battery: '4 200 ₽',
          charging: '3 200 ₽',
          camera: '3 500 ₽',
          water: '6 200 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 13 mini',
          screen: '9 900 ₽',
          battery: '4 200 ₽',
          charging: '3 200 ₽',
          camera: '3 500 ₽',
          water: '6 200 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 12 Pro Max',
          screen: '12 900 ₽',
          battery: '4 200 ₽',
          charging: '3 200 ₽',
          camera: '3 500 ₽',
          water: '6 200 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 12 Pro',
          screen: '11 900 ₽',
          battery: '4 200 ₽',
          charging: '3 200 ₽',
          camera: '3 500 ₽',
          water: '6 200 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 12',
          screen: '8 900 ₽',
          battery: '3 900 ₽',
          charging: '2 900 ₽',
          camera: '3 200 ₽',
          water: '5 900 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 12 mini',
          screen: '8 500 ₽',
          battery: '3 900 ₽',
          charging: '2 900 ₽',
          camera: '3 200 ₽',
          water: '5 900 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 11 Pro Max',
          screen: '10 900 ₽',
          battery: '3 900 ₽',
          charging: '2 900 ₽',
          camera: '3 200 ₽',
          water: '5 900 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 11 Pro',
          screen: '9 900 ₽',
          battery: '3 900 ₽',
          charging: '2 900 ₽',
          camera: '3 200 ₽',
          water: '5 900 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone 11',
          screen: '7 900 ₽',
          battery: '3 500 ₽',
          charging: '2 500 ₽',
          camera: '2 900 ₽',
          water: '5 500 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone XR',
          screen: '7 500 ₽',
          battery: '3 500 ₽',
          charging: '2 500 ₽',
          camera: '2 900 ₽',
          water: '5 500 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone SE (2022)',
          screen: '6 900 ₽',
          battery: '3 200 ₽',
          charging: '2 500 ₽',
          camera: '2 500 ₽',
          water: '5 200 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'iPhone SE (2020)',
          screen: '6 500 ₽',
          battery: '3 200 ₽',
          charging: '2 500 ₽',
          camera: '2 500 ₽',
          water: '5 200 ₽',
          other: 'от 2 500 ₽',
        },
      ],
    },
    {
      id: 'ipad',
      name: 'iPad',
      icon: 'Tablet',
      items: [
        {
          model: 'iPad Pro 12.9" M2/M1',
          screen: '24 900 ₽',
          battery: '7 900 ₽',
          charging: '4 900 ₽',
          camera: '5 500 ₽',
          water: '9 900 ₽',
          other: 'от 3 900 ₽',
        },
        {
          model: 'iPad Pro 11" M2/M1',
          screen: '19 900 ₽',
          battery: '6 900 ₽',
          charging: '4 500 ₽',
          camera: '4 900 ₽',
          water: '8 900 ₽',
          other: 'от 3 900 ₽',
        },
        {
          model: 'iPad Air 5 / Air 4',
          screen: '14 900 ₽',
          battery: '5 900 ₽',
          charging: '3 900 ₽',
          camera: '4 200 ₽',
          water: '7 900 ₽',
          other: 'от 3 500 ₽',
        },
        {
          model: 'iPad mini 6',
          screen: '12 900 ₽',
          battery: '5 200 ₽',
          charging: '3 500 ₽',
          camera: '3 900 ₽',
          water: '7 200 ₽',
          other: 'от 3 500 ₽',
        },
        {
          model: 'iPad 10 / 9 / 8',
          screen: '9 900 ₽',
          battery: '4 900 ₽',
          charging: '3 200 ₽',
          camera: '3 500 ₽',
          water: '6 900 ₽',
          other: 'от 3 200 ₽',
        },
      ],
    },
    {
      id: 'macbook',
      name: 'MacBook',
      icon: 'Laptop',
      items: [
        {
          model: 'MacBook Pro 16" M3/M2/M1',
          screen: '34 900 ₽',
          battery: '9 900 ₽',
          charging: '5 900 ₽',
          camera: '6 500 ₽',
          water: '12 900 ₽',
          other: 'от 4 900 ₽',
        },
        {
          model: 'MacBook Pro 14" M3/M2/M1',
          screen: '29 900 ₽',
          battery: '8 900 ₽',
          charging: '5 500 ₽',
          camera: '5 900 ₽',
          water: '11 900 ₽',
          other: 'от 4 900 ₽',
        },
        {
          model: 'MacBook Air 15" M3/M2',
          screen: '24 900 ₽',
          battery: '7 900 ₽',
          charging: '4 900 ₽',
          camera: '5 200 ₽',
          water: '10 900 ₽',
          other: 'от 4 500 ₽',
        },
        {
          model: 'MacBook Air 13" M3/M2',
          screen: '22 900 ₽',
          battery: '7 500 ₽',
          charging: '4 500 ₽',
          camera: '4 900 ₽',
          water: '9 900 ₽',
          other: 'от 4 500 ₽',
        },
        {
          model: 'MacBook Pro 13" Intel',
          screen: '18 900 ₽',
          battery: '6 900 ₽',
          charging: '4 200 ₽',
          camera: '4 500 ₽',
          water: '8 900 ₽',
          other: 'от 3 900 ₽',
        },
        {
          model: 'MacBook Air 13" Intel',
          screen: '14 900 ₽',
          battery: '5 900 ₽',
          charging: '3 900 ₽',
          camera: '3 900 ₽',
          water: '7 900 ₽',
          other: 'от 3 500 ₽',
        },
      ],
    },
    {
      id: 'applewatch',
      name: 'Apple Watch',
      icon: 'Watch',
      items: [
        {
          model: 'Apple Watch Ultra 2 / Ultra',
          screen: '16 900 ₽',
          battery: '4 900 ₽',
          charging: '3 200 ₽',
          camera: '—',
          water: '7 900 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'Apple Watch Series 9 / 8 / 7',
          screen: '9 900 ₽',
          battery: '3 900 ₽',
          charging: '2 900 ₽',
          camera: '—',
          water: '6 900 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'Apple Watch Series 6 / SE 2',
          screen: '7 900 ₽',
          battery: '3 500 ₽',
          charging: '2 500 ₽',
          camera: '—',
          water: '5 900 ₽',
          other: 'от 2 500 ₽',
        },
        {
          model: 'Apple Watch Series 5 / 4 / SE',
          screen: '6 900 ₽',
          battery: '3 200 ₽',
          charging: '2 500 ₽',
          camera: '—',
          water: '5 500 ₽',
          other: 'от 2 500 ₽',
        },
      ],
    },
  ],
  messengers: [
    {
      id: 'telegram',
      name: 'Telegram',
      icon: 'Send',
      url: 'https://t.me/ifix_service',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'MessageCircle',
      url: 'https://wa.me/79991234567',
    },
  ],
  socialLinks: [
    { name: 'Telegram', url: 'https://t.me/ifix_service' },
    { name: 'WhatsApp', url: 'https://wa.me/79991234567' },
    { name: 'VK', url: 'https://vk.com/ifix_service' },
  ],
  workSchedule: [
    { day: 'Пн', open: '10:00', close: '21:00', isOpen: true },
    { day: 'Вт', open: '10:00', close: '21:00', isOpen: true },
    { day: 'Ср', open: '10:00', close: '21:00', isOpen: true },
    { day: 'Чт', open: '10:00', close: '21:00', isOpen: true },
    { day: 'Пт', open: '10:00', close: '21:00', isOpen: true },
    { day: 'Сб', open: '11:00', close: '19:00', isOpen: true },
    { day: 'Вс', open: '11:00', close: '19:00', isOpen: true },
  ],
  screenReplacement: {
    title: 'Замена стекла дисплея',
    subtitle: 'Популярная услуга',
    description:
      'Самая частая проблема — разбитый экран. Мы быстро и аккуратно заменим стекло на любом устройстве Apple — от iPhone до iPad и MacBook. Используем только оригинальные и сертифицированные дисплеи.',
    image: '/images/cracked-screen.jpg',
    benefits: ['Гарантия 365 дней', 'От 30 минут', 'Оригинальное качество'],
    featureList: [
      'Без потери качества изображения и цветопередачи',
      'Сохранение оригинальной влагозащиты и олеофобного покрытия',
      'Работаем с техникой любой степени сложности повреждения',
    ],
  },
  whyUsFeatures: [
    {
      icon: 'Shield',
      title: 'Гарантия 1 год',
      description:
        'Предоставляем официальную гарантию на все виды работ и запчасти сроком 365 дней.',
    },
    {
      icon: 'Clock',
      title: 'Быстрый ремонт',
      description:
        'Большинство работ выполняем в день обращения. Замена стекла — от 30 минут.',
    },
    {
      icon: 'Award',
      title: 'Оригинальные запчасти',
      description:
        'Используем только оригинальные и сертифицированные комплектующие высшего качества.',
    },
    {
      icon: 'ThumbsUp',
      title: 'Прозрачные цены',
      description:
        'Фиксированная стоимость ремонта. Никаких скрытых платежей и дополнительных сборов.',
    },
    {
      icon: 'Sparkles',
      title: 'Чистота и аккуратность',
      description:
        'Работаем в специализированных условиях с антистатической защитой.',
    },
    {
      icon: 'Headphones',
      title: 'Поддержка 24/7',
      description:
        'Консультируем по любым вопросам до и после ремонта. Помогаем онлайн.',
    },
  ],
  processSteps: [
    {
      number: '01',
      icon: 'Search',
      title: 'Диагностика',
      description:
        'Бесплатно проверяем ваше устройство и определяем причину неисправности.',
    },
    {
      number: '02',
      icon: 'FileText',
      title: 'Согласование',
      description:
        'Сообщаем стоимость и сроки ремонта. Начинаем работу только после вашего согласия.',
    },
    {
      number: '03',
      icon: 'Wrench',
      title: 'Ремонт',
      description:
        'Выполняем ремонт в специализированных условиях с использованием профессионального оборудования.',
    },
    {
      number: '04',
      icon: 'CheckCircle',
      title: 'Проверка и выдача',
      description:
        'Тестируем устройство после ремонта и выдаём гарантийный талон сроком на 1 год.',
    },
  ],
  otherServices: [
    {
      icon: 'Smartphone',
      title: 'Смартфоны',
      description: 'Samsung, Xiaomi, Huawei, Google Pixel и другие',
    },
    {
      icon: 'Tablet',
      title: 'Планшеты',
      description: 'Samsung Galaxy Tab, Xiaomi Pad и другие',
    },
    {
      icon: 'Laptop',
      title: 'Ноутбуки',
      description: 'Lenovo, HP, Dell, ASUS и другие',
    },
    {
      icon: 'Monitor',
      title: 'Моноблоки',
      description: 'iMac, моноблоки и системные блоки',
    },
  ],
};
