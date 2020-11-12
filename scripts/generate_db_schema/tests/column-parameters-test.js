// Chai
const chai = require('chai');
const expect = chai.expect;

const columnParameters = require('../column-parameters');
const { generateDbSchema } = require('../index');

describe('Generate column parameters', () => {
  it('returns string when column type is text', () => {
    //given
    const column = {name:'name', type:'text'};
    const expectedColumn = "t.string('name');"

    //when
    const result = columnParameters.get(column);

    //then
    expect(result).to.equal(expectedColumn);
  });
  
  it('returns text when column type is multilineText', () => {
    //given
    const column = {name:'description', type:'multilineText'};
    const expectedColumn = "t.text('description');"

    //when
    const result = columnParameters.get(column);

    //then
    expect(result).to.equal(expectedColumn);
  });
  
});
