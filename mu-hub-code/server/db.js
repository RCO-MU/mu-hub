const Parse = require('parse/node');
const config = require('./config');

class DB {
  // initializes db connection
  constructor() {
    Parse.initialize(config.PARSE_APP_ID, config.PARSE_JAVASCRIPT_KEY);
    Parse.serverURL = 'https://parseapi.back4app.com';
  }

  // creates a hub user account
  static async createUserAccount(unixname, name, role) {
    const hubUser = new Parse.Object('HubUser');
    hubUser.set('unixname', unixname);
    hubUser.set('name', name);
    hubUser.set('role', role);
    try {
      await hubUser.save();
    } catch (error) {
      console.error(error);
    }
  }

  // creates an intern account
  static async createInternAccount(unixname, startDate, division, residence, college, bio) {
    const intern = new Parse.Object('Intern');
    intern.set('unixname', unixname);
    intern.set('startDate', startDate);
    intern.set('division', division);
    intern.set('residence', residence);
    intern.set('college', college);
    intern.set('bio', bio);
    try {
      await intern.save();
    } catch (error) {
      console.error(error);
    }
  }

  // retrieves hub user info
  static async getUserInfo(unixname) {
    // setup Parse query
    let user = new Parse.Object('HubUser');
    const query = new Parse.Query(user);
    // search for matching unixname
    query.equalTo('unixname', unixname);
    try {
      // perform query
      [user] = await query.find();
      let internInfo = null;
      // add intern info if the user is an intern
      if (user.get('role') === 'intern') {
        internInfo = await this.#getInternInfo(unixname);
      }
      // convert to JSON
      user = user.toJSON();
      delete user.unixname; // remove this redundant field
      // final output
      return {
        unixname,
        user,
        internInfo,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // private helper method for getUserInfo, gets intern-specific data
  static async #getInternInfo(unixname) {
    // setup Parse query
    let intern = new Parse.Object('Intern');
    const query = new Parse.Query(intern);
    // search for matching unixname
    query.equalTo('unixname', unixname);
    try {
      // perform query
      [intern] = await query.find();
      // convert to JSON
      intern = intern.toJSON();
      delete intern.unixname; // remove this redundant field
      return intern;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // updates intern bio
  static async putInternInfo(unixname, bio) {
    let intern = new Parse.Object('Intern');
    const query = new Parse.Query(intern);
    // search for matching unixname
    query.equalTo('unixname', unixname);
    try {
      // perform query
      [intern] = await query.find();
      intern.set('bio', bio);
      await intern.save();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = DB;
