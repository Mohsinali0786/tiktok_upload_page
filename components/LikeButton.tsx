import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import { NextPage } from "next";
import { checkNumberValue } from "../utils/numberValidators";

import useAuthStore from "../store/authStore";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any;
}

const LikeButton: NextPage<IProps> = ({ handleLike, handleDislike, likes }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const filterLikes = likes

  useEffect(() => {
    if (filterLikes > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2  text-[#F51997]"
            onClick={handleDislike}
          >
            <MdFavorite className="sm:text-md text-2xl font-semibold" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2  text-gray-900"
            onClick={handleLike}
          >
            <MdFavorite className="sm:text-md text-2xl font-semibold" />
          </div>
        )}
        <p
          className={`text-lg text-gray-900 font-semibold ${
            likes >= 10 ? "pl-0" : "pl-1"
          }`}
        >
          {checkNumberValue(likes || 0)}
        </p>
      </div>
    </div>
  );
};

export default LikeButton;
