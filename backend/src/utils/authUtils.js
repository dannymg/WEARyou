import { constants } from "../config/constants.js";
import moment from "moment";
import jwt from "jwt-simple";
import crypto from "crypto";
import compose from "composable-middleware";
import { User } from "../models/userModel.js";

export const createNewJwt = (user) => {
  const payload = {
    sub: user.username,
    iat: moment().unix(),
    // token expiration time
    exp: moment().add(15, "days").unix(),
  };

  const tokenSecret = constants.JWT_SECRET;
  return jwt.encode(payload, tokenSecret);
};

export const hashPassword = (password, salt) => {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("base64");
};

export const isCorrectPassword = (loginPassword, userEntity) => {
  let loginPasswordHashed;
  if (loginPassword) {
    const salt = userEntity.salt;
    loginPasswordHashed = hashPassword(loginPassword, salt);
  }
  return userEntity.password === loginPasswordHashed;
};

export const generateARandomSalt = () => {
  return crypto.randomBytes(16).toString("base64");
};

export const ensureIsAuthenticated = async (req, res, next) => {
  //get token from client
  var token = req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({
      message: "Access denied. No token provided.",
    });
  }

  try {
    //Decode token
    var payload = jwt.decode(token, constants.JWT_SECRET);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: "Access denied. The token has expired.",
      });
    }

    const user = await User.findOne({
      where: {
        username: payload.sub,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "The user doesn't exist" });
    }
    // add user with role to request
    req.user = user;
    next();
  } catch (e) {
    return res.status(500).send({
      message: "Invalid token.",
    });
  }
};

export const hasRole = (accessRoles = []) => {
  if (!accessRoles.length) {
    throw new Error("Role needs to be provided");
  }

  const availableRoles = [constants.ROLES.ADMIN, constants.ROLES.CLIENT];
  return compose()
    .use(ensureIsAuthenticated)
    .use((req, res, next) => {
      // get user role from request
      const userInfo = req.user || {};
      const userRole = userInfo.role;
      // check if user has role
      const roleIsAvailable = availableRoles.indexOf(userRole) >= 0;
      const hasCorrectAccessRole = accessRoles.indexOf(userRole) >= 0;
      if (roleIsAvailable && hasCorrectAccessRole) {
        // if user has the required role, continue with the request
        return next();
      } else {
        // otherwise return a 401 response
        return res.status(401).send({
          message: "Access denied. You do not have the required role.",
        });
      }
    });
};

export const cleanUser = (user) => {
  return {
    username: user.username,
    name: user.name,
    last_name: user.last_name,
    birth_date: user.birth_date,
    phone: user.phone,
    direction: user.direction,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const createAdminUserIfNotExists = async () => {
  const adminUser = await User.findOne({
    where: {
      username: constants.ADMIN.USERNAME,
    },
  });
  if (!adminUser) {
    const salt = generateARandomSalt();
    const password = constants.ADMIN.PASSWORD;
    const passwordHashed = hashPassword(password, salt);
    const user = new User({
      username: constants.ADMIN.USERNAME,
      name: constants.ADMIN.NAME,
      last_name: constants.ADMIN.LAST_NAME,
      birth_date: constants.ADMIN.BIRTH_DATE,
      phone: constants.ADMIN.PHONE,
      direction: constants.ADMIN.DIRECTION,
      email: constants.ADMIN.EMAIL,
      role: constants.ROLES.ADMIN,
      salt: salt,
      password: passwordHashed,
    });
    await user.save();
    console.log("Admin user created");
    return;
  }
  console.log("Admin user already exists");
};
