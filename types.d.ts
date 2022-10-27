//Note we are creating the typescript instances for our fetched data which is videos and users

// export interface Video {
//   caption: string;
//   video: {
//     asset: {
//       _id: string;
//       url: string;
//     };
//   };
//   _id: string;
//   postedBy: {
//     _id: string;
//     userName: string;
//     image: string;
//   };
//   likes: {
//     postedBy: {
//       _id: string;
//       userName: string;
//       image: string;
//     };
//   }[];
//   shares: {
//     postedBy: {
//       _id: string;
//       userName: string;
//       image: string;
//     };
//   }[];
//   comments: {
//     comment: string;
//     _key: string;
//     postedBy: {
//       _ref: string;
//     };
//   }[];
//   userId: string;
// }

export interface Video {
  id: number;
  owner: IUser;
  title: string;
  standard: string;
  thumbnail: string;
  tags: {
    id: number;
    name: string;
  }[];
  hearts: number;
  shares: number;
  bookmarks: number;
  comments: {
    id: number;
    user: IUser;
    message: string;
    created_at: string;
  }[];
}

export interface IUser {
  id: string | number;
  username: string;
  avatar: string;
}

export interface IUserProfile {
  userProfile: {
    image: string;
    userName: string;
    _id: string;
  };
}
