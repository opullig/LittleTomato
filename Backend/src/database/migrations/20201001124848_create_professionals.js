
exports.up = function(knex) {
  return knex.schema.createTable('professionals', function(table){
      table.string('access_key').primary();
      table.string('user').notNullable();
      table.foreign('user').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('professionals');
  
};
