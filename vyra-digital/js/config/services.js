// on:1 تظهر، on:0 تختفي. big:1 بطاقة عريضة.
// كل خدمة: [الاسم، المشكلة، ما نقدمه]
const SERVICES = [
  { id:"web",  on:1, big:1,
    ar:["تصميم وتطوير المواقع","موقعك هو أول انطباع عنك، وغالباً لا يعكس جودة عملك.","موقع سريع وواضح يشرح ما تقدمه ويقود الزائر إلى التواصل."],
    en:["Website Design & Development","Your site is the first impression, and it often undersells your work.","A fast, clear site that explains what you offer and moves visitors to act."] },
  { id:"ux",   on:1,
    ar:["تصميم UI/UX","واجهات مربكة تُضيّع العملاء.","تجربة واضحة وسهلة الاستخدام."],
    en:["UI/UX Design","Confusing interfaces lose customers.","Clear, easy-to-use experiences."] },
  { id:"shop", on:1,
    ar:["حلول المتاجر الإلكترونية","البيع عبر الرسائل يستهلك وقتك.","متجر منظم يستقبل الطلبات بسهولة."],
    en:["E-commerce Solutions","Selling through chat eats your time.","An organized store that takes orders smoothly."] },
  { id:"lp",   on:1,
    ar:["صفحات الهبوط","حملة بلا صفحة مركزة تضيع الجهد.","صفحة واحدة تركّز على هدف واحد."],
    en:["Landing Pages","A campaign without a focused page wastes effort.","One page built around one goal."] },
  { id:"ai",   on:1, big:1,
    ar:["حلول الذكاء الاصطناعي","مهام متكررة تستهلك فريقاً صغيراً.","أدوات ذكية تختصر الوقت في العمل اليومي."],
    en:["AI Solutions","Repetitive tasks drain small teams.","Smart tools that save time in daily work."] },
  { id:"ag",   on:1,
    ar:["وكلاء الذكاء الاصطناعي","الرد على نفس الأسئلة مراراً.","وكيل يتعامل مع المهام المحددة نيابةً عنك."],
    en:["AI Agents","Answering the same questions again and again.","An agent that handles defined tasks for you."] },
  { id:"auto", on:1,
    ar:["أتمتة الأعمال","عمليات يدوية تبطئ النمو.","ربط الأدوات وتشغيل الإجراءات تلقائياً."],
    en:["Business Automation","Manual processes slow growth.","Connected tools and automatic workflows."] },
  { id:"dx",   on:1,
    ar:["تجارب رقمية","الأفكار الجيدة تحتاج شكلاً يُشعر به.","تجارب تفاعلية تميّز علامتك."],
    en:["Digital Experiences","Good ideas need a form people can feel.","Interactive experiences that set your brand apart."] }
];
