let db = require('../../data/db-config');


const getAll = () => {
  // DO YOUR MAGIC
  // return db('cars');
  return db.select('*').from('cars')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db.select('*').from('cars').where({ id }).first();
}

const create = (carData) => {
  // DO YOUR MAGIC
  return db('cars').insert(carData)
    .then(id => {
      return getById(id)
    })
}

let getByVin = async (vin) => {
  let carVin = await db.select('vin').from('cars').where({ vin }).first()
  return carVin
}

module.exports = {
  getAll,
  getById,
  create, getByVin
}
