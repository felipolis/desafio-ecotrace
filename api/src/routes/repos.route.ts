import express from "express";
import reposController from "../controllers/repos.controller";
import tokenMiddleware from "../middlewares/token.middleware";
import requestHandler from "../handlers/request.handler";

const router = express.Router();

router.get(
  "/:username",
  tokenMiddleware.auth,
  requestHandler.validate,
  reposController.getRepositories
);





export default router;