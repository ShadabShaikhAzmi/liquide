const { Router } = require("express");
const {
  signUp,
  login,
  logout,
  getNewAcessToken,
} = require("./../controller/authController");

const authRoutes = Router();

authRoutes.post("/sign-up", signUp);
authRoutes.post("/login", login);
authRoutes.delete("/logout", logout);
authRoutes.post("/request-new-access-token", getNewAcessToken);

module.exports = {
  authRoutes,
};
