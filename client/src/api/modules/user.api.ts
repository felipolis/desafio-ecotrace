import privateClient from '../client/private.client';
import publicClient from '../client/public.client';

const userEndpoints = {
	signin: '/user/signin',
	signup: '/user/signup',
	getInfo: '/user/info',
  getUser: ({ username }: { username: string }) => (`/user/github/${username}`),
  updateInfo: '/user/info',
}
const userApi = {
  signin: async (
    {
      email,
      password,
    } : {
      email: string,
      password: string,
    }
  ) => {
    try {
      const response = await publicClient.post(
        userEndpoints.signin,
        {
          email,
          password,
        }
      );

      return { response };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },


  signup: async (
    {
      email,
      password,
      username,
    } : {
      email: string,
      password: string,
      username: string,
    }
  ) => {
    try {
      const response = await publicClient.post(
        userEndpoints.signup,
        {
          email,
          password,
          username,
        }
      );

      return { response };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },

  getInfo: async () => {
    try {
      const response = await privateClient.get(
        userEndpoints.getInfo
      );

      return { response };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },

  getUser: async (
    {
      username,
    } : {
      username: string,
    }
  ) => {
    try {
      const response = await privateClient.get(
        userEndpoints.getUser({ username })
      );
      return { response };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },

  updateInfo: async (
    {
      email,
      password,
      username,
    } : {
      email?: string,
      password?: string,
      username?: string,
    }
  ) => {
    try {
      const response = await privateClient.put(
        userEndpoints.updateInfo,
        {
          email,
          password,
          username,
        }
      );

      return { response };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
};

export default userApi;