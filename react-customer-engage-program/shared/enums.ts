enum LeadType {
    DEMO_REQUEST = "DemoRequest",
    CALLBACK_REQUEST = "CallBackRequest",
    CONTENT_VIEW = "ContentView",
    WELCOME = "Welcome",
    REFFERAL = "Refferal",
}

enum ApplicationRoles {
    SALES_PERSON = "SalesPerson",
    DELIVERY_PARTNER = "DeliveryPartner",
    ADMIN = "Admin",
    CUSTOMER = "Customer"
}

enum TechnologyType {
    SOURCE_TECHNOLOGY = "SourceTechnology",
    FRONTEND = "FrontEnd",
    MIDDLEWARE = "MiddleWare",
    DATABASE = "Database",
    SCHEDULER = "Scheduler",
    BATCH = "Batch",
    TARGET_TECHNOLOGY = "TargetTechnology"
}

enum ExportType {
    PDF = "Pdf",
    EXCEL = "Excel"
}


export { LeadType, ApplicationRoles, TechnologyType, ExportType }