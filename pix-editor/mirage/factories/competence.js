import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({

  name: faker.lorem.words(),
  title: faker.lorem.words(),
  code: `${faker.random.number()}`,
  description: faker.lorem.words(),
  pixId: faker.lorem.words(),
  source: faker.lorem.words(),

});

