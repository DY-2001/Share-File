import DropZoneComponent from "@components/DropZoneComponent";
import RenderFile from "@components/RenderFile";
import axios from "axios";
import { useState } from "react";
import DownloadFile from "@components/DownloadFile";
import { EUploadState } from "libs/types";
import EmailForm from "@components/EmailForm";

export default function Home() {
  const [file, setFile] = useState<File | undefined>();
  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadState, setUploadState] = useState<EUploadState>(
    EUploadState.UPLOAD
  );

  const handleUpload = async () => {
    if (uploadState === EUploadState.UPLOADING) return;
    if (!file) return;
    setUploadState(EUploadState.UPLOADING);
    const formData = new FormData();
    formData.append("myFile", file);

    try {
      const { data } = await axios({
        method: "POST",
        data: formData,
        url: "api/files/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setDownloadPageLink(data.downloadPageLink);
      setId(data.id);
      setUploadState(EUploadState.UPLOADED);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response.data.message);
      setUploadState(EUploadState.UPLOAD_FAILED);
    }
  };

  const handleReUpload = () => {
    setUploadState(EUploadState.UPLOAD);
    setFile(undefined);
    setDownloadPageLink(null);
    setId(null);
  };

  return (
    <div className="flex flex-col w-8/12 items-center justify-center space-y-4">
      <h1 className="my-4 text-3xl tracking-wider font-sans font-medium">
        Seamless File Sharing Made Simple
      </h1>
      <div className="flex flex-col bg-black p-6 items-center w-full shadow-xl rounded-xl justify-center ">
        {!file && <DropZoneComponent setFile={setFile} />}
        {uploadState === EUploadState.UPLOAD_FAILED && (
          <div className="font-sans mb-4">{errorMessage}</div>
        )}

        {file &&
          uploadState !== EUploadState.UPLOADED &&
          uploadState !== EUploadState.UPLOAD_FAILED && (
            <>
              <RenderFile
                file={{
                  name: file.name,
                  sizeInBytes: file.size,
                }}
              />
              <div className="flex space-x-4">
                <button onClick={handleUpload} className="button">
                  {uploadState === EUploadState.UPLOADING
                    ? "Uploading..."
                    : "Upload"}
                </button>
                <button
                  onClick={handleReUpload}
                  className="p-2 my-5 bg-white rounded-md w-44 focus:outline-none text-black font-sans font-semibold"
                  disabled={uploadState === EUploadState.UPLOADING}
                >
                  Re-Upload
                </button>
              </div>
            </>
          )}

        {uploadState === EUploadState.UPLOADED && downloadPageLink && (
          <div className="flex flex-col items-center justify-center">
            <DownloadFile downloadPageLink={downloadPageLink} />
            <EmailForm id={id ? id : ""} />
          </div>
        )}

        {file &&
          (uploadState === EUploadState.UPLOADED ||
            uploadState === EUploadState.UPLOAD_FAILED) && (
            <button
              onClick={handleReUpload}
              className="p-2 my-5 bg-white rounded-md w-44 focus:outline-none text-black font-sans font-semibold"
            >
              Re-Upload
            </button>
          )}
      </div>
    </div>
  );
}
