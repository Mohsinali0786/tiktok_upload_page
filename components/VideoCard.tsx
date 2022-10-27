import React, { useState, useRef } from "react";
import { Video } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { GoVerified } from "react-icons/go";
import { WebIcon } from "./index";
import { API_BASE_URL, VIDEOS_ROUTE, getAccessToken } from "../utils";
import { dummyUrl, userImage } from "../utils/constants";
import useAuthStore from "../store/authStore";
import axios from "axios";

interface IProps {
  post: Video;
}

//Another way of using typescript.
const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [getUrl, setGetUrl] = useState<any | undefined>("");
  const [posts, setPosts] = useState(post);
  const { userProfile }: { userProfile: any } = useAuthStore();

  const videoRef = useRef<HTMLVideoElement>(null);

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
    // console.log('obj', obj)
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

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div className="flex justify-between">
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
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
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/profile/${posts.owner?.id}`}>
              <a>
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {posts.owner?.username}
                  {` `}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {posts.owner?.username}
                </p>
              </a>
            </Link>
          </div>
        </div>
        <div>
          <button className="text-[#fe2c55] h-min mt-4 px-12 py-1 rounded border border-[#fe2c55] focus:outline-none  font-bold  text-md text-center ">
            Follow
          </button>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >

          {userProfile ? <Link href={`/detail/${posts.id}`}>
            <a>
              <video
                ref={videoRef}
                controls={isHover}
                src={posts.standard || dummyUrl}
                className="lg:w-[500px] text-[35px] h-[500px] lg:h-[650px] w-[450px] cursor-pointer rounded-2xl bg-gray-100"
              />
            </a>
          </Link> : <Link href="">
            <a>
              <video
                ref={videoRef}
                controls={isHover}
                src={posts.standard || dummyUrl}
                className="lg:w-[500px] text-[35px] h-[500px] lg:h-[650px] w-[450px] cursor-pointer rounded-2xl bg-gray-100"
              />
            </a>
          </Link>}

        </div>
        <div className="flex flex-col items-center justify-between">
          <div></div>
          <div className="" onClick={urlParams}>
            <WebIcon
              comments={posts.comments}
              getUrl={post.id}
              post={posts}
              handleLike={handleLike}
              handleCount={handleCount}
            />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default VideoCard;
