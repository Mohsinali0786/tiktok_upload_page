export const allPostsQuery = () => {
  // this means get all stuffs that has a type post and order by the most recent

  const query = `*[_type == "post"] | order(_createdAt desc){
    id,
     caption,
       video{
        asset->{
          id,
          url
        }
      },
      userId,
      postedBy->{
        id,
        userName,
        image
      },
    likes,
    shares,
    follows,
    comments[]{
      comment,
      _key,
      postedBy->{
      id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "post" && id == '${postId}']{
    id,
     caption,
       video{
        asset->{
          id,
          url
        }
      },
      userId,
    postedBy->{
      id,
      userName,
      image
    },
     likes,
     shares,
     follows,
    comments[]{
      comment,
      _key,
      postedBy->{
        _ref,
      id,
    },
    }
  }`;
  return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
    id,
     caption,
       video{
        asset->{
          id,
          url
        }
      },
      userId,
    postedBy->{
      id,
      userName,
      image
    },
    likes,
    shares,
    follows,
    comments[]{
      comment,
      _key,
      postedBy->{
      id,
      userName,
      image
    },
    }
  }`;
  return query;
};

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && id == '${userId}']`;

  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;

  return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    id,
     caption,
       video{
        asset->{
          id,
          url
        }
      },
      userId,
    postedBy->{
      id,
      userName,
      image
    },
    likes,
    shares,
    follows,
    comments[]{
      comment,
      _key,
      postedBy->{
      id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    id,
     caption,
       video{
        asset->{
          id,
          url
        }
      },
      userId,
    postedBy->{
      id,
      userName,
      image
    },
    likes,
    shares,
    follows,
    comments[]{
      comment,
      _key,
      postedBy->{
      id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const topicPostsQuery = (topic: string | string[]) => {
  const query = `*[_type == "post" && topic match '${topic}*'] {
    id,
     caption,
       video{
        asset->{
          id,
          url
        }
      },
      userId,
    postedBy->{
      id,
      userName,
      image
    },
    likes,
    shares,
    follows,
    comments[]{
      comment,
      _key,
      postedBy->{
      id,
      userName,
      image
    },
    }
  }`;

  return query;
};
