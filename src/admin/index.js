var router = require('express').Router();
var login  = require('./route/login');

router.use("/",function(req,res,next)
{
	console.log("start");
	res.setHeader('Access-Control-Allow-Origin','http://192.168.38.134:3000');
	res.setHeader('Access-Control-Allow-Credentials',true);
	res.setHeader('Access-Control-Allow-Headers','Content-Type,Content-Length,Authorization,Accept,X-Requested-Width,yourHeaderField');
	res.setHeader('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
	res.setHeader('X-Powered-By',' 3.2.1');
	res.setHeader('Content-Type','application/json;charset=utf-8');
	next();
});
login(router);
module.exports = router;
