import React from "react";
import Link from "next/link";
import {
    FaHashtag
} from "react-icons/fa";
const DiscoverTrending = () => {


    //data for hashtags (for now)
    const trending = [
        {
            name: "latenightsnack"
        },
        {
            name: "gamerscheck"
        },
        {
            name: "notthatmuch"
        },
        {
            name: "gamerscheckgamerscheck"
        },
        {
            name: "latenightsnack"
        }
    ]
        ;

    //We added this particular style to it. 

    const topicStyle =
        "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-1 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

    return (
        <div className="border-b-2 md:border-b-0 xl:border-b-2 pb-6">
            <p className="text-gray-500 font-semibold m-3 mt-4 sm:block md:hidden xl:block">
                Discover
            </p>
            <div className="flex gap-3 flex-wrap">
                {trending.map((item) => {
                    return (
                        <Link href={`/tag/${item.name}`} key={item.name}>
                            <a>
                                <div
                                    className={topicStyle}
                                >
                                    <span className="font-normal text-sm xl-text-md">
                                        <FaHashtag />
                                    </span>
                                    <span className="font-normal text-xs sm:block md:hidden xl:block capitalize">
                                        {item.name}
                                    </span>
                                </div>
                            </a>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default DiscoverTrending;
