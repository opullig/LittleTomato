
exports.up = function(knex) {
  return knex.schema.createTable('locations', function(table){
        table.increments('id');
        table.string('address').notNullable();
        table.string('complement').notNullable();
        table.string('city').notNullable();
        table.string('user').notNullable();
        table.foreign('user').references('id').inTable('users');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('locations');
};
