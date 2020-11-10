const TABLE_NAME = 'tests';

exports.up = (knex) => {
  return knex.schema
    .createTable(TABLE_NAME, (t) => {
      t.string('id').primary();
      t.string('name');
      t.string('description');
      t.string('imageUrl');
      t.integer('displayOrder').unsigned();
      t.boolean('adaptive');
      t.boolean('challengeOfTheWeek');
      t.enu('status', ['draft', 'program_level_3', 'published', 'suggested', 'unpublished', 'validated', 'disabled']);
      t.string('series');
    });
};
  
exports.down = (knex) => {
  return knex.schema
    .dropTable(TABLE_NAME);
};
