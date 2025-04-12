export enum NormalFileUploadType {
    POC_SOURCECODE = "POCSourceCode",
    FUNCTIONAL_WALKTHROUGH = "Functionalwalkthrough",
    SOURCE_CODE = "SourceCode",
    TIMELINES = "Timelines",
    PROPOSAL = "Proposal",
    PURCHASE_ORDER = "PurchaseOrder",
    ARTIFACTS = "Artifacts",
}

export enum SignedFileUploadType {
    PROJECT_NDA = "ProjectNDA",
    POC_NDA = "POCNDA",
}

export type FileUploadType = NormalFileUploadType | SignedFileUploadType;

export enum FileType {
    PDF = "pdf",
    DOC = "doc",
    DOCX = "docx",
    TXT = "txt",
    ZIP = "zip",
    JPEG = "jpeg",
    PNG = "png",
    XLSX = "xlsx",
    XLS = "xls",
    CSV = "csv",
    PPT = "ppt",
    PPTX = "pptx",
}