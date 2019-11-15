const router = require('express').Router();
const validateUser = require('../users/users-helper.js')
const Users = require('../users/users-model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
  // implement registration
  const newUser = req.body;

  const validatedUser = validateUser(newUser)

  if(validatedUser.isSuccessful === true){
    const hash = bcrypt.hashSync(newUser.password, 12)
    newUser.password = hash

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

  if(username && password){
    Users.findByUser(username)
    .then(account => {
      if(account && bcrypt.compareSync(password, account.password)){
          const token = getJwtToken(account.username)

          res.status(201).json({
            message: `Welcome ${account.username}`,
            token
          })
      } else {
        res.status(500).json({message: "Please provide valid username and password"})
      }
    })
    .catch(error => {
      res.status(401).json({message: "Username was not found"})
    })
  } else {
      res.status(401).json({message: "Please provide valid username and password"})
  }
});


function getJwtToken(username){
  const payload = {
    username
  }
  const secret = process.env.JWT_SECRET || 'willy wonka'
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;
