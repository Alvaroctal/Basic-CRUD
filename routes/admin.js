var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('pages/admin', { 
        title: 'Express | Admin',
        subpage: 'admin/dashboard'
    });
});

router.get('/users', function(req, res, next) {

    var mysql = global.core.getDatabase('ddb76121');

    mysql.query('SELECT * FROM Users',function(error,users) {

        res.render('pages/admin', { 
            title: 'Express | Admin - Users',
            subpage: 'admin/users',
            users: users,
            error: JSON.stringify(error)
        });
        
        mysql.end();
    });
});

module.exports = router;