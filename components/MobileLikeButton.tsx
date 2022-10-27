import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import { NextPage } from "next";
import { checkNumberValue } from "../utils/numberValidators";

import useAuthStore from "../store/authStore";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: number;
}

const MobileLikeButton: NextPage<IProps> = ({
  handleLike,
  handleDislike,
  likes,
}) => {
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
          <>
            <div
              className="rounded-full text-[#F51997]"
              onClick={handleDislike}
            >
              <MdFavorite className="text-4xl font-[900]" />
            </div>
            <p className={`text-sm text-white font-[900] pl-0`}>
              {checkNumberValue(likes || 0)}
            </p>
          </>
        ) : (
          <>
            <div className="rounded-full text-gray-200" onClick={handleLike}>
              <MdFavorite className="text-4xl font-[900]" />
            </div>
            <p className={`text-sm text-gray-200 font-[900] pl-0`}>
              {checkNumberValue(likes || 0)}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileLikeButton;
