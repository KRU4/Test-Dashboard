export const translations = {
  en: {
    // Navigation
    webhooks: "Webhooks",
    aboutCompany: "About Company",
    services: "Services",
    data: "Data",
    
    // Common
    save: "Save",
    cancel: "Cancel",
    upload: "Upload",
    send: "Send",
    loading: "Loading...",
    success: "Success",
    error: "Error",
    
    // Webhooks Page
    webhookConfiguration: "Webhook Configuration",
    aboutCompanyWebhook: "About Company Webhook",
    servicesWebhook: "Services Webhook",
    dataUploadWebhook: "Data Upload Webhook",
    assistantWebhook: "Assistant Webhook",
    webhookSaved: "Webhook saved successfully",
    invalidUrl: "Please enter a valid HTTPS URL",
    webhookNotConfigured: "Please configure webhook first",
    
    // About Company Page
    companyName: "Company Name",
    description: "Description",
    companyNameRequired: "Company name is required (2-100 characters)",
    descriptionRequired: "Description is required (10-500 characters)",
    companyInfoSaved: "Company information saved successfully",
    
    // Services Page
    serviceConfiguration: "Service Configuration",
    selectService: "Select Service",
    personalAssistant: "Personal Assistant",
    companyAssistant: "Company Assistant",
    moderationAgent: "Moderation Agent",
    salesAgent: "Sales Agent",
    customerSupport: "Customer Support",
    numberOfUsers: "Number of Users",
    enableTools: "Enable Tools",
    createImage: "Create Image",
    createDocsFile: "Create Docs File",
    telegramSender: "Telegram Sender",
    whatsappSender: "WhatsApp Sender",
    serviceTypeRequired: "Please select a service type",
    atLeastOneTool: "Please select at least one tool",
    serviceSaved: "Service configuration saved successfully",
    
    // Data Upload Page
    dataUpload: "Data Upload",
    uploadPdfDocument: "Upload PDF Document",
    dragDropPdf: "📄 Drag & Drop PDF here",
    orClickToBrowse: "or click to browse",
    pdfFilesOnly: "(PDF files only, max 10MB)",
    selectedFile: "Selected File",
    fileUploaded: "File uploaded successfully",
    invalidFile: "Please select a valid PDF file under 10MB",
    
    // Assistant
    aiAssistant: "AI Assistant",
    typeYourMessage: "Type your message...",
    clearChat: "Clear Chat",
    minimize: "Minimize",
    close: "Close",
    hello: "Hello! How can I help?",
    networkError: "Failed to connect. Please check your internet connection",
    validationError: "Please fill all required fields correctly",
    
    // Top Bar
    language: "Language",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
  },
  ar: {
    // Navigation
    webhooks: "الويبهوك",
    aboutCompany: "عن الشركة",
    services: "الخدمة",
    data: "البيانات",
    
    // Common
    save: "حفظ",
    cancel: "إلغاء",
    upload: "رفع",
    send: "إرسال",
    loading: "جاري التحميل...",
    success: "نجح",
    error: "خطأ",
    
    // Webhooks Page
    webhookConfiguration: "إعدادات الويبهوك",
    aboutCompanyWebhook: "ويبهوك معلومات الشركة",
    servicesWebhook: "ويبهوك الخدمات",
    dataUploadWebhook: "ويبهوك رفع البيانات",
    assistantWebhook: "ويبهوك المساعد",
    webhookSaved: "تم حفظ الويبهوك بنجاح",
    invalidUrl: "يرجى إدخال رابط HTTPS صحيح",
    webhookNotConfigured: "يرجى تكوين الويبهوك أولاً",
    
    // About Company Page
    companyName: "اسم الشركة",
    description: "الوصف",
    companyNameRequired: "اسم الشركة مطلوب (2-100 حرف)",
    descriptionRequired: "الوصف مطلوب (10-500 حرف)",
    companyInfoSaved: "تم حفظ معلومات الشركة بنجاح",
    
    // Services Page
    serviceConfiguration: "إعدادات الخدمة",
    selectService: "اختر الخدمة",
    personalAssistant: "المساعد الشخصي",
    companyAssistant: "مساعد الشركة",
    moderationAgent: "وكيل الإشراف",
    salesAgent: "وكيل المبيعات",
    customerSupport: "دعم العملاء",
    numberOfUsers: "عدد المستخدمين",
    enableTools: "تفعيل الأدوات",
    createImage: "إنشاء صورة",
    createDocsFile: "إنشاء ملف مستندات",
    telegramSender: "مرسل تيليجرام",
    whatsappSender: "مرسل واتساب",
    serviceTypeRequired: "يرجى اختيار نوع الخدمة",
    atLeastOneTool: "يرجى اختيار أداة واحدة على الأقل",
    serviceSaved: "تم حفظ إعدادات الخدمة بنجاح",
    
    // Data Upload Page
    dataUpload: "رفع البيانات",
    uploadPdfDocument: "رفع مستند PDF",
    dragDropPdf: "📄 اسحب وأفلت ملف PDF هنا",
    orClickToBrowse: "أو انقر للتصفح",
    pdfFilesOnly: "(ملفات PDF فقط، الحد الأقصى 10 ميجابايت)",
    selectedFile: "الملف المحدد",
    fileUploaded: "تم رفع الملف بنجاح",
    invalidFile: "يرجى اختيار ملف PDF صحيح أقل من 10 ميجابايت",
    
    // Assistant
    aiAssistant: "المساعد الآلي",
    typeYourMessage: "اكتب رسالتك...",
    clearChat: "مسح المحادثة",
    minimize: "تصغير",
    close: "إغلاق",
    hello: "مرحباً! كيف يمكنني المساعدة؟",
    networkError: "فشل الاتصال. يرجى التحقق من اتصال الإنترنت",
    validationError: "يرجى ملء جميع الحقول المطلوبة بشكل صحيح",
    
    // Top Bar
    language: "اللغة",
    theme: "المظهر",
    dark: "داكن",
    light: "فاتح",
  },
};

export type Language = 'en' | 'ar';
export type TranslationKey = keyof typeof translations.en;

