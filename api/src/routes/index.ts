import express from "express";
import userRoute from "./user.route";
import reposRoute from "./repos.route";
import searchRoute from "./search.route";

const router = express.Router();

router.use("/user", userRoute);
router.use("/repos", reposRoute);
router.use("/search", searchRoute);




export default router;