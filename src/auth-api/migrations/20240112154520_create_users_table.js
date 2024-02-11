// Import bcryptjs
const bcryptjs = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */

// Criação da tabela users
exports.up = function(knex) {
    const hashedPassword=bcryptjs.hashSync('root',10);
  return knex.schema.createTable('users', table => {
    table.increments('user_id').primary();
    table.string('username', 100).notNullable().unique();
    table.string('password',255).notNullable();
    table.enu('permission_level', ['view', 'edit','admin']).defaultTo('view');
  })
      .then(() => {
        return knex('users').insert({
            username: 'root',
            password: hashedPassword,
            permission_level: 'admin'
        });
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */

// Eliminação da tabela users
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
