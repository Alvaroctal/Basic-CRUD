var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');
var colors = require('colors');

//------------------------------------------------------------------------------
//  Core
//------------------------------------------------------------------------------  

global.core = {
    corePath: path.join(__dirname, 'core'),
    infoPath: path.join(__dirname, 'core/info.json'),
    info: {},
    loadConfig: function() {
        this.log('status', 'Loading config...');
        this.info = require(this.infoPath);
        this.log('status', 'Config loaded.');
    },
    getAccess: function(page, subpage) {
        return true
    },
    getDatabase: function(database) {
        return mysql.createConnection(require(path.join(path.join(this.corePath, 'database'), database + '.json')));
    },
    log: function(state, message) {
        var type;
        if (state == 'error') type = colors.red('error');
        else if (state == 'status') type = colors.cyan('status');

        console.log(colors.grey('[') + type + colors.grey(']') + ' ' + message)
    }
};

fs.access(core.infoPath, fs.R_OK, (err) => {
    if (err) console.log(global.core.log('error', 'Unable to find previus config'));
    else global.core.loadConfig();
});

//------------------------------------------------------------------------------
//  Extra modules configurations
//------------------------------------------------------------------------------  

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//------------------------------------------------------------------------------
//  Router
//------------------------------------------------------------------------------  

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'));
app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//------------------------------------------------------------------------------
//  Errors
//------------------------------------------------------------------------------  

if (app.get('env') === 'development') {

    // development error handler, will print stacktrace

    app.use(function(err, req, res, next) {
    res.status(err.status || 500);
        res.render('pages/error', {
            title: 'Error page',
            message: err.message,
            error: err
        });
    });
}
else {

    // production error handler, no stacktraces leaked to user

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/error', {
            title: 'Error page',
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;