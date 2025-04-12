const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;
const SSO_BASE_PATH_API = process.env.NEXT_PUBLIC_SSO_BASE_PATH_API;
const PROCEDURE_BASE_PATH = process.env.NEXT_PUBLIC_PROCEDURE_BASE_PATH;
const CHATBOT = process.env.NEXT_PUBLIC_CHATBOT_BASE_PATH;

// DCEP API
export const POST_CREATE_CALLBACK_REQUEST = `${BASE_PATH}/CreateCallBackRequest`;
// export const POST_REGISTER_CUSTOMER_STEP1 = `${BASE_PATH}/RegisterCustomerStep1`;
// export const POST_REGISTER_CUSTOMER_STEP2 = `${BASE_PATH}/RegisterCustomerStep2`;
export const POST_CREATE_DEMO_REQUEST = `${BASE_PATH}/CreateDemoRequest`;
export const GET_NOTIFICATIONS_BY_USER = `${BASE_PATH}/GetNotificationByUser`;
export const PUT_MARK_NOTIFICATION_VIEWED = `${BASE_PATH}/MarkNotificationsViewed`;
// export const GET_CUSTOMER_BY_ENC_ID = `${BASE_PATH}/GetCustomerById`;
export const GET_ALL_LEADS_WITH_PAGINATION = `${BASE_PATH}/GetAllLeadsWithPagination`;
// export const GET_ALL_CUSTOMERS = `${BASE_PATH}/GetAllCustomers`;
export const GET_LEAD_BY_ID = `${BASE_PATH}/GetLeadById`;
export const PUT_UPDATE_LEAD_DETAILS = `${BASE_PATH}/UpdateLeadDetails`;
export const PUT_LEAD_UPDATE = `${BASE_PATH}/LeadUpdate`;
export const GET_LEADS_TRACKER_BY_ID = `${BASE_PATH}/GetLeadsTrackerByLeadsId`;
export const POST_SAVE_USER_DETAIL = `${BASE_PATH}/SaveUserDetail`;
export const GET_TECHNOLOGIES_BY_TECHNOLOGY_TYPE = `${BASE_PATH}/GetTechnologiesByTechnologyType`;
// export const GET_ALL_BUSINESS_DOMAINS = `${BASE_PATH}/GetAllBusinessDomains`;

export const PUT_CUSTOMER_UPDATE = `${BASE_PATH}/UpdateCustomer`;
// export const GET_CUSTOMER_BY_ID = `${BASE_PATH}/GetCustomerById`;

// SSO API
export const GET_SALES_PERSONS = `${SSO_BASE_PATH_API}/getusers?clientName=DCEP-Application&selectedRoles=SalesPerson`;


// PROCEDURE-API


// Common
export const POST_GET_SIGNED_USER_DETAILS = `${PROCEDURE_BASE_PATH}/Common/GetSignedUserDetails`;


// CUSTOMER
export const POST_REGISTER_CUSTOMER_STEP1 = `${PROCEDURE_BASE_PATH}/Customer/RegisterCustomerStep1`;
export const GET_CUSTOMER_BY_ENC_ID = `${PROCEDURE_BASE_PATH}/Customer/GetCustomerByEncId`;
export const GET_ALL_BUSINESS_DOMAINS = `${PROCEDURE_BASE_PATH}/BusinessDomain/GetAllBusinessDomains`;
export const POST_REGISTER_CUSTOMER_STEP2 = `${PROCEDURE_BASE_PATH}/Customer/RegisterCustomerStep2`;
export const GET_CUSTOMER_BY_ID = `${PROCEDURE_BASE_PATH}/Customer/GetCustomerById`;
export const GET_ALL_CUSTOMERS = `${PROCEDURE_BASE_PATH}/Customer/GetAllCustomers`;
export const PUT_CUSTOMER_ASSIGN_SALES_PERSON = `${PROCEDURE_BASE_PATH}/Customer/AssignSalesPerson`;
export const PUT_CUSTOMER_QUALIFY_DISQUALIFY = `${PROCEDURE_BASE_PATH}/Customer/QualifyDisqualifyCustomer`;


// CREATE MIGRATION REQUEST
export const GET_OFFERINGS = `${PROCEDURE_BASE_PATH}/CreateMigrationRequest/GetOfferings`;
export const GET_OFFERING_TYPES = `${PROCEDURE_BASE_PATH}/CreateMigrationRequest/GetOfferingTypes`;
export const GET_COMPONENTS = `${PROCEDURE_BASE_PATH}/CreateMigrationRequest/GetComponents`;
export const POST_CREATE_MIGRATION_REQUEST = `${PROCEDURE_BASE_PATH}/CreateMigrationRequest`;

export const POST_CREATE_MESSAGES = `${PROCEDURE_BASE_PATH}/RequestTracker/CreateMessage`;
export const GET_MIGRATION_REQUEST_CONVERSATION = `${PROCEDURE_BASE_PATH}/RequestTracker/GetConversation`;
export const GET_MIGRATION_REQUEST_MEMBERS = `${PROCEDURE_BASE_PATH}/RequestTracker/GetMembers`;
export const POST_CREATE_MIGRATION_REQUEST_MEMBERS = `${PROCEDURE_BASE_PATH}/RequestTracker/CreateUsers`;
export const GET_CUSTOMER_USERS = `${PROCEDURE_BASE_PATH}/RequestTracker/GetCustomerUsers`;
export const POST_ADD_CUSTOMER_USER = `${PROCEDURE_BASE_PATH}/RequestTracker/AddCustomerUser`;
export const POST_ADD_SALES_PERSON_USER = `${PROCEDURE_BASE_PATH}/RequestTracker/AddSalesPersonUser`;
export const GET_MIGRATION_REQUEST_TIMELINE = `${PROCEDURE_BASE_PATH}/RequestTracker/GetTimeline`;
export const POST_CREATING_MEETING = `${PROCEDURE_BASE_PATH}/RequestTracker/CreateMeeting`;
export const GET_ALL_MIGRATION_REQUEST_FILES = `${PROCEDURE_BASE_PATH}/RequestTracker/GetAllFiles`;

export const GET_REPOSITORY_UPLOADS = `${PROCEDURE_BASE_PATH}/Repository/GetRepositoryUploads`;
export const POST_CREATE_REPOSITORY_FOLDER = `${PROCEDURE_BASE_PATH}/Repository/CreateNewFolder`;
export const GET_SEARCH_REPOSITORY = `${PROCEDURE_BASE_PATH}/Repository/SearchRepositoryUploads`;
export const GET_DOWNLOAD_FILE_FROM_REPOSITORY = `${PROCEDURE_BASE_PATH}/Repository/DownloadRepositoryUploads`;
export const POST_UPLOAD_FILE_TO_REPOSITORY = `${PROCEDURE_BASE_PATH}/Repository/UploadRepositoryUploads`;
export const POST_COPY_TO_DESTINATION = `${PROCEDURE_BASE_PATH}/Repository/CopyToDestination`;
export const POST_MOVE_TO_DESTINATION = `${PROCEDURE_BASE_PATH}/Repository/MoveToDestination`;
export const POST_SHARE_FILES_FROM_REPOSITORY = `${PROCEDURE_BASE_PATH}/Repository/FileShareFromRepository`;

export const GET_CALENDAR_FOR_MIGRATION_REQUEST = `${PROCEDURE_BASE_PATH}/Calendar/GetCalendarForMigrationRequest`;
export const GET_CALENDAR_FOR_CUSTOMER = `${PROCEDURE_BASE_PATH}/Calendar/GetCalendarForCustomer`;
export const GET_CALENDAR_ALL = `${PROCEDURE_BASE_PATH}/Calendar/GetCalendar`;

export const POST_UPLOAD_FILE = `${PROCEDURE_BASE_PATH}/File/FileUpload`;
export const GET_DOWNLOAD_FILE = `${PROCEDURE_BASE_PATH}/File/FileDownload`;
export const GET_ALL_FILE_UPLOAD_TYPES = `${PROCEDURE_BASE_PATH}/File/GetFileUploadTypes`;

export const GET_MIGRATION_REQUEST_TASKS = `${PROCEDURE_BASE_PATH}/Tasks/GetTasks`;
export const GET_MIGRATION_REQUEST_TASKS_TO_INITIATE = `${PROCEDURE_BASE_PATH}/Tasks/GetTasksToInitiate`;
export const PUT_MIGRATION_REQUEST_TASK = `${PROCEDURE_BASE_PATH}/Tasks/UpdateTask`;

export const GET_ALL_MIGRATION_REQUESTS_FOR_CUSTOMER = `${PROCEDURE_BASE_PATH}/Customer/GetAllMigrationRequests`;

export const POST_CHATBOT = `${CHATBOT}`;

// DUMMY-DATA
export const GET_ALL_MIGRATION_REQUEST = `/temp/migration-requests.json`;
export const GET_ALL_MIGRATION_REQUEST_FOR_CUSTOMER = `/temp/GetMigrationRequestsForCustomer.json`;
export const GET_ALL_LEGACY_COMPONENTS = `/temp/GetAllComponents.json`;
export const GET_FILES_FOR_MIGRATION_REQUEST = `/temp/GetAllFilesForMigrationRequest.json`;
export const GET_SIGNED_FILES_FOR_MIGRATION_REQUEST = `/temp/GetAllSignedFilesForMigrationRequest.json`;
export const GET_ALL_RESPONSIBILITIES = `/temp/GetAllResponsibilities.json`;
export const GET_ADDED_RESPONSIBILITIES = `/temp/GetAddedResponsibilities.json`;
export const GET_CONVERSATIONS = `/temp/GetConversations.json`;

