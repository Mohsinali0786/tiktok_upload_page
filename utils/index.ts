import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_BASE_URL = 'https://api.teammato.com'

export const USERS_ROUTE = `api/v1/users/`
export const VIDEOS_ROUTE = `api/v1/videos/`

export const createOrGetUser = async (response: any, addUser: any) => {
  // const decoded: { name: string; picture: string; sub: string } = jwt_decode(
  //   response.credential
  // );

  const decoded: { name: string; imageUrl: string; googleId: string } = response.profileObj

  const { name, imageUrl, googleId } = decoded;

  const user = {
    id: googleId,
    username: name,
    avatar: imageUrl
  };

  addUser(user);

  getAuthToken()
};


export const getAuthToken = async () => {
  let obj = {
    username: 'dev',
    password: 'HcLH8Df9DTz8Gc'
  }

  await axios.post(`https://api.teammato.com/api/v1/auth/login/`, obj, {
    headers: {
      'Host': 'api.teammato.com'
    }
  })
    .then((res) => {
      const { data } = res
      localStorage.setItem('accessToken', data?.access)

      return data?.access
    })
}

export const getAccessToken = async () => {
  let accessToken: any = localStorage.getItem('accessToken')

  if (!accessToken) {
    accessToken = await getAuthToken()
  }

  return accessToken
}