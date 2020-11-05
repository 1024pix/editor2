const TABLE_NAME = 'tubes';

exports.up = (knex) => {
  return knex.schema
    .createTable(TABLE_NAME, (t) => {
      t.string('id').primary();
      t.string('name');
      t.text('description');
      t.string('competencesIds').references('competences.id');
      t.text('practical_title_fr_fr'); // Titre seul ? titre pratique ?  OBLIGATOIRE ?
      t.text('practical_title_en_us');
      t.text('practical_description_fr_fr'); // Description pratique ? Obligatoire ?
      t.text('practical_description_en_us');
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable(TABLE_NAME);
};
