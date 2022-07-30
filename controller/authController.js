const {
  signUpBodyValidation,
  logInBodyValidation,
  refreshTokenBodyValidation,
} = require("./../validation/requestValidation");
const { generateTokens } = require("../helpers/generateToken");
const { verifyRefreshToken } = require("../helpers/verifyRefreshToken");
const User = require("./../models/User");
const UserToken = require("../models/UserToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup
const signUp = async (req, res) => {
  try {
    const { error } = signUpBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: true, message: "Email already exist" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();
    return res
      .status(201)
      .json({ error: false, message: "Account created sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// login
const login = async (req, res) => {
  try {
    const { error } = logInBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });
    }

    const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifiedPassword) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
      message: "Logged in sucessfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// verify refresh token and generate new access token
const getNewAcessToken = (req, res) => {
  const { error } = refreshTokenBodyValidation(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: true, message: error.details[0].message });
  }

  verifyRefreshToken(req.body.refreshToken)
    .then(({ tokenDetails }) => {
      const payload = { _id: tokenDetails._id, email: tokenDetails.email };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_LIFE }
      );
      res.status(200).json({
        error: false,
        accessToken,
        message: "Access token created successfully",
      });
    })
    .catch((err) => res.status(400).json(err));
};

// revoke token OR logout
const logout = async (req, res) => {
  try {
    const { error } = refreshTokenBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const userToken = await UserToken.findOne({ token: req.body.refreshToken });
    if (!userToken) {
      return res
        .status(200)
        .json({ error: false, message: "Logged Out Sucessfully" });
    }

    await userToken.remove();
    res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = {
  signUp,
  login,
  getNewAcessToken,
  logout,
};
