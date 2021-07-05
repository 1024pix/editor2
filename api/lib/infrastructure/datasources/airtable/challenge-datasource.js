const datasource = require('./datasource');
const airtable = require('../../airtable');
const { ENGLISH_SPOKEN, FRENCH_FRANCE, FRENCH_SPOKEN } = require('../../../domain/constants').LOCALE;

module.exports = datasource.extend({

  modelName: 'Challenge',

  tableName: 'Epreuves',

  usedFields: [
    'id persistant',
    'Compétences (via tube) (id persistant)',
    'Timer',
    'Consigne',
    'Propositions',
    'Type d\'épreuve',
    'Bonnes réponses',
    'Bonnes réponses à afficher',
    'T1 - Espaces, casse & accents',
    'T2 - Ponctuation',
    'T3 - Distance d\'édition',
    'Scoring',
    'Statut',
    'Acquix (id persistant)',
    'Embed URL',
    'Embed title',
    'Embed height',
    'Format',
    'Réponse automatique',
    'Langues',
    'Consigne alternative',
    'Focalisée',
    'Record ID',
    'Acquix',
    'Généalogie',
    'Type péda',
    'Auteur',
    'Déclinable',
    'Preview',
    'Version prototype',
    'Version déclinaison',
    'Non voyant',
    'Daltonien',
    'Spoil',
    'Responsive',
    'Géographie',
  ],

  fromAirTableObject(airtableRecord) {

    let competenceId;
    if (airtableRecord.get('Compétences (via tube) (id persistant)')) {
      competenceId = airtableRecord.get('Compétences (via tube) (id persistant)')[0];
    }

    let timer;
    if (airtableRecord.get('Timer')) {
      timer = parseInt(airtableRecord.get('Timer'));
    }

    return {
      id: airtableRecord.get('id persistant'),
      instruction: airtableRecord.get('Consigne'),
      proposals: airtableRecord.get('Propositions'),
      type: airtableRecord.get('Type d\'épreuve'),
      solution: airtableRecord.get('Bonnes réponses'),
      solutionToDisplay: airtableRecord.get('Bonnes réponses à afficher'),
      t1Status: airtableRecord.get('T1 - Espaces, casse & accents'),
      t2Status: airtableRecord.get('T2 - Ponctuation'),
      t3Status: airtableRecord.get('T3 - Distance d\'édition'),
      scoring: airtableRecord.get('Scoring'),
      status: airtableRecord.get('Statut'),
      skills: airtableRecord.get('Acquix') || [],
      skillIds: airtableRecord.get('Acquix (id persistant)') || [],
      embedUrl: airtableRecord.get('Embed URL'),
      embedTitle: airtableRecord.get('Embed title'),
      embedHeight: airtableRecord.get('Embed height'),
      timer,
      competenceId,
      format: airtableRecord.get('Format') || 'mots',
      autoReply: Boolean(airtableRecord.get('Réponse automatique')) || false,
      locales: _convertLanguagesToLocales(airtableRecord.get('Langues') || []),
      alternativeInstruction: airtableRecord.get('Consigne alternative') || '',
      focusable: airtableRecord.get('Focalisée'),
      airtableId: airtableRecord.get('Record ID'),
      genealogy: airtableRecord.get('Généalogie'),
      pedagogy: airtableRecord.get('Type péda'),
      author: airtableRecord.get('Auteur'),
      declinable: airtableRecord.get('Déclinable'),
      preview: airtableRecord.get('Preview'),
      version: airtableRecord.get('Version prototype'),
      alternativeVersion: airtableRecord.get('Version déclinaison'),
      accessibility1: airtableRecord.get('Non voyant'),
      accessibility2: airtableRecord.get('Daltonien'),
      spoil: airtableRecord.get('Spoil'),
      responsive: airtableRecord.get('Responsive'),
      area: airtableRecord.get('Géographie'),
    };
  },

  toAirTableObject(model) {
    return {
      fields: {
        'id persistant': model.id,
        'Consigne': model.instruction,
        'Propositions': model.proposals,
        'Type d\'épreuve': model.type,
        'Bonnes réponses': model.solution,
        'Bonnes réponses à afficher': model.solutionToDisplay,
        'T1 - Espaces, casse & accents': _convertBooleanToAirtableValues(model.t1Status),
        'T2 - Ponctuation': _convertBooleanToAirtableValues(model.t2Status),
        'T3 - Distance d\'édition': _convertBooleanToAirtableValues(model.t3Status),
        'Statut': model.status,
        'Embed URL': model.embedUrl,
        'Embed title': model.embedTitle,
        'Embed height': model.embedHeight,
        'Timer': model.timer,
        'Format': model.format,
        'Réponse automatique': model.autoReply,
        'Langues': _convertLocalesToLanguages(model.locales),
        'Consigne alternative': model.alternativeInstruction,
        'Focalisée': model.focusable,
        'Acquix': model.skills,
        'Généalogie': model.genealogy,
        'Type péda': model.pedagogy,
        'Auteur': model.author,
        'Déclinable': model.declinable,
        'Version prototype': model.version,
        'Version déclinaison': model.alternativeVersion,
        'Non voyant': model.accessibility1,
        'Daltonien': model.accessibility2,
        'Spoil': model.spoil,
        'Responsive': model.responsive,
        'Géographie': model.area,
      }
    };
  },

  async filterById(id) {
    const airtableRawObjects = await airtable.findRecords(this.tableName, {
      filterByFormula : `{id persistant} = '${id}'`,
      maxRecords: 1,
    });
    return this.fromAirTableObject(airtableRawObjects[0]);
  }
});

function _convertBooleanToAirtableValues(field) {
  if (field) {
    return 'Activé';
  }
  return 'Désactivé';
}

function _convertLanguagesToLocales(languages) {
  return languages.map((language) => _convertLanguageToLocale(language));
}

function _convertLanguageToLocale(language) {
  switch (language) {
    case 'Anglais':
      return ENGLISH_SPOKEN;
    case 'Francophone':
      return FRENCH_SPOKEN;
    case 'Franco Français':
      return FRENCH_FRANCE;
    default:
      return FRENCH_SPOKEN;
  }
}

function _convertLocalesToLanguages(locales) {
  return locales.map((locale) => _convertLocaleToLanguage(locale));
}

function _convertLocaleToLanguage(locale) {
  switch (locale) {
    case ENGLISH_SPOKEN:
      return 'Anglais';
    case FRENCH_SPOKEN:
      return 'Francophone';
    case FRENCH_FRANCE:
      return 'Franco Français';
    default:
      return 'Franco Français';
  }
}
