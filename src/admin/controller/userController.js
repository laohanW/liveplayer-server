const User =require('../model/userModel');
module.exports={
	findById:function(id,callback)
	{
		User.findById(id,callback);
	},
	findOne:function(obj,callback){
		User.findOne(obj,callback);
	},
	createUser:function()
	{
		return new User();
	}
};
