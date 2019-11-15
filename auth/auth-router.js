const router = require('express').Router();
const validateUser = require('../users/users-helper.js')
const Users = require('../users/users-model.js')

router.post('/register', (req, res) => {
  // implement registration
  const newUser = req.body;

  const validatedUser = validateUser(newUser)

  if(validatedUser.isSuccessful === true){
    Users.add(newUser)
    .then(user => {
      return res.status(201).json(user)
    })
    .catch(error => {
      return res.status(500).json({message: "Unable to create new user account"})
    })
  } else {
    return res.send("Please check credential errors and provide the right register info.")
  }
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body




});

module.exports = router;
