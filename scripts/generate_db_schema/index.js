module.exports = {
  generateDbSchema
}

function generateDbSchema(tables) {

  const createTables = tables.map(createTable).join('');
  const dropTables = tables.map(dropTable).join('');
  return `exports.up = async (knex) => {

${createTables}
};

exports.down = async (knex) => {
${dropTables}
};`
}

function createTable(table) {
  return `  await knex.schema
    .createTable('${table.name}', (t) => {
      t.string('id').primary();
      t.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
      t.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
    });
`
}

function dropTable(table) {
  return `  await knex.schema
    .dropTable('${table.name}');
`
}