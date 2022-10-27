import { BsCode, BsEmojiSunglasses } from "react-icons/bs";
import { GiCakeSlice, GiGalaxy, GiLipstick } from "react-icons/gi";
import { MdCastForEducation } from "react-icons/md";
import dummyImage from '../assets/user.png'

import { FaBan, FaCode,FaFlag,FaLink, FaRegEnvelope } from "react-icons/fa";

import {
  FaPaw,
  FaMedal,
  FaGamepad,
  FaMusic,
  FaCreativeCommonsNcEu,
} from "react-icons/fa";


export const topics = [
  {
    name: "coding",
    icon: <BsCode />,
  },
  {
    name: "Trading",
    icon: <FaCreativeCommonsNcEu />,
  },
  {
    name: "Education",
    icon: <MdCastForEducation />,
  },
  {
    name: "comedy",
    icon: <BsEmojiSunglasses />,
  },
  {
    name: "gaming",
    icon: <FaGamepad />,
  },
  {
    name: "food",
    icon: <GiCakeSlice />,
  },
  {
    name: "dance",
    icon: <GiGalaxy />,
  },
  {
    name: "Music Video",
    icon: <FaMusic />,
  },
  {
    name: "beauty",
    icon: <GiLipstick />,
  },
  {
    name: "animals",
    icon: <FaPaw />,
  },
  {
    name: "sports",
    icon: <FaMedal />,
  },
];

export const profileShareItems = [
  {
    name: "Embed",
    icon: <FaCode />,
  },
  {
    name: "Copy Link",
    icon: <FaLink />,
  },

]

export const profileOptions = [
  {
    name: "Send message",
    icon: <FaRegEnvelope />,
  },
  {
    name: "Report",
    icon: <FaFlag />,
  },
  {
    name: "Block",
    icon: <FaBan />,
  },

]

export const footerList1 = [
  "About",
  "Newsroom",
  "Store",
  "Contact",
  "Carrers",
  "ByteDance",
  "Creator Directory",
];
export const footerList2 = [
  "TikTik for Good",
  "Advertise",
  "Developers",
  "Transparency",
  "TikTik Rewards",
];
export const footerList3 = [
  "Help",
  "Safety",
  "Terms",
  "Privacy",
  "Creator Portal",
  "Community Guidelines",
];

export const userImage = dummyImage

export const dummyUrl = 'https://cdn.sweetflick.com/media/videos/Bailey_passed_her_service_test_so_we_took_her_to_pick_out_her_own_build_a_bear_OC.mp4'