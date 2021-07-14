let cars = require('./cars-model')
let vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  let id = req.params.id;
  cars.getById(id)
    .then(car => {
      if (car) {
        next();
      } else {
        res.status(404).json({ message: `car with id ${id} is not found` })
      }
    })

}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  let { vin, make, model, mileage } = req.body;
  // if (!vin, !make, !model, !mileage) {
  //   res.status(400).json({ message: "Vin, Make, Model, Mileage is missing" })
  // } else {
  //   next();
  // }

  if (!vin) {
    res.status(400).json({ message: `vin is missing` })
  } else if (!make) {
    res.status(400).json({ message: `make is missing` })
  } else if (!model) {
    res.status(400).json({ message: `model is missing` })
  } else if (!mileage) {
    res.status(400).json({ message: `mileage is missing` })
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  let vin = req.body.vin;
  let isValid = vinValidator.validate(vin)
  if (isValid) {
    next();
  } else {
    res.status(400).json({ message: `vin ${vin} is invalid` })
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  cars.getByVin(req.body.vin)
    .then(exists => {
      if (exists) {
        res.status(400).json({ message: `vin ${req.body.vin} already exists` })
      } else {
        next();
      }
    })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}



  // // DO YOUR MAGIC
  // let id = req.params.id;
  // // cars.getById(id)
  // try {
  //   let [carInfo] = await cars.getById(id)
  //   console.log(carInfo, 'infooooo')
  //   if (carInfo) {
  //     next();
  //   } else {
  //     res.status(404).json({ message: `car with id ${id} is not found` })
  //   }
  // }
  // catch (err) {
  //   next(err)
  // }