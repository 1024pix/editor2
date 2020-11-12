module.exports = {
  get
};

function get({name, type}) {
  let pgType;
  
  switch (type) {
    case 'text' : pgType = 'string';
      break;
    case 'multilineText' : pgType = 'text';
  }
  
  return `t.${pgType}('${name}');`;
}