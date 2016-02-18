var express = require('express');
var router = express.Router();

//------------------------------------------------------------------------------
//  Users
//------------------------------------------------------------------------------  

// Get

router.get('/users/:id(\\d+)', function(req, res, next) {

    var mysql = global.core.getDatabase('ddb76121');

    var select = "SELECT id, name, rank, twitter, steam, github, description, notes FROM Users WHERE id = ? LIMIT 1";

    mysql.query(select, req.params.id, function(error,result) {

        res.send(error == null ? { 
            status: 1, 
            code: 'get-user',
            result: result[0]
        } : {
            status: 0,
            code: 'no-get-user',
            reason: 'unable to get user',
            error: error.code
        });
        
        mysql.end();
    });
});

// Create

router.post('/users', function(req, res, next) {
    
    var mysql = global.core.getDatabase('ddb76121');

    var select = "INSERT INTO Users SET ?";

    mysql.query(select, req.body, function(error,result) {

        res.send(error == null ? { 
            status: 1, 
            code: 'create-user',
            result: result.insetId
        } : {
            status: 0,
            code: 'no-create-user',
            reason: 'unable to create user',
            error: error.code
        });

        mysql.end();
    });
});

// Update

router.put('/users', function(req, res, next) {
    
    var mysql = global.core.getDatabase('ddb76121');

    var select = "UPDATE Users SET ? WHERE id = ?";

    mysql.query(select, [req.body, req.body.id], function(error,result) {

        res.send(error == null ? { 
            status: 1, 
            code: 'update-user',
            result: result.affectedRows
        } : {
            status: 0,
            code: 'no-update-user',
            reason: 'unable to update user',
            error: error.code
        });

        mysql.end();
    });
});

// Delete

router.delete('/users', function(req, res, next) {

    var mysql = global.core.getDatabase('ddb76121');

    var select = "DELETE FROM Users WHERE id = ?";

    mysql.query(select, req.body.id, function(error,result) {

        res.send(error == null ? { 
            status: 1, 
            code: 'delete-user',
            result: result.affectedRows
        } : {
            status: 0,
            code: 'no-delete-user',
            reason: 'unable to delete user',
            error: error.code
        });

        mysql.end();
    });
});

module.exports = router;