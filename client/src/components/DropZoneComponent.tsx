import { Dispatch, FunctionComponent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const DropZoneComponent: FunctionComponent<{ setFile: Dispatch<any> }> = ({
  setFile,
}) => {
  const [error, setError] = useState(false);
  const onDrop = useCallback((acceptedFiles: any) => {
    if (!acceptedFiles[0]) {
      setError(true);
      return;
    }
    setFile(acceptedFiles[0]);
    console.log("File Dropped", acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 52428800,
  });

  const handleReset = () => {
    setError(false);
    setFile(null);
  };

  return (
    <div
      {...(error ? {} : getRootProps())}
      className={`w-full h-80 flex justify-center rounded-xl focus:outline-none border-dashed border-2 border-sky-500 ${
        !error ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <input {...getInputProps()} disabled={error} />
      <div className="flex flex-col items-center justify-center space-y-3">
        {error ? (
          <img
            src="./images/warning.png"
            alt="warning-img"
            className="w-16 h-16"
          />
        ) : (
          <img
            src="./images/folder.png"
            alt="folder-img"
            className="w-16 h-16"
          />
        )}
        {error ? (
          <>
            <p className="font-sans text-xl">
              Sorry there something went wrong!
            </p>
            <ul className="list-disc">
              <li className="font-sans">Multiple files are not allowed</li>
              <li className="font-sans">File size should be less than 50MB</li>
            </ul>
            <button
              onClick={handleReset}
              className="bg-white text-black rounded-md focus:outline-none py-2 px-4 font-sans font-semibold"
            >
              Retry
            </button>
          </>
        ) : (
          <p className="font-sans">Drag & Drop Files Here</p>
        )}
      </div>
    </div>
  );
};

export default DropZoneComponent;
