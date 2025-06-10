const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const { User } = require("../models/User");
const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");

const checkJwt = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      return req.headers.authorization.split(" ")[1];
    }
    return null;
  },
});
