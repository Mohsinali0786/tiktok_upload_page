import React, { useState, useEffect, useRef } from "react";
import { MdViewHeadline } from "react-icons/md";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { Video } from "../types";
import { NextPage } from "next";
import { MobileSidebar } from "./index";
import useAuthStore from "../store/authStore";
import { API_BASE_URL, BASE_URL, VIDEOS_ROUTE, getAccessToken } from "../utils";
import { dummyUrl, userImage } from "../utils/constants";
import axios from "axios";
import { SideIcon, Loading } from "./index";
import Image from "next/image";
import Link from "next/link";
import useElementOnScreen from "../utils/useElementOnScreen";

interface IProps {
  post: Video;
  index: number;
}

interface IState {
  showMobileSidebar: boolean;
}

const MobileVideo: NextPage<IProps> = ({ post, index }) => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [playing, setPlaying] = useState(false);
  const videoRef = React.useRef() as React.MutableRefObject<HTMLVideoElement>;

  const [isHover, setIsHover] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState<IState["showMobileSidebar"]>(false);
  const [getUrl, setGetUrl] = useState<any | undefined>("");
  const [posts, setPosts] = useState(post);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const urlParams: any = () => {
    let vided = videoRef.current?.getAttribute("data-prefix");

    if (vided !== undefined || vided !== null) {
      setGetUrl(vided);
    } else {
      return;
    }
  };

  const handleCount = async (share: boolean) => {
    let accessToken: any = await getAccessToken()
    // let obj = {
    //   ...posts,
    //   shares: posts.shares + 1 
    // }
    if (userProfile) {
      const { data } = await axios.post(`${API_BASE_URL}/${VIDEOS_ROUTE}${posts?.id}/share`, {
        userId: userProfile.id,
        postId: posts.id,
        share,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      setPosts({ ...posts, shares: posts.shares + 1 });
    }
  };

  const handleLike = async (like: boolean) => {
    let accessToken: any = await getAccessToken()

    if (userProfile) {
      const { data } = await axios.post(`${API_BASE_URL}/${VIDEOS_ROUTE}${posts?.id}/heart`, {
        userId: userProfile.id,
        postId: posts.id,
        like,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      setPosts({ ...posts, hearts: posts.hearts + 1 });
    }
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const isVisibile = useElementOnScreen(options, videoRef);

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(!playing);
    } else {
      videoRef?.current?.play();
      setPlaying(!playing);
    }
  };

  const onEnded = () => {
    let answer = videoRef.current.scrollTop;
    let windowHeight = videoRef.current.getBoundingClientRect().height;
    answer = answer + windowHeight;
  };

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);
      let accessToken: any = await getAccessToken()

      const { data } = await axios.put(`${API_BASE_URL}/${VIDEOS_ROUTE}${posts.id}`, {
        userId: userProfile.id,
        comment,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      setPosts({ ...posts, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        videoRef?.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        videoRef?.current.pause();
        setPlaying(false);
      }
    }
  }, [isVisibile]);

  useEffect(() => {
    setTimeout(() => {
      if (index === 0) {
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }, 500);
  }, []);

  useEffect(() => {
    if (posts && videoRef?.current) {
      videoRef.current.muted = true
    }
  }, [posts]);

  if (!posts) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col left-0 top-0 bottom-0 right-0 bg-black">
        <div className="relative flex-auto">
          <div
            className="flex justify-center h-[100vh] w-full items-center bg-black bg-no-repeat bg-cover bg-center "
          // style={{ maxHeight: "calc(100% - 55px)" }}
          >
            <div className="fixed top-6 left-2 lg:left-6 flex gap-6 z-50">
              <p
                className="cursor-pointer"
                onClick={() => setShowMobileSidebar(true)}
              >
                <MdViewHeadline
                  className="text-gray-200 hover:text-[#F51997] text-[40px]"
                  style={{ pointerEvents: "auto" }}
                />
              </p>
            </div>
            {showMobileSidebar && (
              <MobileSidebar setShowMobileSidebar={setShowMobileSidebar} />
            )}
            <div
              onMouseEnter={() => {
                setIsHover(true);
              }}
              onMouseLeave={() => {
                setIsHover(false);
              }}
            >
              <div className=" relative h-full w-full snap-start">
                <video
                  ref={videoRef}
                  src={posts.standard || dummyUrl}
                  className="object-cover h-[100vh] object-contain w-[100vw]"
                  key={posts.id}
                  loop
                  muted={false}
                  data-prefix={posts.id}
                  playsInline
                  onEnded={onEnded}

                />
                <div className="relative bottom-[149px] left-0 z-[5] leading-4 pb-3 mix-blend-difference">
                  <div className="z-[5]">
                    <Link href={`/profile/${posts.owner?.id}`}>
                      <a className="text-md text-gray-100 font-[450] lowercase mb-1 cursor-pointer px-3">
                        @{posts.owner?.username}
                      </a>
                    </Link>
                    <div className="flex justify-between pr-3 w-[100vw] pt-2 " style={{ height: "fit-content" }}>
                      <p className="text-md text-gray-100 font-[450] lowercase cursor-pointer w-[70%] px-3">
                        {posts.title}
                      </p>
                      <p className=" w-[30%] border-l-0 border-red-50"></p>
                    </div>
                  </div>
                </div>
              </div>
              {isHover && (
                <div className="absolute top-[28%] left-[40%] cursor-pointer ">
                  {!playing ? (
                    <button onClick={onVideoClick}>
                      <BsFillPlayFill className="text-gray-200 text-8xl font-bold" />
                    </button>
                  ) : (
                    <button onClick={onVideoClick}>
                      <BsFillPauseFill className="text-gray-200 text-8xl  font-semibold opacity-0" />
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="absolute top-[30%] right-3" onClick={urlParams}>
              <div className="font-extralight overflow-visible relative ">
                <Link href={`/profile/${posts.owner?.id}`}>
                  <a>
                    <Image
                      width={62}
                      height={62}
                      className="rounded-full"
                      src={posts.owner?.avatar || userImage}
                      layout="responsive"
                      alt="profile photo"
                    />
                  </a>
                </Link>
                <SideIcon
                  getUrl={getUrl}
                  handleLike={handleLike}
                  handleCount={handleCount}
                  post={posts}
                  comment={comment}
                  setComment={setComment}
                  addComment={addComment}
                  isPostingComment={isPostingComment}
                  comments={posts.comments}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MobileVideo;
