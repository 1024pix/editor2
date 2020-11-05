const TABLE_NAME = 'areas';

exports.up = (knex) => {

  return knex.schema
    .createTable(TABLE_NAME, (t) => {
      t.string('id').primary();
      t.dateTime('created_at').defaultTo(knex.fn.now()).notNullable();
      t.integer('code').unsigned().notNullable().unique();
      t.text('title_fr_fr');
      t.text('title_en_us');
      t.string('color');
    });

};

exports.down = (knex) => {
  return knex.schema
    .dropTable(TABLE_NAME);
};
