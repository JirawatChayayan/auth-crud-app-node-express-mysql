// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { authenticateToken } = require('../middlewares/authMiddleware');


// Login user and generate access token
const loginUser = (req, res) => {
  const { en, password } = req.body;

  // Find user by email
  User.findByEN(en, (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Error finding user' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    // console.log(b64);
    // console.log(user);
    //return true;

    try 
    {
      if(user.EXPIRE_FLAG == 1)
      {
        return res.status(401).json({ message: 'User '+ user.EnUSER +' is expire'});
      }

      let b64 = Buffer.from(password).toString('base64');
      if(b64 == user.PASSWORD){

        const accessToken = generateAccessToken(user.ITEM, user.EnUSER,user.LEVEL);
        return res.json({ accessToken });

      } else {
        return res.status(401).json({ message: 'Invalid email or password' });

      }

    } catch (e) {
      console.log(e); // Logs the error
      return res.status(500).json({ message: 'Error comparing passwords' });
    }
    
  });
};

// Generate access token
const generateAccessToken = (userId, en, role) => {
  return jwt.sign({ id: userId, en ,role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '2h',
  });
};

// Get user profile
const getProfile = (req, res) => {
  const { en } = req.user;
  User.findByEN(en, (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Error finding user' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({  
      en : user.EnUSER,
      level : user.LEVEL,
      img : "http://10.151.27.1:8099/UserAuthorize/image/"+user.EnUSER,
      updateBy : user.UPDATEBY
    });
  });
};

module.exports = {
  loginUser,
  getProfile,
};
