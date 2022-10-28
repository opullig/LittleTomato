
exports.up = function(knex) {
  return knex.schema.createTable('records', function(table){
            table.string('record_number').primary();
            table.string('access_key').notNullable();
            table.foreign('access_key').references('access_key').inTable('professionals');
            table.datetime('date', { precision: 6 });
            table.string('status').defaultTo('Em Aberto');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('records');
};
