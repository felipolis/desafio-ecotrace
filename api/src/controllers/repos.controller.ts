import githubApi from "../github/github.api";
import responseHandler from "../handlers/response.handler";
import { Request, Response } from "express";

const getRepositories = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    const repositories = await githubApi.getRepositories(username);
    if (!repositories) {
      return responseHandler.notfound(res);
    }

    responseHandler.created(res, repositories);
  } catch (error) {
    console.log(error);
    responseHandler.error(res);
  }
};

export default { getRepositories };
