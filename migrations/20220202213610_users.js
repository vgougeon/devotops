
exports.up = function (knex) {
    return knex.schema
    .createTable('users', function (table) {
        table.increments();
        table.integer('githubId').notNullable();
        table.string('username')
        table.string('name')
        table.string('avatar')

        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('projects', function (table) {
        table.increments();
        table.integer('githubId').notNullable();
        table.string('name');
        table.string('url');
        table.string('template');

        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema
    .dropTable('projects')
    .dropTable('users');
};
