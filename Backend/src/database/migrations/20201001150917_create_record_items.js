
exports.up = function(knex) {
  return knex.schema.createTable('record_items', function(table){
            table.increments('id');
            table.integer('product').notNullable();
            table.foreign('product').references('id').inTable('products');
            table.string('record_number').notNullable();
            table.foreign('record_number').references('record_number').inTable('records');
            table.integer('amount').defaultTo(0);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('record_items');
};
