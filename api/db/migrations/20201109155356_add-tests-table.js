const TABLE_NAME = 'tests';

exports.up = (knex) => {
  return knex.schema
    .createTable(TABLE_NAME, (t) => {
      t.string('id').primary();
      t.string('name');
      t.string('description');
      t.string('image_url');
      t.integer('display_order').unsigned();
      t.boolean('adaptive');
      t.boolean('challenge_of_the_week');
      t.enu('status', ['draft', 'program_level_3', 'published', 'suggested', 'unpublished', 'validated', 'disabled']);
      t.string('series');
      t.string('field_17');
    });
};
  
exports.down = (knex) => {
  return knex.schema
    .dropTable(TABLE_NAME);
};
