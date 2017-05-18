var express = require('express');
var router = express.Router();
const db = require('../models');

router.use(function(req,res,next) {
  let loginPage=[];
  let currRoute = req.path;
  if (loginPage.includes(currRoute)) {
    req.session.user ? next() : res.render('/',{hasAccess: false, error: null});
  }
  else {
    next();
  };
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('This is the portal page');
});

module.exports = router;
