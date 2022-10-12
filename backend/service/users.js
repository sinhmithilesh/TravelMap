const User = require("../model/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


class UserService {

    hashPassword = async(password) => {
        const salt = await bcrypt.genSalt(10)
        const doHashing = await bcrypt.hash(password, salt)
        return doHashing
    };

    singUp = async(data) => {
       try{
        const userSignUp = new User(data)
        const result = await userSignUp.save()
        return result
       }
       catch(err){
        throw err
       }
    }

    login = async(username, password) => {
        console.log(username, password)
        //find user
        const result = await User.findOne({username : username})
        if(!result){
            return false
        }    
        //validate password
        const isPasswordValid = await bcrypt.compare(password, result.password)
        if(!isPasswordValid){
            return false
        }
        return result
    }

    generateToken = (userId) => {
        try{
            const payload = {userId};
            const option = {expiresIn : ""}
            const token = jwt.sign(payload, process.env.secret, option);
            return token
        }
        catch(err){
            throw err
        }
    }
}

module.exports = UserService