import { prisma } from "../database";
import githubApi from "../github/github.api";
import responseHandler from "../handlers/response.handler";
import { Request, Response } from "express";
import {  IUser } from "../types";

interface AuthenticatedRequest extends Request {
  user: IUser;
}

const getHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.user;

    // Busca as pesquisas do usuário
    const searches = await prisma.search.findMany({
      where: {
        ownerId: id,
      },
    });

    return responseHandler.ok(res, searches);
  } catch (error) {
    return responseHandler.error(res);
  }
};

const newSearch = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      search
    } = req.body;

    // Verifica se é um usuario do github válido
    const githubUser = await githubApi.getUser(search);

    // Cria um modelo de busca
    const newSearch = await prisma.search.create({
      data: {
        username: githubUser.login,
        status: true,
        repositories: githubUser.public_repos,
        ownerId: req.user.id
      },
    });

    if (!newSearch) {
      return responseHandler.badrequest(res, "Search not created");
    }

    // Busca os repositórios do usuário
    const repositories = await githubApi.getRepositories(search);

    return responseHandler.created(res, repositories);


  } catch (error) {
    const {
      search
    } = req.body;

    const newSearch = await prisma.search.create({
      data: {
        username: search,
        status: false,
        repositories: 0,
        ownerId: req.user.id
      },
    });

    if (!newSearch) {
      return responseHandler.badrequest(res, "Search not created");
    }

    return responseHandler.notfound(res);
  }
};

const deleteSearch = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Verifica se a pesquisa já existe
    const search = await prisma.search.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!search) {
      return responseHandler.badrequest(res, "Search not found");
    }

    // Deleta a pesquisa
    const deletedSearch = await prisma.search.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedSearch) {
      return responseHandler.badrequest(res, "Search not deleted");
    }

    return responseHandler.ok(res, deletedSearch);
  } catch (error) {
    console.log(error);
    return responseHandler.error(res);
  }
};

export default {
  newSearch,
  deleteSearch,
  getHistory
};