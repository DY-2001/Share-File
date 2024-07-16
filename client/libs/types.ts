export interface IFile {
    name: string,
    sizeInBytes: number,
    id?: string,
}

export enum EUploadState {
    UPLOADING = "Uploading",
    UPLOAD_FAILED = "Upload Failed",
    UPLOADED = "Uploaded",
    UPLOAD = "Upload"
}