import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import { FaShare, FaEllipsisH } from "react-icons/fa";
import axios from "axios";
import { ProfileVideoCard, NoResults, MainFooter } from "../../components";
import { IUser, Video } from "../../types";

import { BASE_URL, API_BASE_URL, USERS_ROUTE, VIDEOS_ROUTE } from "../../utils";
import { userImage, profileShareItems, profileOptions } from "../../utils/constants";


interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const router = useRouter()
  const userData = {
    following: "91",
    followers: "2836",
    likes: "60.6K",
    description: "Lorem ipsum description",
  };

  const [videosList, setVideosList] = useState<Video[]>([]);
  const [user, setUser] = useState({ ...data?.user });
  const [showUserVideos, setShowUserVideos] = useState(true);
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const id = router.query?.id

  const goToHome = () => router.push('/')

  // useEffect(() => {
  //   if (showUserVideos) {
  //     setVideosList(userVideos);
  //   }
  //   else {
  //     setVideosList(userLikedVideos);
  //   }
  // }, [showUserVideos, userLikedVideos, userVideos])

  useEffect(() => {

    // if (!id) {
    //   goToHome()
    // }
    // else {
    // getUserById()
    // getUserVideos()
    // }
    if (id) {
      getUserById()
      getUserVideos()
    }

  }, [router])

  const getUserById = () => {
    axios.get(`${API_BASE_URL}/${USERS_ROUTE}${id}`)
      .then((res) => {
        const d = res?.data

        if (!d?.id) {
          goToHome()
        }

        setUser({ ...d })
      })
  }

  const getUserVideos = () => {
    axios.get(`${API_BASE_URL}/${VIDEOS_ROUTE}`)
      .then((res) => {
        const d = res?.data

        // console.log('d', d)

        setVideosList([...d?.results])
      })
  }

  return (
    <>
      <div className="w-full mt-5">
        <div className="flex flex-col md:flex-row  gap-6 md:gap-10 mb-4 bg-white w-full">
          <div className="flex flex-col md:flex-row	gap-3 hover:bg-primary p-2 items-center cursor-pointer font-semibold rounded pt-2">
            <div className="w-32 h-40 md:w-16 md:h-32 md:w-32 md:h-32">
              <Image
                src={user?.avatar || userImage}
                width={34}
                height={34}
                className="rounded-full"
                alt="user profile"
                layout="responsive"
              />
            </div>

            <div
              className="flex flex-col justify-center"
              style={{ marginTop: "-1.5em" }}
            >


              <p className="md:text-2xl tracking-wider flex justify-center md:justify-start gap-1 text-center items-center md:justify-left text-md font-bold text-primary lowercase">
                {user?.username?.replaceAll(" ", "")}
                <GoVerified className="text-blue-400" />
              </p>
              <p className="capitalize md:text-xl text-gray-400 text-xs text-center md:text-left">
                {user?.username}

              </p>
              <button className="text-white h-min mt-4 px-12 py-1 rounded  bg-[#fe2c55] focus:outline-none  font-bold  text-md text-center ">
                Follow
              </button>
            </div>
          </div>

          <div className="flex hidden md:flex">
            <div>
              <button className="peer px-2 py-2  text-black">
                <FaShare />
              </button>
              {/* the menu here */}
              <div className="hidden peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg">
                {profileShareItems.map((item) => {
                  return (
                    <a
                      className="text-gray-700 block px-4 py-2 text-sm flex gap-2"
                      href="#"
                      key={item.name}
                    >
                      <span className="text-xl xl-text-md">{item.icon}</span>{" "}
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <button className="peer px-2 py-2  text-black">
                <FaEllipsisH />
              </button>
              {/* the menu here */}
              <div className="hidden peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg">
                {profileOptions.map((item) => {
                  return (
                    <a
                      className="text-gray-700 block px-4 py-2 text-sm flex gap-2"
                      href="#"
                      key={item.name}
                    >
                      <span className="text-xl xl-text-md">{item.icon}</span>{" "}
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[100vw]">
          <div className="flex gap-10 bg-white w-full justify-center md:justify-start ">
            <p className={` mt-2 ml-4 md:ml-0`}>
              <span className="font-bold">{userData.following}</span> Following
            </p>
            <p className={`mt-2 `}>
              <span className="font-bold">{userData.followers}</span> Followers
            </p>

            <p className={`mt-2 `}>
              <span className="font-bold">{userData.likes}</span> Likes
            </p>
          </div>
          <p className="mt-3 text-center md:text-left">
            {userData.description}
          </p>
        </div>

        <div className="w-100">
          <div className="flex gap-10 justify-around md:justify-start mb-1 mt-5 bg-white w-full ">
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 px-8 ml-4 md:ml-0 ${videos}`}
              onClick={() => setShowUserVideos(true)}
            >
              <span className="hidden md:block"> Videos</span>
              <span className="md:hidden">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 8C10.4477 8 10 8.44772 10 9V21C10 21.5523 10.4477 22 11 22H13C13.5523 22 14 21.5523 14 21V9C14 8.44772 13.5523 8 13 8H11ZM11 26C10.4477 26 10 26.4477 10 27V39C10 39.5523 10.4477 40 11 40H13C13.5523 40 14 39.5523 14 39V27C14 26.4477 13.5523 26 13 26H11ZM22 9C22 8.44772 22.4477 8 23 8H25C25.5523 8 26 8.44772 26 9V21C26 21.5523 25.5523 22 25 22H23C22.4477 22 22 21.5523 22 21V9ZM23 26C22.4477 26 22 26.4477 22 27V39C22 39.5523 22.4477 40 23 40H25C25.5523 40 26 39.5523 26 39V27C26 26.4477 25.5523 26 25 26H23ZM34 9C34 8.44772 34.4477 8 35 8H37C37.5523 8 38 8.44772 38 9V21C38 21.5523 37.5523 22 37 22H35C34.4477 22 34 21.5523 34 21V9ZM35 26C34.4477 26 34 26.4477 34 27V39C34 39.5523 34.4477 40 35 40H37C37.5523 40 38 39.5523 38 39V27C38 26.4477 37.5523 26 37 26H35Z"
                  />
                </svg>
              </span>
            </p>
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 px-8 ${liked}`}
              onClick={() => setShowUserVideos(false)}
            >
              <span className="md:hidden">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.70963 10.5561C12.9471 6.35097 19.64 6.41437 24 11.1862C28.36 6.41437 35.0529 6.35097 39.2904 10.5561C42.1715 13.4152 43.113 17.4725 42.1146 21.1146L39.4961 18.4961C39.5623 16.4013 38.7894 14.2854 37.1772 12.6855C34.1234 9.65506 29.2603 9.6593 26.0149 13.4353L25.9761 13.4804L25.0566 14.3929C24.4717 14.9733 23.5283 14.9733 22.9434 14.3929L22.0239 13.4804L21.9851 13.4353C18.7397 9.6593 13.8766 9.65506 10.8228 12.6855C7.72574 15.7589 7.72574 20.737 10.8228 23.8103L24 36.8867L25.9508 34.9508L28.0722 37.0722L25.0566 40.0647C24.4717 40.6451 23.5283 40.6451 22.9434 40.0647L8.70963 25.9398C4.43012 21.693 4.43012 14.8028 8.70963 10.5561ZM41.8547 31.8547C42.5181 31.221 43.0671 30.5964 43.4771 30.069C43.7303 29.7431 43.943 29.4384 44.1007 29.1776C44.1782 29.0494 44.2559 28.9097 44.3196 28.7693L44.3231 28.7616C44.3596 28.6818 44.5 28.3746 44.5 28C44.5 27.6997 44.4118 27.4447 44.3829 27.3612L44.3824 27.3598C44.336 27.2256 44.2775 27.0887 44.2154 26.9574C44.0898 26.6917 43.9165 26.3798 43.7009 26.043C43.269 25.3681 42.6327 24.5392 41.7879 23.7295C40.0972 22.1093 37.4942 20.5 34 20.5C32.8886 20.5 31.8674 20.6628 30.937 20.937L33.5145 23.5145C33.6737 23.5049 33.8355 23.5 34 23.5C36.5058 23.5 38.4028 24.6407 39.7121 25.8955C40.3673 26.5233 40.856 27.1631 41.1741 27.6601C41.2352 27.7556 41.2888 27.8439 41.3351 27.9238C41.2707 28.0144 41.1952 28.1163 41.1084 28.2279C40.7739 28.6583 40.3058 29.1905 39.7327 29.7327L41.8547 31.8547ZM36.0129 32.1342C35.3571 32.3659 34.6812 32.5 34 32.5C32.0511 32.5 30.1463 31.4024 28.6286 30.0629C27.8895 29.4105 27.2939 28.7455 26.8916 28.2279C26.8048 28.1163 26.7293 28.0144 26.6649 27.9238C26.7112 27.8439 26.7648 27.7556 26.8259 27.6601C27.144 27.1631 27.6327 26.5233 28.2879 25.8955C28.5335 25.6601 28.7998 25.4287 29.0869 25.2082L36.0129 32.1342ZM26.9521 23.0734C26.6886 23.2892 26.442 23.5093 26.2121 23.7295C25.3673 24.5392 24.731 25.3681 24.2991 26.043C24.0835 26.3798 23.9102 26.6917 23.7846 26.9574C23.7225 27.0887 23.664 27.2256 23.6176 27.3598L23.6171 27.3612C23.5882 27.4447 23.5 27.6997 23.5 28C23.5 28.3746 23.6404 28.6818 23.6769 28.7616L23.6804 28.7693C23.7441 28.9097 23.8218 29.0494 23.8993 29.1776C24.057 29.4384 24.2697 29.7431 24.5229 30.069C25.0315 30.7233 25.7539 31.527 26.6434 32.3121C28.3831 33.8476 30.9784 35.5 34 35.5C35.5657 35.5 37.0169 35.0564 38.2939 34.4152L40.2323 36.3537C40.6229 36.7442 41.256 36.7442 41.6466 36.3537L42.3537 35.6466C42.7442 35.256 42.7442 34.6229 42.3537 34.2323L27.7679 19.6466C27.3774 19.256 26.7442 19.256 26.3537 19.6466L25.6466 20.3537C25.256 20.7442 25.256 21.3774 25.6466 21.7679L26.9521 23.0734Z"
                  />
                </svg>
              </span>
              <span className="hidden md:block">Liked </span>
            </p>
          </div>



          <div className="grid grid-cols-3 md:grid-cols-5 gap-1 md:justify-start mt-3 ">
            {videosList?.length ? (


              videosList.map((post: Video, idx: number) => {
                return <ProfileVideoCard post={post} key={idx} />;
              })
            ) : (
              <NoResults
                text={`No ${showUserVideos ? "" : "Liked"} Videos Yet `}
                showUserVideos={showUserVideos}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
