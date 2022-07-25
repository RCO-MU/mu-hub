const Parse = require('parse/node');
const config = require('./config');

class DB {
  // **********************************************************************
  // CONSTRUCTOR (initializes DB connection)
  // **********************************************************************

  constructor() {
    Parse.initialize(config.PARSE_APP_ID, config.PARSE_JAVASCRIPT_KEY);
    Parse.serverURL = 'https://parseapi.back4app.com';
  }

  // **********************************************************************
  // HELPER FUNCTIONS
  // **********************************************************************

  // private helper method for getUserInfo, gets user Parse object
  static async #getUserObject(unixname) {
    // setup Parse query, search for matching unixname
    let user = new Parse.Object('HubUser');
    const query = new Parse.Query(user);
    query.equalTo('unixname', unixname);
    try {
      // perform query
      [user] = await query.find();
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // private helper method for getUserInfo, gets intern Parse object
  static async #getInternObject(unixname) {
    // setup Parse query, search for matching unixname
    let intern = new Parse.Object('Intern');
    const query = new Parse.Query(intern);
    query.equalTo('unixname', unixname);
    try {
      // perform query
      [intern] = await query.find();
      return intern;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // **********************************************************************
  // MAIN METHODS
  // **********************************************************************

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

  // retrieves all hub user info
  static async getUserInfo(unixname) {
    let user = await this.#getUserObject(unixname);
    let intern = null;
    // also retrieve intern info if needed
    if (user.get('role') === 'intern') {
      intern = await this.#getInternObject(unixname);
      if (intern) {
        intern = intern.toJSON();
        delete intern.unixname; // remove redundant field
      }
    }
    user = user.toJSON();
    delete user.unixname; // remove redundant field
    return {
      unixname,
      user,
      intern,
    };
  }

  // updates intern bio
  static async putInternInfo(unixname, bio) {
    const intern = await this.#getInternObject(unixname);
    intern.set('bio', bio);
    try {
      await intern.save();
    } catch (error) {
      console.error(error);
    }
  }

  // deletes user from database
  static async deleteUser(unixname) {
    const user = await this.#getUserObject(unixname);
    try {
      await user.destroy();
      if (user.get('role') === 'intern') {
        const intern = await this.#getInternObject(unixname);
        await intern.destroy();
      }
    } catch (error) {
      console.error(error);
    }
    return { user };
  }
}

module.exports = DB;
