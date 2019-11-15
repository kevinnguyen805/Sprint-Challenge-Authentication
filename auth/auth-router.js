const router = require('express').Router();

router.post('/register', (req, res) => {
  // implement registration
  const newJoke = req.body;

  


});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body

  


});

module.exports = router;
