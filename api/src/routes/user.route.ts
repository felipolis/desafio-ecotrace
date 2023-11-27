import express from "express";
import { body } from "express-validator";
import userController from "../controllers/user.controller";
import tokenMiddleware from "../middlewares/token.middleware";
import requestHandler from "../handlers/request.handler";
import { prisma } from "../database";
import githubApi from "../github/github.api";

const router = express.Router();

router.post(
  "/signup",
  body("email")
    .isEmail().withMessage("Invalid email")
    .notEmpty().withMessage("Email is required")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          email: value,
        },
      });

      if (user) {
        return Promise.reject("User already exists");
      }
    }),

  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .notEmpty().withMessage("Password is required"),

  body("username")
    .notEmpty().withMessage("Github username is required")
    .custom(async (value) => {
      const githubUser = await githubApi.getUser(value);

      if (!githubUser.id) {
        return Promise.reject("Invalid github username");
      }
    }),

  requestHandler.validate,
  userController.signup

);

router.post(
  "/signin",
  body("email")
    .isEmail().withMessage("Invalid email")
    .notEmpty().withMessage("Email is required"),

  body("password")
    .notEmpty().withMessage("Password is required"),

  requestHandler.validate,
  userController.signin
);

router.get(
  "/info",
  tokenMiddleware.auth,
  userController.getCurrentUser
);

router.get(
  "/github/:username",
  tokenMiddleware.auth,
  userController.getUser
);


router.put(
  "/info",
  tokenMiddleware.auth,
  body("email")
    .optional()
    .isEmail().withMessage("Invalid email")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          email: value,
        },
      });

      if (user) {
        return Promise.reject("Email already exists");
      }
    }),

  body("password")
    .optional()
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),

  body("username")
    .optional()
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          username: value,
        },
      });
      if (user) {
        return Promise.reject("Username already exists");
      }
    }),

  requestHandler.validate,
  userController.updateInfo
);





export default router;