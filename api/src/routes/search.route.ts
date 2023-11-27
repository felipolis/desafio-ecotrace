import express from "express";
import { body } from "express-validator";
import tokenMiddleware from "../middlewares/token.middleware";
import searchController from "../controllers/search.controller";
import requestHandler from "../handlers/request.handler";

const router = express.Router();

router.get(
  "/",
  tokenMiddleware.auth,
  requestHandler.validate,
  searchController.getHistory
);

router.post(
  "/",
  tokenMiddleware.auth,
  body("search")
    .notEmpty().withMessage("Search is required"),
  requestHandler.validate,
  searchController.newSearch
);

router.delete(
  "/:id",
  tokenMiddleware.auth,
  requestHandler.validate,
  searchController.deleteSearch
);


export default router;