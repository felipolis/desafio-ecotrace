import jsonwebtoken from "jsonwebtoken";
import { prisma } from "../database";
import githubApi from "../github/github.api";
import responseHandler from "../handlers/response.handler";
import { Request, Response } from "express";
import { IUpdateInfo, IUser } from "../types";
import { setPassword, validPassword } from "../utils";

interface AuthenticatedRequest extends Request {
  user: IUser;
}

const signup = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      username,
    } = req.body;

    // Verifica se é um usuario do github válido
    const githubUser = await githubApi.getUser(username);

    if (!githubUser.id) {
      return responseHandler.badrequest(res, "Invalid github username");
    }

    // Verifica se o usuário já existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      return responseHandler.badrequest(res, "User already exists");
    }

    // Define a senha
    const { salt, hash } = setPassword(password);

    // Cria o usuário
    const user = await prisma.user.create({
      data: {
        name: githubUser.name,
        username: githubUser.login,
        avatarUrl: githubUser.avatar_url,
        following: githubUser.following,
        followers: githubUser.followers,
        bio: githubUser.bio,
        twitter: githubUser.twitter_username,
        companyName: githubUser.company,
        site: githubUser.blog,
        repositories: githubUser.public_repos,
        email,
        password: hash,
        salt,
      },
    });

    if (!user) {
      return responseHandler.badrequest(res, "User not created");
    }

    // remove a senha e o salt do usuário
    delete user.password;
    delete user.salt;

    // Gera o token
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Retorna o usuário
    responseHandler.created(res, {
      token,
      ...user,
      id: user.id
    });

  } catch (error) {
    console.log(error);
    responseHandler.error(res);
  }

};

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return responseHandler.badrequest(res, "User not found");
    }

    // Verifica se a senha está correta
    if (!validPassword(password, user.password, user.salt)) {
      return responseHandler.badrequest(res, "Wrong password");
    }

    // remove a senha e o salt do usuário
    delete user.password;
    delete user.salt;

    // Gera o token
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Retorna o usuário
    responseHandler.created(res, {
      token,
      ...user,
      id: user.id
    });

  } catch (error) {
    console.log(error);
    responseHandler.error(res);
  }
};


const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const id = Number(req.user.id);

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
    });

    if (!user) {
      return responseHandler.badrequest(res, "User not found");
    }

    // remove a senha e o salt do usuário
    delete user.password;
    delete user.salt;

    // Retorna o usuário
    responseHandler.created(res, user);
  } catch (error) {
    console.log(error);
    responseHandler.error(res);
  }
};

const getUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const username = req.params.username;

    // Verifica se é um usuario do github válido
    const githubUser = await githubApi.getUser(username);

    if (!githubUser.id) {
      return responseHandler.badrequest(res, "Invalid github username");
    }

    // Retorna o usuário
    responseHandler.created(res, githubUser);
  } catch (error) {
    console.log(error);
    responseHandler.notfound(res);
  }
};

const updateInfo = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const id = Number(req.user.id);
    const updateData: IUpdateInfo = req.body;

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
    });

    if (!user) {
      return responseHandler.badrequest(res, "User not found");
    }

    // verifica se alterou o usuario e busque a foto para atualizar
    if (updateData.username) {
      // Verifica se é um usuario do github válido
      const githubUser = await githubApi.getUser(updateData.username);

      if (!githubUser.id) {
        return responseHandler.badrequest(res, "Invalid github username");
      }

      updateData.avatarUrl = githubUser.avatar_url;
    }

    // Verifica se alterou a senha para atualizar
    if (updateData.password) {
      // Define a senha
      const { salt, hash } = setPassword(updateData.password);

      updateData.password = hash;
      updateData.salt = salt;
    }

    // Atualiza o usuário
    const updatedUser = await prisma.user.update({
      where: {
        id: id
      },
      data: updateData
    });

    if (!updatedUser) {
      return responseHandler.badrequest(res, "User not updated");
    }

    // remove a senha e o salt do usuário
    delete updatedUser.password;
    delete updatedUser.salt;

    // Retorna o usuário
    responseHandler.created(res, updatedUser);

  } catch (error) {
    console.log(error);
    responseHandler.error(res);
  }
};


export default {
  signup,
  signin,
  getCurrentUser,
  getUser,
  updateInfo
};