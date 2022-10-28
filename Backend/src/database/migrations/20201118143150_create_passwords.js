exports.up = function(knex) {
  return knex.schema.createTable('passwords', function(table) {
      table.string('id').primary();
      table.string('password').notNullable();
      table.string('user').notNullable();
      table.foreign('user').references('id').inTable('users');

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('passwords');
};
