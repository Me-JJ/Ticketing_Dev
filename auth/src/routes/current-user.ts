import express from "express";
import { currentUser } from "@path_to_10e7/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
