
const validateSchmea = (schema) => {
    function test(req, res, next){
        const result = schema.validate(req.body)
        if(result.error){
            res.json(result.error)
        }
        else{
            next()
        }
    }
    return test
}

module.exports = validateSchmea