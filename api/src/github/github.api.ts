import axiosClient from "../axios/axios.client";
import githubEndpoints from "./github.endpoints";

const githubApi = {
  getUser: async (username: string) => await axiosClient.get(
    githubEndpoints.getUser(username)
  ),
  getRepositories: async (username: string) => await axiosClient.get(
    githubEndpoints.getRepositories(username)
  )
};


export default githubApi;