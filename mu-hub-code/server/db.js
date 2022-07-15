const Parse = require('parse/node');
const config = require('./config');

class DB {
  constructor() {
    // initialize db connection
    Parse.initialize(config.PARSE_APP_ID, config.PARSE_JAVASCRIPT_KEY);
    Parse.serverURL = 'https://parseapi.back4app.com';
  }

  // Saving your First Data Object on Back4App
  static async saveNewPerson(name, age) {
    const person = new Parse.Object('Person');
    person.set('name', name);
    person.set('age', age);
    try {
      await person.save();
    } catch (error) {
      console.error(error);
    }
  }

  // Reading your First Data Object from Back4App
  static async retrievePerson() {
    const query = new Parse.Query('Person');
    const personObj = {
      name: '',
      age: '',
    };
    try {
      const objectID = 'Hr31mKDo7h';
      const person = await query.get(objectID);
      personObj.name = person.get('name');
      personObj.age = person.get('age');
    } catch (error) {
      console.error(error);
    }
    return personObj;
  }
}

module.exports = DB;
