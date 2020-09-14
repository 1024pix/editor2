const Area = require('../../domain/models/Area');
const areaDatasource = require('../datasources/airtable/area-datasource');

async function get() {
  const areaDataObjects = await areaDatasource.list();
  const areas = areaDataObjects.map((areaDataObject) => {
    return new Area({
      id: areaDataObject.id,
      code: areaDataObject.code,
      name: areaDataObject.name,
      competenceIds: areaDataObject.competenceIds,
    });
  });
  return areas.sort((leftArea, rightArea) => leftArea.code - rightArea.code);
}

module.exports = {
  get
};
