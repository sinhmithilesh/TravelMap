const PinService = require('../service/pin')

const PinServiceInstance = new PinService()

const createPin = async (req, res) => {
  try {
    const result = await PinServiceInstance.create(req.body)
    res.status(200).json(result)
  } catch (err) {
    res.status().json(err)
  }
}

const getAllPins = async(req, res) => {
    try{
        const allPins = await PinServiceInstance.findAll();
        if(allPins){
            res.status(200).json(allPins)
        }

    }catch(err){
        res.status(500).json(err)
    }
}   

module.exports = {
  createPin,
  getAllPins
}
