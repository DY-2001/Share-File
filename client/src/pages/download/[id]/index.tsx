import RenderFile from "@components/RenderFile";
import axios from "axios";
import { IFile } from "libs/types";
import { GetServerSidePropsContext, NextPage } from "next";

const index: NextPage<{ file: IFile }> = ({
  file: { name, sizeInBytes, id },
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-3 space-y-4 bg-black rounded-md shadow-xl w-8/12">
      {!id ? (
        <span>oops! File does not exist, Check the URL</span>
      ) : (
        <>
          <RenderFile file={{ name, sizeInBytes }} />
          <h1 className="text-xl"> Your fiile is ready to be download</h1>
          <button className="button">
            <div className="flex justify-center gap-4 items-center">
              <img
                src="/images/file-download.png"
                alt="download img"
                className="w-7 h-7"
              />
              Download
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let file;
  try {
    const { data } = await axios.get(`http://localhost:5500/api/files/${id}`);
    file = data;
  } catch (e) {
    console.log(e);
    file = {};
  }
  return {
    props: {
      file: file,
    },
  };
}
