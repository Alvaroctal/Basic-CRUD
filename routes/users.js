var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('pages/users', { 
        title: 'Express | Users',
        nav: {
            page: 'users',
            login: false
        }
    });
});

module.exports = router;
