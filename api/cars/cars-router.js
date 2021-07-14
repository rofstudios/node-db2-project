// DO YOUR MAGIC
let express = require('express');
let router = express.Router();
let cars = require('./cars-model');
let { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware')



router.get('/', (req, res) => {
    return cars.getAll()
        .then(allcars => {
            res.status(200).json(allcars);
        });
})

router.get('/:id', checkCarId, (req, res, next) => {
    cars.getById(req.params.id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            next(err);
        })
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    let carInfo = req.body;

    cars.create(carInfo)
        .then(createdCar => {
            res.status(201).json(createdCar);
        })
        .catch(err => {
            next(err);
        })
})

// router.use('/', (req, res) => {
//     res.status(200).json({ message: 'hello from inside the router' })
// })

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router