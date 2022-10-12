const joi = require("joi")

const usreJoiSchema = joi.object().keys({
    username : joi.string().required().min(5),
    email: joi.string().required().max(30).email({tlds:{allow : false}}),
    password :joi.string().required().min(5)
})

module.exports = usreJoiSchema

