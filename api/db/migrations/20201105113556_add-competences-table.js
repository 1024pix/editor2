const TABLE_NAME = 'competences';

exports.up = (knex) => {

  return knex.schema
    .createTable(TABLE_NAME, (t) => {
      t.string('id').primary();
      t.dateTime('created_at').defaultTo(knex.fn.now()).notNullable();
      t.string('areaId').references('areas.id');
      t.text('title_fr_fr');
      t.text('title_en_us');
      t.text('description_fr_fr');
      t.text('description_en_us');
      t.integer('code').unsigned().notNullable();
      t.enu('origin', ['Law', 'Pix', 'France']);
    });

};

exports.down = (knex) => {
  return knex.schema
    .dropTable(TABLE_NAME);
};
