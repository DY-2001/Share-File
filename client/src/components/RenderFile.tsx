import { IFile } from "libs/types";
import { FunctionComponent } from "react";

const RenderFile: FunctionComponent<{ file: IFile }> = ({ file }) => {
  return (
    <div className="flex flex-col justify-center items-center h-80 space-y-4">
      <img src="/images/file-icon.png" alt="file icon" className="w-16 h-16" />
      <div className="flex flex-col justify-center items-center font-sans">
        <span>{file.name}</span>
        <span>{(file.sizeInBytes / 1048576).toFixed(2)} MB</span>
      </div>
    </div>
  );
};

export default RenderFile;
