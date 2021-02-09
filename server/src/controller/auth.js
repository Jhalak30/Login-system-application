import bcrypt from "bcrypt";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const signUp = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec(async (error, user) => {
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      userName: Math.random().toString(),
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong. Please call Administrator!",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "User created successfully !!",
        });
      }
    });
  });
};

export const signIn = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        const { _id, firstName, lastName, email, fullName } = user;
        res.cookie("token", token, { expiresIn: "1h" });
        return res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong. Please contact Administrator",
      });
    }
  });
};

export const signOut = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "SignOut successfully !!",
  });
};

export const forgotPass = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }

    if (user) {
      const { _id, firstName, lastName, email, userName } = user;
      const hash_password = await bcrypt.hash(req.body.password, 10);
      const updatedUser = {
        _id,
        firstName,
        lastName,
        email,
        hash_password,
        userName,
      };
      await User.findByIdAndUpdate(_id, updatedUser, { new: true });
      return res.status(200).json(updatedUser);
    }
  });
};
