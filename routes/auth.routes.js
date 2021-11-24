const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const fileUploader = require('../config/cloudinary.config')

const isLoggedIn = require("./../middleware/isLoggedIn");
const isEmployer = require("./../middleware/isEmployer");
const isJobseeker = require("./../middleware/isJobseeker");

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

<<<<<<< HEAD
router.post("/signup-jobseeker", fileUploader.any(), (req,res) => {
    const { username, password, email, firstName, lastName, location, addPicture, addResume} = req.body;
    console.log(req.files);
// removed accountType
    // const accountTypeNotProvided = !accountType || accountType === "" ;
    const usernameNotProvided = !username || username === "";
    const passwordNotProvided = !password || password === "";
    const emailNotProvided = !email || email === "";
    const firstNameNotProvided = !firstName || firstName === "";
    const lastNameNotProvided = !lastName || lastName === "";
    const locationNotProvided = !location || location === "";

    if ( usernameNotProvided || passwordNotProvided || emailNotProvided || firstNameNotProvided || lastNameNotProvided || locationNotProvided) {
        res.render("auth/signup-form-js", {
            errorMessage: "Please provide required information"
        });
        return
    }
 
    User.findOne({ username: username })
=======
router.post("/signup-jobseeker", (req, res) => {
  const {
    username,
    password,
    email,
    firstName,
    lastName,
    location,
    addPicture,
    addResume,
  } = req.body;
  // removed accountType
  // const accountTypeNotProvided = !accountType || accountType === "" ;
  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";
  const emailNotProvided = !email || email === "";
  const firstNameNotProvided = !firstName || firstName === "";
  const lastNameNotProvided = !lastName || lastName === "";
  const locationNotProvided = !location || location === "";

  if (
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
>>>>>>> 98a11d7e686b5ea58ba574277c0e97310f82d4d4
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
        accountType: "Job seeker",
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
      res.render("auth/signup-form-js", {
        errorMessage: err.message || "Error while trying to sign up",
      });
    });
});

<<<<<<< HEAD
router.post("/signup-employer", fileUploader.single("addPicture"), (req,res) => {
  const {username, password, email, firstName, lastName, companyName, location, addPicture, addResume} = req.body;

=======
router.post("/signup-employer", (req, res) => {
  const {
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
>>>>>>> 98a11d7e686b5ea58ba574277c0e97310f82d4d4

  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";
  const emailNotProvided = !email || email === "";
  const firstNameNotProvided = !firstName || firstName === "";
  const companyNameNotProvided = !companyName || companyName === "";
  const lastNameNotProvided = !lastName || lastName === "";
  const locationNotProvided = !location || location === "";

  if (
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
        accountType: "Employer",
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
//login

router.get("/login", (req, res) => {
  res.render("auth/login-form");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";

  if (usernameNotProvided || passwordNotProvided) {
    res.render("auth/login-form", {
<<<<<<< HEAD
     errorMessage: "Please provide username and/or password" 
  });
  return
}


let user;
User.findOne({ username: username})
.then ((foundUser) => {
  user= foundUser
  if (!foundUser) {
    throw new Error("Wrong credentials");
  }
  return bcrypt.compare(password, foundUser.password);
})
.then((passwordCorrect) => {
  if(!passwordCorrect) {
    throw new Error("Wrong credentials");

  } else if (passwordCorrect) {
    
    req.session.user = user;
   
    res.redirect("/")
  }
  
=======
      errorMessage: "Please provide username and/or password",
    });
    return;
  }

  let user;
>>>>>>> 98a11d7e686b5ea58ba574277c0e97310f82d4d4
  User.findOne({ username: username })
    .then((foundUser) => {
      user = foundUser;
      if (!foundUser) {
        throw new Error("Wrong credentials");
      }
      return bcrypt.compare(password, foundUser.password);
    })
    .then((passwordCorrect) => {
      if (!passwordCorrect) {
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

//logout
router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render("error");
    }
    res.redirect("/");
  });
  console.log(req.session);
});

router.get("/my-profile", isLoggedIn, (req, res) => {
  const user = req.session.user;

  let isEmployer = false;

  if (user.accountType === "Employer") {
    isEmployer = true;
  }

  console.log(user);
  res.render("profile/my-profile", { user, isEmployer });
});

router.get("/edit-profile", isLoggedIn, fileUploader.single("addPicture"),(req, res) => {
  const user = req.session.user;

  let isEmployer = false;
  if (user.accountType === "Employer") {
    isEmployer = true;
  }
  res.render("profile/edit", { user, isEmployer });
});

router.post("/edit-profile", isLoggedIn, fileUploader.single("addPicture"), (req, res) => {
  const user = req.session.user;

  const { email, firstName, lastName, companyName, location } = req.body;

  let isEmployer = false;
  if (user.accountType === "Employer") {
    isEmployer = true;
  }

  User.findByIdAndUpdate(
    user._id,
    { email, firstName, lastName, companyName, location },
    { new: true }
  )
    .then((updatedUser) => {
<<<<<<< HEAD
      console.log(updatedUser);
      res.render("profile/my-profile", { user: updatedUser, isEmployer });
=======
     
      res.render("profile/my-profile", {user: updatedUser, isEmployer});
>>>>>>> 66d6f712108eddd167461379f7f26f2ba58d35c2
    })
    .catch((err) => {
      res.render("profile/edit", {
        errorMessage: err.message || "Error while trying to edit",
      });
    });
});
module.exports = router;
