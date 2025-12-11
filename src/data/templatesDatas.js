export const templatesDatas = [
    {
        id: 1,
        category: "Маркетинг",
        rating: 4.8,
        icon: "@/assets/templates/marketing-icon.svg",
        title: "Объявление о продукте",
        uses: 45,
        content: {
            intro: "🚀 Представляем новый {product_name}!",
            description: "✨ Основные преимущества:",
            benefits: [
                "{benefit_1}",
                "{benefit_2}", 
                "{benefit_3}"
            ],
            offer: "🔥 Специальная цена до {date}: {price}",
            hashtags: "#новинка #продукт #{category}"
        },
        hashtags: ["#продукт", "#анонс", "#маркетинг"]
    },
    {
        id: 2,
        category: "Обучение",
        rating: 4.5,
        icon: "@/assets/templates/education-icon.svg",
        title: "Анонс вебинара",
        uses: 32,
        content: {
            intro: "🎓 Приглашаем на вебинар: {webinar_topic}!",
            description: "📚 Что вы узнаете:",
            benefits: [
                "{topic_1}",
                "{topic_2}",
                "{topic_3}"
            ],
            offer: "📅 Дата: {date} ⏰ Время: {time}",
            hashtags: "#обучение #вебинар #{topic}"
        },
        hashtags: ["#вебинар", "#обучение", "#онлайн"]
    },
    {
        id: 3,
        category: "Новости",
        rating: 4.7,
        icon: "@/assets/templates/news-icon.svg",
        title: "Корпоративные новости",
        uses: 28,
        content: {
            intro: "📢 Важное объявление от {company_name}!",
            description: "🔍 Ключевые моменты:",
            benefits: [
                "{news_point_1}",
                "{news_point_2}",
                "{news_point_3}"
            ],
            offer: "📅 Эффективно с {start_date}",
            hashtags: "#новости #компания #{industry}"
        },
        hashtags: ["#новости", "#компания", "#объявление"]
    },
    {
        id: 4,
        category: "Промо",
        rating: 4.9,
        icon: "@/assets/templates/promo-icon.svg",
        title: "Розыгрыш и конкурс",
        uses: 51,
        content: {
            intro: "🎉 Грандиозный розыгрыш от {brand_name}!",
            description: "🏆 Призы:",
            benefits: [
                "{prize_1}",
                "{prize_2}",
                "{prize_3}"
            ],
            offer: "⏰ Успей до {end_date}! Условия: {conditions}",
            hashtags: "#розыгрыш #конкурс #{brand}"
        },
        hashtags: ["#розыгрыш", "#конкурс", "#призы"]
    },
    {
        id: 5,
        category: "Развлечение",
        rating: 4.6,
        icon: "@/assets/templates/entertainment-icon.svg",
        title: "Анонс мероприятия",
        uses: 39,
        content: {
            intro: "🎪 Приглашаем на {event_name}!",
            description: "🌟 Что вас ждет:",
            benefits: [
                "{activity_1}",
                "{activity_2}",
                "{activity_3}"
            ],
            offer: "📍 Место: {location} 🎟️ Билеты: {ticket_price}",
            hashtags: "#мероприятие #развлечение #{event_type}"
        },
        hashtags: ["#мероприятие", "#ивент", "#развлечения"]
    },
    {
        id: 6,
        category: "Маркетинг",
        rating: 4.8,
        icon: "@/assets/templates/marketing-icon.svg",
        title: "Email-рассылка",
        uses: 47,
        content: {
            intro: "📧 {subject_line}",
            description: "📋 В этом выпуске:",
            benefits: [
                "{feature_1}",
                "{feature_2}",
                "{feature_3}"
            ],
            offer: "👉 Ссылка: {link} 🔗 Подробнее: {details_link}",
            hashtags: "#email #рассылка #{newsletter_topic}"
        },
        hashtags: ["#email", "#маркетинг", "#рассылка"]
    },
    {
        id: 7,
        category: "Обучение",
        rating: 4.4,
        icon: "@/assets/templates/education-icon.svg",
        title: "Учебный материал",
        uses: 23,
        content: {
            intro: "📖 Новый учебный материал: {material_title}!",
            description: "🎯 Основные темы:",
            benefits: [
                "{lesson_1}",
                "{lesson_2}",
                "{lesson_3}"
            ],
            offer: "📥 Скачать: {download_link} 📚 Страниц: {page_count}",
            hashtags: "#обучение #материал #{subject}"
        },
        hashtags: ["#учеба", "#материал", "#образование"]
    },
    {
        id: 8,
        category: "Промо",
        rating: 4.7,
        icon: "@/assets/templates/promo-icon.svg",
        title: "Скидочный промокод",
        uses: 62,
        content: {
            intro: "💎 Специальное предложение для вас!",
            description: "🎁 Ваш промокод:",
            benefits: [
                "Код: {promo_code}",
                "Скидка: {discount}",
                "Срок: {valid_until}"
            ],
            offer: "🔗 Использовать: {link} 💰 Минимум: {min_order}",
            hashtags: "#скидка #промокод #{store_name}"
        },
        hashtags: ["#промокод", "#скидка", "#экономия"]
    }
];