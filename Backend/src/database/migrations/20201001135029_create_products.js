
exports.up = function(knex) {
    return knex.schema.createTable('products', function(table){
            table.increments('id');
            table.string('name').notNullable();
            table.string('description');
            table.string('category').defaultTo('Sem Categoria')
            table.float('price').defaultTo(0);
            table.integer('amount').defaultTo(0);
            table.boolean('status').defaultTo(true);
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
