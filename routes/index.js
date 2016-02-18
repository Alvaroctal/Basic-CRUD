var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('pages/index', { 
        title: 'Express',
        nav: {
            page: 'index',
            login: false
        }
    });
});

module.exports = router;
