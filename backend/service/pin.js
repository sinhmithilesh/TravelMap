const Pin = require('../model/Pin')

class PinService {
  create = async (body) => {
    try {
      const newPin = new Pin(body)
      const result = await newPin.save()
      return result
    } catch (err) {
      throw err
    }
  }

  findAll = async () => {
    try {
      const pins = await Pin.find()
      return pins
    } catch (err) {
      throw err
    }
  }
}

module.exports = PinService
