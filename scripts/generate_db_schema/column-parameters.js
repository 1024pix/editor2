module.exports = {
  get
};

function get({name, type, typeOptions}) {
  if (name === 'id') {
    return null
  }
  const pgType = convertToPgType(type, typeOptions);
  if( !pgType ) {
    return null
  }
  const options = enumValuesFromOptions(type, typeOptions);
  return `t.${pgType}("${name.replace("'", "''")}"${options});`;
}

function convertToPgType(type) {
  switch (type) {
    case 'text':
      return 'string';
    case 'multilineText':
      return 'text';
    case 'number':
      return 'integer';
    case 'checkbox':
       return 'boolean';
    case 'select':
       return `enu`;
    default:
      return null;
  }
}

function enumValuesFromOptions(type, typeOptions) {
  if (type !== 'select') {
    return ''
  }
  const values  = Object.values(typeOptions.choices).map(choice => {
    return `"${choice.name.replace("'", "''")}"`;
  }).join(', ');
  return `, [${values}]`
}
