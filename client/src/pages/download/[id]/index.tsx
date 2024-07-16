import axios from "axios";
import { IFile } from "libs/types";
import { GetServerSidePropsContext, NextPage } from "next";

const index: NextPage<{ file: IFile }> = ({ file }) => {
  return <div>{file.name}</div>;
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
