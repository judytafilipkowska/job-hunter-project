const router = require("express").Router();

//ROUTES
//making a change
// GET  
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

module.exports = router;
