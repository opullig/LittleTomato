exports.up = function(knex) {
  return knex.schema.createTable('promotions', function(table){
        table.increments('id');
        table.integer('product').notNullable();
        table.foreign('product').references('id').inTable('products');
        table.float('price_off').defaultTo(0);
        table.boolean('status').defaultTo(true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('promotions');
};
