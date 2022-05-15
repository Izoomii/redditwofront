import axios from "axios";
import Link from "next/link";
import { Container } from "../../components/Container";
import { Main } from "../../components/Main";
import { PostComponent } from "../../components/PostComponent";
import SubSideBar from "../../components/SubSideBar";
import { backURL, Post, Sub, User } from "../../globalVars/globals";

export default function SubPage(props: any) {
  const sub = props.data as Sub;

  return (
    <Container>
      <Main>
        <div className="grow bg-gray-800">
          {sub.posts.map((e, i) => {
            return (
              <div key={i}>
                <PostComponent post={e} withVotes={true} />
              </div>
            );
          })}
        </div>
      </Main>
      <SubSideBar sub={sub} />
    </Container>
  );
}

interface allSubsProps {
  name: string;
}

// export const getStaticPaths = async () => {
//   const res = await fetch(backURL + "/subs"); //CHNl
//   const data: Promise<allSubsProps[]> = await res.json();
//   const paths = (await data).map((elem) => {
//     return {
//       params: { subName: elem.name },
//     };
//   });
//   return {
//     paths: paths,
//     fallback: false,
//   };
// };

export const getServerSideProps = async (props: any) => {
  const subName = props.params.subName;
  const data = await axios
    .get(`${backURL}/subs/${subName}`, {
      withCredentials: true,
    })
    .then(({ data }) => {
      return data;
    });
  return {
    props: { data },
  };
};
