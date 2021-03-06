const buildChallenge = function buildChallenge({
  id,
  instruction,
  proposals,
  type,
  solution,
  solutionToDisplay,
  t1Status,
  t2Status,
  t3Status,
  scoring,
  status,
  skillIds,
  embedUrl,
  embedTitle,
  embedHeight,
  timer,
  competenceId,
  format,
  autoReply,
  locales,
  alternativeInstruction,
  airtableId,
  skills,
  genealogy,
  pedagogy,
  author,
  declinable,
  preview,
  version,
  alternativeVersion,
  accessibility1,
  accessibility2,
  spoil,
  responsive,
  area,
  focusable,
}) {
  return {
    id,
    'fields': {
      'id persistant': id,
      'Consigne': instruction,
      'Propositions': proposals,
      'Type d\'épreuve': type,
      'Bonnes réponses': solution,
      'Bonnes réponses à afficher': solutionToDisplay,
      'Timer': timer,
      'T1 - Espaces, casse & accents': t1Status,
      'T2 - Ponctuation': t2Status,
      'T3 - Distance d\'édition': t3Status,
      'Statut': status,
      'Scoring': scoring,
      'Embed URL': embedUrl,
      'Embed title': embedTitle,
      'Embed height': embedHeight,
      'Acquix (id persistant)': skillIds,
      'Format': format,
      'Langues': _convertLocalesToLanguages(locales || []),
      'Réponse automatique': autoReply,
      'Consigne alternative': alternativeInstruction,
      'Compétences (via tube) (id persistant)': [competenceId],
      'Record ID': airtableId,
      'Acquix': skills,
      'Généalogie': genealogy,
      'Type péda': pedagogy,
      'Auteur': author,
      'Déclinable': declinable,
      'Preview': preview,
      'Version prototype': version,
      'Version déclinaison': alternativeVersion,
      'Non voyant': accessibility1,
      'Daltonien': accessibility2,
      'Spoil': spoil,
      'Responsive': responsive,
      'Géographie': area,
      'Focalisée': focusable,
    },
  };
};

function _convertLocalesToLanguages(locales) {
  return locales.map((locale) => {
    if (locale === 'fr') {
      return 'Francophone';
    }
    if (locale === 'fr-fr') {
      return 'Franco Français';
    }
    if (locale === 'en') {
      return 'Anglais';
    }
  });
}

module.exports = buildChallenge;
