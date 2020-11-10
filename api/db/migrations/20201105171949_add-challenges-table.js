const TABLE_NAME = 'challenges';

exports.up = (knex) => {
  return knex.schema
    .createTable(TABLE_NAME, (t) => {
      t.string('id').primary();
      t.text('instruction');
      t.text('suggestions');
      t.enu('chalenge_type', ['qcu', 'qrocm_dep', 'qcm', 'qrocm', 'qrocm_ind', 'qmail', 'qroc']);
      t.string('illustration_url');
      t.string('attachment_url');
      t.text('answers');
      t.enu('pedagogy', ['#fichier', 'q_situation', 'e_preuve', 'q_savoir', 'Activé']);
      t.integer('timer').unsigned();
      t.text('image_license');
      t.enu('declinable', ['no', '', 'hardly', 'easly', 'swap']);
      t.integer('version').unsigned();
      t.enu('internet_and_tools', ['0', 'no', 'yes',]);
      t.enu('challenge_prototype', ['4', '', '2', '1', '0', '3', '5']);
      t.enu('status', ['archived', 'suggested', 'validated', 'outdated', 'idea', 'validated_without_test', 'pre_validated']);
      t.integer('userId').references('uslawers.id');
      t.enu('T1_spaces_break_accents', ['disabled', 'enabled']);
      t.enu('T2_punctuation', ['disabled', 'enabled']);
      t.enu('T3_editing_distance', ['disabled', 'enabled']);
      t.enu('software_environment', ['none', 'microsoft_office', 'ios', 'open_office', 'chrome', 'safari', 'macos', 'windows', 'firefox', 'android', 'edge']);
      t.enu('genealogy', ['Décliné_1', 'protoype_1', 'déclined', 'francophone', 'ecri', 'eng']);
      t.text('embed_url');
      t.string('embed_title');
      t.integer('embed_height').unsigned();
      t.text('alternative_text_illustration');
      t.integer('prototype_version').unsigned();
      t.integer('declinable_version').unsigned();
      t.enu('blind', ['ok', 'non_relevant_skill', 'ko', 'to_be_tested', 'nothing_to_report']);
      t.enu('color_blind', ['nothing_to_report', 'ok', 'ko']);
      t.enu('spoil', ['not_possible', 'easly', 'hardly']);
      t.enu('responsive', ['smartphone', 'no', 'tablet_and_smartphone', 'tablet']);
      t.enu('format', ['date', 'small', 'number', 'words', 'paragraph', 'sentence']);
      t.enu('language_version', ['francophone', 'french']);
      t.enu('locales', ['francophone', 'german', 'spanish', 'italy', 'english', 'french']);
      t.boolean('autoReply');
      t.text('alternative_instruction');
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable(TABLE_NAME);
};
