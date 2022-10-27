import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Switch } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import { MdDelete } from "react-icons/md";
import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";
import useAuthStore from "../store/authStore";
// import { client } from "../utils/client";
import { topics } from "../utils/constants";
import { API_BASE_URL, VIDEOS_ROUTE, getAccessToken } from "../utils";
import { MainFooter } from "../components";

const Upload = () => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  //functions like the useHistory or useNavigate in react
  const router = useRouter();

  //Uploading video before posting
  const uploadVideo = (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setIsLoading(true);

      // client.assets
      //   .upload("file", selectedFile, {
      //     contentType: selectedFile.type,
      //     filename: selectedFile.name,
      //   })
      //   .then((data) => {
      //     setVideoAsset(data);
      //     setIsLoading(false);
      //   });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  //Post all files
  const handlePost = async () => {
    if (caption && videoAsset?.id && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?.id,
          },
        },
        userId: userProfile?.id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?.id,
        },
        topic: category,
      };

      let accessToken: any = await getAccessToken()

      await axios.post(`${API_BASE_URL}/${VIDEOS_ROUTE}`, document, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      router.push("/");
    }
  };

  const handleDiscard = () => {
    setSavingPost(false);
    setVideoAsset(undefined);
    setCaption("");
    setCategory("");
  };

  const handleCaption = (e: any) => {
    let value = e.target.value;

    if (value.startsWith("#")) {
      setCaption(value);
    } else {
      let newValue = `#${value}`;
      setCaption(newValue);
    }
  };

  return (
    // <>
    <div className=" flex w-full  md:absolute left-0 top-0 md:top-[60px] mb-10 sm:pt-2 bg-[#F8F8F8] justify-center">
      <div className=" pr-2 pl-3 mb-4 sm:pl-6 pt-4 lg:pl-12 bg-white rounded-lg h-full  w-5/6 ">
        <div className="">
          <p className="text-2xl font-bold mb-0">Upload Video</p>
          <p className="text-lg text-gray-400 mt-1">
            Post a video to your account
          </p>
        </div>
        <div className="flex flex-wrap justify-center  sm:flex-nowrap sm:justify-left">
          {/* justify-between flex gap-3 flex-wrap justify-center items-center p-14 pt-2 md:pt-6 */}
          <div className="basis-1/4">
            <div className="border-dashed rounded-xl border-4 
                    border-gray-200 flex flex-col justify-center 
                      items-center outline-none mt-10 w-[260px] lg:h-[472px] h-[472px]
                      p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100"
            >
              {isLoading ? (
                <p className="text-center lg:text-2xl text-lg text-gray-400 font-semibold">
                  Uploading...
                </p>
              ) : (
                <div>
                  {videoAsset ? (
                    <div>
                      <video
                        src={videoAsset.url}
                        loop
                        controls
                        className="rounded-xl h-[300px] mt-3  bg-black"
                      />
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-bold text-3xl mt-2">
                            <FaCloudUploadAlt className="text-gray-300 text-5xl" />
                          </p>
                          <p className="text-lg font-semibold mb-0">Upload video</p>
                          <p className="mb-5">or drag and drop a file</p>
                        </div>
                        <p className="text-gray-400 text-center  text-sm ">
                          MP4 or WebM or ogg</p>
                        <p>720x1280 or higher</p>
                        <p>Up to 10 minutes</p>
                        <p>Less than 2GB</p>
                        <p className="bg-[#FE2C55] text-center lg:mt-6 mt-10 lg:mb-2 rounded text-white text-md font-medium p-2 w-52 outline-none">
                          Select file
                        </p>
                        <input
                          type="file"
                          name="upload video"
                          className="w-0 h-0"
                          onChange={uploadVideo}
                        />
                      </div>
                    </label>
                  )}
                </div>
              )}
              {wrongFileType && (
                <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px] mb-5 h-auto">
                  Please select a video file
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-10 py-4 font-medium ml-4 md:ml-10 basis-2/3">
            <label className='mb-0 text-base'>Caption <span className="text-sm text-slate-300 relative  sm:left-1/2 md:left-2/3 lg:left-3/4 ">0/150</span></label>
            <div className="flex">
              <input
                type="text"
                value={caption}
                onChange={handleCaption}
                className="rounded outline-none text-md border-2 border-gray-200 p-2 w-11/12"
              />
              <span className="relative top-2 right-12">
                <span className="text-[black]  font-bold text-xl ">@</span >
                <span className="text-[black] font-bold text-xl ml-2">#</span>
              </span>
            </div>
            <label className="text-base">Cover</label>
            <textarea id="w3review" name="w3review" rows={4} cols={50}
              className="rounded outline-none text-md border-2 border-gray-200 p-2 mb-2 w-11/12"
            >
            </textarea>
            <label className="text-base">Who can view this video</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-11/12  mb-3 md:w-3/5 outline-none bg border-2 border-gray-200 text-md capitalize p-2 rounded cursor-pointer "
            >
              <option className="outline-none capitalize  bg-white text-gray-700 text-md p-2 hover:bg-slate-300 ">
                Select Category
              </option>
              {topics.map((topic, index) => (
                <option
                  key={index}
                  value={topic.name}
                  className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300 "
                >
                  {topic.name}
                </option>
              ))}
            </select>
            <label className="text-base">Allow User to:</label>
            <div>
              <input type="checkbox" name="service" value="Comment" checked className="accent-[#FE2C55]" />
              <span className="ml-2 ">Comment</span>
              <input className="ml-4 accent-[#FE2C55]" type="checkbox" name="service" value="Duet" checked />
              <span className="ml-2">Duet</span>
              <input className="ml-4 accent-[#FE2C55]" type="checkbox" name="service" value="Stitch" checked />
              <span className="ml-2">Stitch</span>
            </div>
            <div className="mt-4 shadow-black ">
              <p className="text-base">Run a Copyright check <span className="ml-2"><Switch defaultChecked /></span></p>
              <div>
                <p>We'll check your videos for potential copyright infringments on used sound.If
                  infringment are found yoou can edit videos before posting
                  <a className="ml-2">Learn more</a>
                </p>
              </div>
              <div className="flex gap-6">
                <button
                  onClick={handleDiscard}
                  type="button"
                  className="border-gray-300 hover:bg-[#222] hover:border-0 hover:text-gray-100 border-2 text-md capitalize font-medium p-2 rounded w-28 lg:w-44 outline-none"
                >
                  discard
                </button>
                <button
                  onClick={handlePost}
                  type="button"
                  className=" border-gray-300 border-2 hover:border-0 hover:bg-[#FE2C55] hover:text-gray-100  text-md capitalize font-medium p-2 rounded w-28 lg:w-44 outline-none"
                >
                  {savingPost ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </>
  );
};

export default Upload;
