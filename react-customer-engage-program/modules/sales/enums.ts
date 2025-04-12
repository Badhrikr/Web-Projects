export enum Status {
    NEW = "New",
    PROCESSING = "Processing",
    ACTIVE = "Active",
    INACTIVE = "InActive",
    CLOSED = "Closed",
}

export enum AssignStatus {
    ASSIGNED = "Assigned",
    NON_ASSIGNED = "Non-Assigned"
}

export enum SortField {
    NAME = "Name",
    DATE = "Date",
    TYPE = "Type",
}

export enum SortOrder {
    ASC = "Asc",
    DESC = "Desc"
}

export enum LeadStatus {
    QUALIFIED = "Qualified",
    DISQUALIFIED = "DisQualified"
}

export enum AssignedTo {
    ME = "@me",
    OTHERS = "@others",
}

// TODO
export enum LeadUpdateType {
    QUALIFY_LEAD = "QualifyLead",
    LEAD_STATUS = "LeadStatus",
    LEAD_ASSIGN_TO = "AssignTo",
}

export enum CustomerUpdateType {
    CUSTOMER_ASSIGN_TO = "CustomerAssignTo",
    QUALIFY_CUSTOMER = "QualifyCustomer",

    // Extra action added for notification purpose
    CustomerCreated = "RegisterCustomerStep2",
}

export enum UpdateType {
    QUALIFY_LEAD = "QualifyLead",
    ASSIGN_TO = "AssignTo",
    LEAD_STATUS = "LeadStatus",
    QUALIFY_CUSTOMER = "QualifyCustomer"
}

export enum LeadTrackerAction {
    NEW = "New",
    ASSIGNED_BY = "AssignedBy",
    ASSIGNED_TO = "AssignedTo",
    QUALIFIED = "Qualified",
    DISQUALIFIED = "DisQualified",
    ACTIVE = "Active",
    INACTIVE = "InActive",
    CLOSED = "Closed",
    FOLLOW_UP = "FollowUp",
    LEAD_DETAILS_UPDATE = "LeadDetailsUpdate",
    LEAD_STATUS = "LeadStatus",
}

export enum NotificationAction {
    CUSTOMER = "Customer"
}

export enum MigrationType {
    APPLICATION = "Application",
    DATABASE = "Database",
    BATCH = "Batch",
}

export enum MigrationRequestType {
    LEGACY = "Legacy Migration",
    CLOUD = "Cloud Migration",
} 