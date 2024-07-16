import DropZoneComponent from "@components/DropZoneComponent";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  
  return (
    <div className="flex flex-col w-8/12 items-center justify-center space-y-4">
      <h1 className="my-4 text-3xl tracking-wider font-sans font-medium">
        Seamless File Sharing Made Simple
      </h1>
      <div className="flex flex-col bg-black p-6 items-center w-full shadow-xl rounded-xl justify-center ">
        <DropZoneComponent setFile={setFile} />
      </div>
    </div>
  );
}
