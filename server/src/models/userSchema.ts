import mongoose, { Schema,Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export interface IUser extends Document{
  name:string,
  password:string,
  email:string,
  avatar:{
    public_id:string,
    url:string
  }
  role:string,
  isVerfied:boolean,
  course:Array<{courseId:string}>
  comparePassword:(password:string)=>Promise<boolean>
}

const UserSchema:Schema<IUser> = new Schema({
  name:{
    type:String,
    requird:[true,"Enter the Name"]
  },
  email:{
    type:String,
    required:[true,"Enter The Email"],
    validate:{
      validator:function(value:string){
        return emailRegexPattern.test(value) 
      },
      message:`Please enter the Valid Email`
    },
    unique:true
  },
  password:{
    type:String,
    required:[true,"Please enter your password"],
    minLength:[6,"Password must be at least 6 character"],
    select:false
  },
  avatar:{
    public_id:String,
    url:String
  },
  role:{
    type:String,
    default:'user'
  },
  isVerfied:{
    type:Boolean,
    default:false
  },
  course:[
    {
      courseId:String
    }
  ]
},{timestamps:true})

//Hash Password
UserSchema.pre<IUser>('save', async function (next) {
  // Check if the password field has been modified or is newly set.
  // If it hasn't changed, we don't need to hash it again.
  if (!this.isModified('password')) {
    return next(); // Continue to the next middleware or save process
  }

  // If the password is new or modified, hash it before saving.
  // 'bcrypt.hash()' takes the plain text password and converts it
  // into a secure hash using 10 salt rounds.
  this.password = await bcrypt.hash(this.password, 10);

  // Once hashing is complete, call next() to proceed with saving the document.
  next();
});


//Compare Password
UserSchema.methods.comparePassword = async function(enteredPassword:string):Promise<boolean>{
  return await bcrypt.compare(enteredPassword,this.password)
}

const userModel:Model<IUser> = mongoose.model("User",UserSchema)
export default userModel