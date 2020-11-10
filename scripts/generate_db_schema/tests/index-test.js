const { expect } = require("../../../api/tests/test-helper");

const { generateDbSchema } = require('../index');

describe('Generate db schema', () => {
  it('returns migration file with 1 table', () => {
    //given
    const tables = [{name:'Table1'}];
    const migrationFile = 
`exports.up = async (knex) => {

  await knex.schema
    .createTable('Table1', (t) => {
      t.string('id').primary();
      t.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
      t.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
    });

};

exports.down = async (knex) => {
  await knex.schema
    .dropTable('Table1');

};`

    //when
    const result = generateDbSchema(tables);

    //then
    expect(result).to.equal(migrationFile);
  })
  it('returns migration file with 2 tables', () => {
    //given
    const tables = [{name:'Table1'}, {name:'Table2'}];
    const migrationFile = 
`exports.up = async (knex) => {

  await knex.schema
    .createTable('Table1', (t) => {
      t.string('id').primary();
      t.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
      t.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
    });
  await knex.schema
    .createTable('Table2', (t) => {
      t.string('id').primary();
      t.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
      t.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
    });

};

exports.down = async (knex) => {
  await knex.schema
    .dropTable('Table1');
  await knex.schema
    .dropTable('Table2');

};`

    //when
    const result = generateDbSchema(tables);

    //then
    expect(result).to.equal(migrationFile);
  })
})