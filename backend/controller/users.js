const UserService = require("../service/users")
const userServiceInstance = new UserService()

const register = async(req, res) => {
    try{
        const hashedPassword = await userServiceInstance.hashPassword(req.body.password)
        const result = await userServiceInstance.singUp({...req.body, password : hashedPassword})
        res.status(200).json(result)
    }
    catch(err){
        res.json(500).json(err)
    }
}

const login = async(req, res) => {
    try{
        const isUserExist = await userServiceInstance.login(req.body.username, req.body.password)
        if(!isUserExist){
            res.status(400).json("wrong username or password!")
        }
        res.status(200).json({_id :isUserExist._id, username: isUserExist.username})

    }
    catch(err){
        res.status(500).json(err)
    }
}


module.exports = {register, login}