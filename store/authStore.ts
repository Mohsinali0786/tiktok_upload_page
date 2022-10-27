import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { API_BASE_URL, USERS_ROUTE, VIDEOS_ROUTE } from "../utils";

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],
  videos: [],

  //Note user is coming from utils/index.ts folder that was created

  //User is added and stored. It works like localStorage
  addUser: (user: any) => set({ userProfile: user }),

  //To remove user
  removeUser: () => set({ userProfile: null }),

  fetchAllVideos: async () => {
    const response = await axios.get(`${API_BASE_URL}/${VIDEOS_ROUTE}`)

    const d = response?.data

    set({ videos: [...(Array.isArray(d.results) ? d.results : [])] })
  },

  //To fetch all Users
  fetchAllUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/${USERS_ROUTE}`)

    set({ allUsers: Array.isArray(response.data) ? response.data : [] });
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
