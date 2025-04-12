export function formatFileSize(fileSizeInBytes: number) {
    if (fileSizeInBytes < 1024) {
        return fileSizeInBytes + " bytes";
    } else if (fileSizeInBytes < 1024 * 1024) {
        return (fileSizeInBytes / 1024).toFixed(2) + " KB";
    } else if (fileSizeInBytes < 1024 * 1024 * 1024) {
        return (fileSizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
    } else {
        return (fileSizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    }
}