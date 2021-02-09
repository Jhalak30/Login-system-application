import express from "express";
import { signIn, signOut, signUp, forgotPass } from "../controller/auth.js";
import {
  validateSignUpRequest,
  validateSignInRequest,
  isRequestValidated,
} from "../validator/auth.js";

const router = express.Router();

router.post("/signUp", validateSignUpRequest, isRequestValidated, signUp);
router.post("/signIn", validateSignInRequest, isRequestValidated, signIn);
router.post("/signOut", signOut);
router.post(
  "/forgotPass",
  validateSignInRequest,
  isRequestValidated,
  forgotPass
);
export default router;
