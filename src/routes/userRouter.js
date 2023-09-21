import express from "express";
import { comparePassword, hashPassword } from "../helper/bcrypt.js";
import {
  getUserByEmail,
  insertUser,
  updateUser,
  updateUserById,
} from "../model/user/userModel.js";
import {
  loginValidation,
  newUserValidation,
  updateUserValidation,
} from "../middleware/joiValidation.js";

import { v4 as uuidv4 } from "uuid";
import { createAccessJWT, createRefreshJWT } from "../helper/jwt.js";
import { auth, refreshAuth } from "../middleware/authMiddleware.js";
import {
  deleteSession,
  insertNewSession,
} from "../model/session/sessionModel.js";
// import { otpGenerator } from "../helper/randomGenerator.js";

const router = express.Router();

// get user details
router.get("/", auth, (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "here is the user info",
      user: req.userInfo,
    });
    console.log(req.userInfo);
  } catch (error) {
    next(error);
  }
});

// create new user api
router.post("/", newUserValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    const { password } = req.body;

    req.body.password = hashPassword(password);

    //TODO create code and add with req.body
    req.body.verificationCode = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    const result = await insertUser(req.body);

    if (result?._id) {
      res.json({
        status: "success",
        message: "Registered",
      });

      return;
    }

    res.json({
      status: "error",
      message: "Unable to register now, Please try again later",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.statusCode = 400;
      error.message =
        "This email is already used by another User, Use different email or reset your password";
    }

    next(error);
  }
});
router.get("/get/access_jwt", refreshAuth);

router.post("/sign-in", loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //find the user by email

    const user = await getUserByEmail(email);
    if (user?._id) {
      //check the password
      const isMatched = comparePassword(password, user.password);

      if (isMatched) {
        //create 2 jwts:

        const accessJWT = await createAccessJWT(email);
        const refreshJWT = await createRefreshJWT(email);

        //// create accessJWT and store in session table: short live 15m
        //// create refreshJWT and store with user data in user table: long live 30d

        return res.json({
          status: "success",
          message: "LoggedIn",
          token: { accessJWT, refreshJWT },
        });
      }
    }

    // return the jwts
    res.json({
      status: "error",
      message: "Invalid login details",
    });
  } catch (error) {
    next(error);
  }
});

// return the refreshJWT
router.get("/get-accessjwt", refreshAuth);

//logout
router.post("/logout", async (req, res, next) => {
  try {
    const { accessJWT, refreshJWT, _id } = req.body;

    accessJWT && deleteSession(accessJWT);

    if (refreshJWT && _id) {
      const dt = await updateUserById({ _id, refreshJWT: "" });
    }

    res.json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
});
// router.post("/request-otp", async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     if (email) {
//       const user = await getUserByEmail(email);
//       if (user?._id) {
//         const otp = otpGenerator();
//         const obj = {
//           token: otp,
//           associate: email,
//         };
//         const result = await insertNewSession(obj);
//         if (result?._id) {
//           await sendOTPNotification({
//             otp,
//             email,
//             fName: user.fName,
//           });
//         }
//       }
//     }
//     res.json({
//       status: "success",
//       message:
//         "If your email exit you will receive email into your mailbox,please check your email for the instruction and otp",
//     });
//   } catch (error) {
//     next(error);
//   }
// });
router.put("/update", auth, updateUserValidation, async (req, res, next) => {
  try {
    const { _id, password, ...rest } = req.body;

    const result = await updateUser(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "The user  has been updated successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to update user, try again later",
        });
  } catch (error) {
    next(error);
  }
});
router.put(
  "/update/fav",
  auth,

  async (req, res, next) => {
    try {
      const { _id, favourite, ...rest } = req.body;

      const result = await updateUserById(req.body);
      result?._id
        ? res.json({
            status: "success",
            message: "Favourite has been updated successfully",
          })
        : res.json({
            status: "error",
            message: "Unable to update favourite, try again later",
          });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
