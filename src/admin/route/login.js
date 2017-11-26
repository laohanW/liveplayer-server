var flash         = require('connect-flash');
var passport      = require('passport');
var localStrategy = require('passport-local').Strategy;
var controller    = require('../controller/userController');

passport.serializeUser(function(user,done)
{
	done(null,user.id);	
});
passport.deserializeUser(function(id,done)
{
	controller.findById(id,function(err,user)
	{
		done(err,user);	
	});
});
passport.use('local.register',new localStrategy(
{
	usernameField:'username',
	passwordField:'password',
	passReqToCallback:true
},function(req,username,password,done)
{
	req.checkBody('username','username invalid').notEmpty();
	req.checkBody('password','password is invalid').notEmpty();
	var errors = req.validationErrors();
	if(errors)
	{
		var messages=[];
		errors.forReach(function(error)
		{
			messages.push(error.msg);
		});
		return done(null,false,req.flash('error',messages));
	}
	controller.findOne({'username':username},function(err,user)
	{
		console.log(err);
		console.log(user);
		if(err)return done(err);
		if(user)return done(null,false,{message:'has this username'});
		var newUser=controller.createUser();
		newUser.username=username;
		newUser.password=newUser.encryptPassword(password);
		newUser.save(function(err,result)
		{
			if(err)return done(err);
			return done(null,newUser);
		});
	});
}));
passport.use('local.login',new localStrategy({
	usernameField:'username',
	password:'password',
	passReqToCallback:true
},function(req,username,password,done)
{
	req.checkBody('username','invalid username').notEmpty();
	req.checkBody('password','password invalid').notEmpty();
	var errors=req.validationErrors();
	if(errors)
	{
		var message=[];
		errors.forEach(function(error)
		{
			message.push(error.msg);	
		});
		return done(null,false,req.flash('error',messages));
	};
	controller.findOne({'username':username},function(err,user)
	{
		if(err)return done(err);
		if(!user)return done(null,false,{message:'user eror'});
		if(!user.validPassword(password))return done(null,false,{message:'password error'});
		return done(null,user);
	});
}));
module.exports=function(router)
{
	router.use(flash());
	router.use(passport.initialize());
	router.use(passport.session());
	router.post("/register",
		passport.authenticate('local.register',{
			failureFlash:true
		}),
		function(req,res)
		{
			console.log('register');	
			res.json({result:'success'});
			res.end();
		}
	);
	router.post('/login',
		passport.authenticate('local.login',{
			failureFlash:true
		}),
		function(req,res)
		{
			console.log('login');
			res.json({result:'success'});
			res.end();
		}
	);
	router.post("/logout",function(req,res)
	{
		console.log('/logout');
	});
};
