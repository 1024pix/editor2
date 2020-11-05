const TABLE_NAME = 'skills';

exports.up = (knex) => {
  return knex.schema
    .createTable(TABLE_NAME, (t) => {
      t.string('id').primary();
      t.text('hint_fr_fr');
      t.text('hint_en_us');
      t.enu('hint_status', ['suggested', 'pre_validated', 'validated', 'to_submit', 'to_be_reworked', 'archived', 'not_relevant']);
      t.string('tubesIds').references('tubes.id');
      t.text('description');
      t.enu('description_status', ['suggested', 'pre_validated', 'validated', 'to_submit', 'to_be_reworked', 'archived']);
      t.integer('level').unsigned();
      t.enu('status', ['archived', 'work_in_progress', 'active', 'outdated']);
      t.enu('internationalization', ['european_union', 'world', 'france']);
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable(TABLE_NAME);
};
