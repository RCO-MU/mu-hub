import Parse from 'parse';
import * as config from './config';

Parse.initialize(config.PARSE_APP_ID, config.PARSE_JAVASCRIPT_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

// Saving your First Data Object on Back4App
async function saveNewPerson() {
  const person = new Parse.Object('Person');

  person.set('name', 'John Snow');
  person.set('age', 27);
  try {
    const result = await person.save();
    alert(`New object created with objectId: ${result.id}`);
  } catch (error) {
    alert(`Failed to create new object, with error code: ${error.message}`);
  }
}

// Reading your First Data Object from Back4App
async function retrievePerson() {
  const query = new Parse.Query('Person');

  try {
    const person = await query.get('mhPFDlCahj');
    const name = person.get('name');
    const age = person.get('age');

    alert(`Name: ${name} age: ${age}`);
  } catch (error) {
    alert(`Failed to retrieve the object, with error code: ${error.message}`);
  }
}
