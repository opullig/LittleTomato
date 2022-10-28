exports.up = function(knex) {
    return knex.schema.createTable('sales', function(table){
      table.increments('id');
      table.string('name').notNullable();
      table.datetime('date', {precision: 4});
      table.integer('amount').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('sales');
  };
  