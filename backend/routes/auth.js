const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');

//Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

  //If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Check whether the user with this email exists already
  User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  }).then((user) => { res.json(user) })
    .catch(err => {
      console.log(err)
      res.json({ error: 'Please Enter a Unique Value for email', message: err.message })
    })

})

module.exports = router