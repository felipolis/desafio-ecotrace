import privateClient from '../client/private.client';

const searchEndpoints = {
  search: '/search',
  delete: (id: string) => `/search/${id}`,
}

const searchApi = {
  newSearch: async (
    {
      query,
    } : {
      query: string,
    }
  ) => {
    try {
      const response = await privateClient.post(
        `${searchEndpoints.search}`,
        {
          search: query
        }
      );

      return { response };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  getHistory: async () => {
    try {
      const response = await privateClient.get(
        `${searchEndpoints.search}`
      );

      return { response };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  deleteSearch: async (
    {
      id,
    } : {
      id: string,
    }
  ) => {
    try {
      const response = await privateClient.delete(
        `${searchEndpoints.delete(id)}`
      );

      return { response };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
}

export default searchApi;