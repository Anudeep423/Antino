const userSchema = require("../models/users");
var jwt = require("jsonwebtoken");


exports.signup = (req, res) => {
    console.log(req.body)
    const user = new userSchema(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error : err
        });
      }
      res.status(200).json({
       user
      });
    });
  };



  exports.signin = (req, res) => {

    const {email,password} = req.body

    userSchema.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "USER email does not exists"
        });
      }
  
      if (!user.autheticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }
  
      //create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET  );
      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
  
      //send response to front end
      const { _id, name, email, role , encry_password  } = user;
      return res.json({ token, user: { _id, name, email, role , encry_password  } });
    });
  };

  exports.isAdmin = (req,res,next) => {
    console.log("Called")
  if(req.user.role === 1 ){
      next();
  }else{
      return res.json("You are not an admin")
  }
}

// Controller to get all the users


  exports.getAllUsers = (req,res) => {
    userSchema.find()
    .select("-salt -encry_password -updatedAt -createdAt -__v ")
    .exec( (err , users) => {
        if(err || !users){
            return res.json(err)
        }  
         return res.json(users)   
    } )
  }

  exports.getUserById = (req,res,next,id) => {
    userSchema.findOne({_id : id  })
    .exec( (err,user) => {
        if(err || !user){
            return res.json(err)
        }
        req.user = user
        next();
    }   )
}

exports.getAUser = (req,res) => {
    return   res.json(req.user)
    }