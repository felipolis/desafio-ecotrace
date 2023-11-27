const baseUrl = "https://api.github.com"

const getUrl = (endpoint: string) => {

  return `${baseUrl}${endpoint}`;
};

export default { getUrl };