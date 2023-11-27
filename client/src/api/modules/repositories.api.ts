import privateClient from '../client/private.client';

const repositoriesEndpoints = {
  getRespositories: ({ username }: { username: string }) => (`/repos/${username}`),
};


const repositoriesApi = {
  getRepositories: async (
    {
      username,
    } : {
      username: string,
    }
  ) => {
    try {
      const response = await privateClient.get(
        repositoriesEndpoints.getRespositories({ username }),
      );
      console.log(response);
      return { response };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
};


export default repositoriesApi;