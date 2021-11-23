const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

//ROUTES

// GET  /signup form
router.get("/signup-jobseeker", (req, res) => {
  res.render("auth/signup-form-js");
});

router.get("/signup-employer", (req, res) => {
  res.render("auth/signup-form");
});
//POST /signup

router.post("/signup-jobseeker", (req, res) => {
  const {
    accountType,
    username,
    password,
    email,
    firstName,
    lastName,
    location,
    addPicture,
    addResume,
  } = req.body;

  const accountTypeNotProvided = !accountType || accountType === "";
  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";
  const emailNotProvided = !email || email === "";
  const firstNameNotProvided = !firstName || firstName === "";
  const lastNameNotProvided = !lastName || lastName === "";
  const locationNotProvided = !location || location === "";

  if (
    accountTypeNotProvided ||
    usernameNotProvided ||
    passwordNotProvided ||
    emailNotProvided ||
    firstNameNotProvided ||
    lastNameNotProvided ||
    locationNotProvided
  ) {
    res.render("auth/signup-form-js", {
      errorMessage: "Please provide required information",
    });
    return;
  }

  User.findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        throw new Error("The username is taken");
      }

      return bcrypt.genSalt(saltRounds);
    })
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hashedPassword) => {
      return User.create({
        accountType: accountType,
        username: username,
        password: hashedPassword,
        email: email,
        firstName: firstName,
        lastName: lastName,
        location: location,
        addPicture: addPicture,
        addResume: addResume,
      });
    })
    .then((createdUser) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("auth/signup-form", {
        errorMessage: err.message || "Error while trying to sign up",
      });
    });
});

router.post("/signup-employer", (req, res) => {
  const {
    accountType,
    username,
    password,
    email,
    firstName,
    lastName,
    companyName,
    location,
    addPicture,
    addResume,
  } = req.body;

  const accountTypeNotProvided = !accountType || accountType === "";
  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";
  const emailNotProvided = !email || email === "";
  const firstNameNotProvided = !firstName || firstName === "";
  const companyNameNotProvided = !companyName || companyName === "";
  const lastNameNotProvided = !lastName || lastName === "";
  const locationNotProvided = !location || location === "";

  if (
    accountTypeNotProvided ||
    usernameNotProvided ||
    passwordNotProvided ||
    companyNameNotProvided ||
    emailNotProvided ||
    firstNameNotProvided ||
    lastNameNotProvided ||
    locationNotProvided
  ) {
    res.render("auth/signup-form", {
      errorMessage: "Please provide required information",
    });
    return;
  }

  User.findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        throw new Error("The username is taken");
      }

      return bcrypt.genSalt(saltRounds);
    })
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hashedPassword) => {
      return User.create({
        accountType: accountType,
        username: username,
        password: hashedPassword,
        email: email,
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        location: location,
        addPicture: addPicture,
      });
    })
    .then((createdUser) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("auth/signup-form", {
        errorMessage: err.message || "Error while trying to sign up",
      });
    });
});

router.get("/login", (req, res) => {
  res.render("auth/login-form");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";

  if (usernameNotProvided || passwordNotProvided) {
    res.render("auth/login-form", {
      errorMessage: "Please provide username and/or password",
    });
    return;
  }
  let user;
  User.findOne({ username: username })
    .then((foundUser) => {
      if (!foundUser) {
        throw new Error("Wrong credentials");
      }
      return bcrypt.compare(password, foundUser.password);
    })
    .then((passwordCorrect) => {
      if (!correctPassword) {
        throw new Error("Wrong credentials");
      } else if (passwordCorrect) {
        req.session.user = user;
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.render("auth/login-form", {
        errorMessage: err.message || "Provide username and password.",
      });
    });
});

module.exports = router;
