var express     = require('express');
var session     = require('express-session');
var cookieParse = require('cookie-parser');
var bodyParser  = require('body-parser');
var validator   = require('express-validator');
var MongoStore  = require('connect-mongo')(session);
var mongoose    = require('mongoose');
var app         = express();
var admin       = require('./src/admin/index.js');
mongoose.connect("localhost:27017/test");
app.set('env',process.env_NODE_ENV);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParse("keyboard cat"));
app.use(validator());
app.use(session({
	name              : "skey",
	secret            : "keyboard cat",
	store             : new MongoStore({mongooseConnection : mongoose.connection}),
	saveUninitialized : false,
	resave            : false,
	cookie            : {
		maxAge        : 18*60*1000
	}
}));
app.use('/admin',admin);
app.use(function(req,res,next)
{
	var err    = new Error('Not Found');
	err.status = 404;
	next(err);
});

var server = app.listen(4000,function()
{
	var address = server.address().address;
	var port    = server.address().port;
	console.log('listening at  '+address+" :"+port);
});
