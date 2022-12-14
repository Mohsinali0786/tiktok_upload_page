import React, { useState, useEffect } from "react";
import { NextPage } from "next";

import useAuthStore from "../store/authStore";
import { IoArrowRedoOutline } from "react-icons/io5";
import { ShareFile } from "./index";
import { checkNumberValue } from "../utils/numberValidators";

interface IProps {
  handleCount: () => void;
  shares: number;
  getUrl: string;
}

interface IState {
  showShare: boolean;
}

const CountButton: NextPage<IProps> = ({ handleCount, shares, getUrl }) => {
  const [alreadyCount, setAlreadyCount] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const filterCount = shares

  const [showShare, setShowShare] = useState<IState["showShare"]>(false);

  useEffect(() => {
    if (filterCount > 0) {
      setAlreadyCount(true);
    } else {
      setAlreadyCount(false);
    }
  }, [shares, filterCount]);

  const shareButton = () => {
    setShowShare(true);
  };

  return (
    <div className="gap-6">
      <div
        className="mt-4 flex flex-col justify-center items-center cursor-pointer"
        onClickCapture={shareButton}
      >
        {alreadyCount ? (
          <>
            <div className=" rounded-full  text-[#F51997]">
              <IoArrowRedoOutline className="text-4xl font-[900]" />
            </div>
            <p className="text-sm text-white font-[900]">
              {checkNumberValue(shares || 0)}
            </p>
          </>
        ) : (
          <>
            <div className="rounded-full  text-gray-200">
              <IoArrowRedoOutline className="text-4xl font-[900]" />
            </div>
            <p className="text-sm text-gray-200 font-[900]">
              {checkNumberValue(shares || 0)}
            </p>
          </>
        )}
      </div>
      <div
        className="overflow-y-auto overflow-x-hidden fixed top-20 mt-20 right-0 left-0 z-50 md:inset-0 h-modal"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        {showShare && (
          <ShareFile
            setShowShare={setShowShare}
            getUrl={getUrl}
            handleCount={handleCount}
          />
        )}
      </div>
    </div>
  );
};

export default CountButton;
