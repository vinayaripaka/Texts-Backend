import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userModel=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{type:String,default:"https://i.pinimg.com/736x/a2/11/7e/a2117e75dc55c149c2c68cbadee1f16e.jpg"},
},{
    timestamps:true,
});
userModel.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};
userModel.pre('save',async function(next){
    if(!this.isModified){
       next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});
const User=mongoose.model('User',userModel);
export default User;