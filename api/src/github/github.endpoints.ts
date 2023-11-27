import githubConfig from "./github.config";

const githubEndpoints = {
  getUser: (username: string) => githubConfig.getUrl(
    `/users/${username}`
  ),
  getRepositories: (username: string) => githubConfig.getUrl(
    `/users/${username}/repos`
  )
};

export default githubEndpoints;