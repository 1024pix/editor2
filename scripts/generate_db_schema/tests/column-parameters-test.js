// Chai
const chai = require('chai');
const expect = chai.expect;

const columnParameters = require('../column-parameters');
const { generateDbSchema } = require('../index');

describe('Generate column parameters', () => {
  [{
    column: {name:'name', type:'text'}, 
    expectedColumn: `t.string("name");`
  }, {
    column: {name:'description', type:'multilineText'},
    expectedColumn: `t.text("description");`
  }, {
    column: {name:'code', type:'number'},
    expectedColumn: `t.integer("code");`
  }, {
    column: {name: 'isActive', type: 'checkbox'},
    expectedColumn: `t.boolean("isActive");`
  }, {
    column: {name: 'status', type: 'select', typeOptions: {choices: {'choice1': {name:'status1'}, 'choice2': {name:'status2'}}}},
    expectedColumn: `t.enu("status", ["status1", "status2"]);`
  }, {
    column: {name: '', type: 'formula'},
    expectedColumn: null
  }, {
    column: {name: '', type: 'lookup'},
    expectedColumn: null
  }, {
    column: {name: '', type: 'foreignKey'},
    expectedColumn: null
  }, {
    column: {name: '', type: 'multiSelect'},
    expectedColumn: null
  }, {
    column: {name: '', type: 'rollup'},
    expectedColumn: null
  }, {
    column: {name: '', type: 'autoNumber'},
    expectedColumn: null
  }, {
    column: {name: '', type: 'count'},
    expectedColumn: null
  }, {
    column: {name: '', type: 'multipleAttachment'},
    expectedColumn: null
  }, {
    column: {name: "test d'apostrophe", type: 'select', typeOptions: {choices: {'choice1': {name:"status d'apostrophe"}}}},
    expectedColumn: `t.enu("test d''apostrophe", ["status d''apostrophe"]);`
  }, {
    column: {name: "id", type:'text'},
    expectedColumn: null
  }
].forEach(({column, expectedColumn}) => {
    
    it(`returns ${expectedColumn} when column type is ${column.type}`, () => {

      //when
      const result = columnParameters.get(column);

      //then
      expect(result).to.equal(expectedColumn);
    });
  });
  
});
