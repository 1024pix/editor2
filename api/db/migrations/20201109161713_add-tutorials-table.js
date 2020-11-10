const TABLE_NAME = 'tutorials';

exports.up = (knex) => {
  return knex.schema
    .createTable(TABLE_NAME, (t) => {
      t.string('id').primary();
      t.string('title');
      t.enu('format', ['vidéo', 'slide', 'site', 'game', 'audio', 'pdf', 'image', 'page', 'tool', 'timeline']);
      t.string('duration');
      t.string('source');
      t.text('link');
      t.integer('level').unsigned();
      t.string('tools');
      t.string('update_date');
      t.string('license');
      t.string('favorite');
      t.enu('locale', ['en_us', 'fr_fr']);
    });
};
    
exports.down = (knex) => {
  return knex.schema
    .dropTable(TABLE_NAME);
};
