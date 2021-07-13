exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', table => {
    table.increments();
    table.string('vin', 128).notNullable().unique();
    table.string('make', 128).notNullable();
    table.string('model', 128).notNullable();
    table.integer('mileage', 128).notNullable();
    table.string('title', 128).nullable();
    table.string('transmission', 128).nullable();
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExist('cars');

};
