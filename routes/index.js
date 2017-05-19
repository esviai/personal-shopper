var express = require('express');
var router = express.Router();
const db = require('../models');

router.use(function(req,res,next) {
  let loginPage=['/c/search','/c/checkout'];
  let currRoute = req.path;
  console.log(currRoute);
  if (loginPage.includes(currRoute)) {
    req.session.user ? next() : res.render('index',{hasAccess: false, error: null});
  }
  else {
    next();
  };
});

/* GET home page. */
router.get('/', function(req,res,next) {
  let hasAccess = true;
  res.render('index', {hasAccess: true, error: null});
});

// LOGIN INITIALIZATION //
router.post('/',function(req,res,next) {
  let username = req.body.username;
  let password = req.body.password;
  db.user.findOne({where:{'username':username}})
    .then (user => {
      if (user.password === password) {
        req.session.user = {username:username, role:user.role};
        if (user.role === "seller") res.redirect('/s/portal');
        else res.redirect('/c/search');
      }
      else {
        res.render('index', {hasAccess: true, error: "Username or password is incorrect"});
      }
    })
    .catch (() => {
      res.render('index', {hasAccess: true, error: "Username doesn't exists"});
    });
});

// NEW USER REGISTRATION //
router.get('/registration',function(req,res,next) {
  // regError: checking whether the input values are OK or not.
  res.render('userCreate',{regError: null});
});

router.post('/registration',function(req,res,next) {
  let inputData = req.body;
  inputData.role = "customer";
  db.user.create(inputData)
    .then((user) => {
      res.redirect('/search');
    })
    .catch(err => {
      if (err.message === "Validation error: Username already exists.") {
        err.message = "Username already exists.";
      }
      res.render('userCreate',{regError: err.message});
    });
});

// CUSTOMER SIDE //
router.get('/c', function(req,res,next) {
  res.redirect('/c/search');
});

router.get('/c/search', function(req, res, next) {
  res.render('homeCust');
});

router.get('/c/checkout', function(req, res, next) {
  res.send('This is the checkout page');
});


// SELLER SIDE //
router.get('/s', function(req,res,next) {
  res.redirect('/s/portal');
});

router.get('/s/portal', function(req, res, next) {
  db.item.findAll()
    .then (items => {
      res.render('homeSell', {'items':items});
    });
});

router.get('/s/additem',function(req,res,next) {
  res.render('itemCreate');
});

router.post('/s/additem',function(req,res,next) {
  let inputItem = req.body;
  inputItem.role = "customer";
  db.item.create(inputItem)
    .then((item) => {
      res.redirect('/s/portal');
    });
});

router.get('/s/updateitem/:id',function(req,res,next) {
  let id = req.params.id;
  db.item.findById(id)
    .then (item => {
      console.log(item);
      res.render('itemUpdate', {'item':item});
    });
});

router.post('/s/updateitem/:id', function (req,res,next) {
  let id = req.params.id;
  let updateItem = req.body;
  db.item.update(updateItem,{where: {id:id}})
    .then (item => {
      res.redirect('/s/portal');
    });
});

router.get('/s/deleteitem/:id', function (req,res,next) {
  let id = req.params.id;
  //CHECK RELATIONNYA OTOMATIS KE DELETE JUGA ATAU NGGAK
  db.item.destroy({
    where: {id:id}
  })
    .then (() => {
      res.redirect('/s/portal');
    });
});

//// Recap ////
router.get('/s/dayrecap/', function (req,res,next) {
  var countItem = [];
  var itemsR = {};
  // db.item.findAndCountAll({include: [{model: db.usersitem}]})
  //   .then (result => {
  //     console.log(result);
  //     res.render('recapDay', {'items':items, 'countItem':countItem});
  //   });
  db.item.findAll()
    .then (items => {
      items.forEach(item => {
        db.usersitem.count({where: {'item_id':item.id}})
          .all(total => {
            countItem.push(total);
            //console.log(countItem);
            res.render('recapDay', {'items':items, 'countItem':countItem});
          });
      });
    });
});

//LOGOUT //
router.get('/doLogout',function(req,res,next) {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;
