
exports.up = function(knex) {
  return knex.schema.createTable('system_log', function(table){
    table.increments('id');
    table.string('access_key').notNullable();
    table.foreign('access_key').references('access_key').inTable('professionals');
    table.datetime('date', {precision: 4});
    table.string('occurence').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('system_log');
};
