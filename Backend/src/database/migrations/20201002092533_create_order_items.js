
exports.up = function(knex) {
  return knex.schema.createTable('order_items', function(table){
            table.increments('id');
            table.string('name').notNullable();
            table.integer('amount').defaultTo(1);
            table.float('price').defaultTo(0);
            table.string('order_number').notNullable();
            table.foreign('order_number').references('order_number').inTable('orders');
            table.integer('product').notNullable();
            table.foreign('product').references('id').inTable('products')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('order_items');
};
