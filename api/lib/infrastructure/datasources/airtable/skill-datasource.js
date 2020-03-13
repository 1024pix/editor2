const datasource = require('./datasource');

module.exports = datasource.extend({

  modelName: 'Skill',

  tableName: 'Acquis',

  usedFields: [
    'id persistant',
    'Nom',
    'Indice',
    'Statut de l\'indice',
    'Comprendre (id persistant)',
    'En savoir plus (id persistant)',
    'PixValue',
    'Compétence (via Tube) (id persistant)',
    'Status',
  ],

  fromAirTableObject(airtableRecord) {

    let competenceId;
    if (airtableRecord.get('Compétence (via Tube) (id persistant)')) {
      competenceId = airtableRecord.get('Compétence (via Tube) (id persistant)')[0];
    }

    return {
      id: airtableRecord.get('id persistant'),
      name: airtableRecord.get('Nom'),
      hint: airtableRecord.get('Indice'),
      hintStatus: airtableRecord.get('Statut de l\'indice') || 'no status',
      tutorialIds: airtableRecord.get('Comprendre (id persistant)') || [],
      learningMoreTutorialIds: airtableRecord.get('En savoir plus (id persistant)') || [],
      pixValue: airtableRecord.get('PixValue'),
      competenceId,
      status: airtableRecord.get('Status'),
    };
  },
});
