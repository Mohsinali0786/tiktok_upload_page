import { useEffect } from "react";
import { Video } from "../types";
import { VideoCard, NoResults, MobileVideo } from "../components";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/router";

const Home = () => {
  const showUserVideos = false;
  const { fetchAllVideos } = useAuthStore();
  const { videos }: { videos: Video[] } = useAuthStore();
  const Router = useRouter();
  const { topic } = Router.query;

  useEffect(() => {
    fetchAllVideos()
  }, [topic])

  if (!videos.length && topic) {
    return (
      <NoResults
        text={`No video associated with ${topic}`}
        showUserVideos={showUserVideos}
      />
    );
  }
  if (!videos.length && !topic) {
    return (
      <NoResults text={`No video posted yet`} showUserVideos={showUserVideos} />
    );
  }
  return (
    <>
      <div className="flex flex-col gap-10 videos md:block hidden  ">
        {videos.map((video: Video) => {
          return <VideoCard post={video} key={video.id} />;
        })}
      </div>
      <div
        className="flex flex-col bg-black md:hidden block h-full"
        id="scroll-window"
      >
        {videos.map((video: Video, index: number) => {
          return <MobileVideo post={video} key={video.id} index={index} />;
        })}
      </div>
    </>
  );
};

//we are making a request to this url http://localhost:3000/api/post since the backend is in api/post in our project folder.

//We use getServerSideProps to fetch data in next.js backend. in this case we are trying to fetch the videos from sanity once the page loads
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response: any = null;
  // if (topic) {
  //   // response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  //   response = await axios.get(`${API_BASE_URL}/${VIDEOS_ROUTE}`)
  // } else {
  //   response = await axios.get(`${API_BASE_URL}/${VIDEOS_ROUTE}`)
  // }

  // if (!response?.results?.length) {
  //   return {
  //     msg: "Data not fetched",
  //   };
  // }


  // return {
  //   props: {
  //     videos: response.results,
  //   }
  // };
  return {
    props: {
      videos: [],
    }

  };
};

// http://localhost:3000/
export default Home;
