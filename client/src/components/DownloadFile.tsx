import { useState } from "react";

const DownloadFile = ({ downloadPageLink }: { downloadPageLink: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(downloadPageLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <>
      <div className="p-1">
        <h1 className="my-2 text-lg font-medium">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic,
          maiores.
        </h1>
        <div className="flex justify-center items-center space-x-3">
          <span className="break-all"> {downloadPageLink}</span>
          <img
            src="./images/copy.png"
            alt="copy icon"
            className="w-6 h-6 object-contain cursor-pointer"
            onClick={handleCopy}
          />
        </div>
      </div>
      {isCopied && (
        <div className="fixed bottom-0 py-3 px-5 left-1/2 transform -translate-x-1/2 bg-black text-white rounded-md ease-in-out font-sans font-semibold tracking-wider">
          Link Copied!
        </div>
      )}
    </>
  );
};

export default DownloadFile;
