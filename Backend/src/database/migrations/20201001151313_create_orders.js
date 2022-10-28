
exports.up = function(knex) {
  return knex.schema.createTable('orders', function(table){
        table.string('order_number').primary();
        table.string('user').notNullable();
        table.foreign('user').references('id').inTable('users');
        table.string('address').notNullable();
        table.datetime('date', { precision: 4 });
        table.float('total_price').defaultTo(0);
        table.string('payment').notNullable();
        table.string('status').defaultTo('Em Aberto');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
