require('dotenv').config();
const Parse = require('parse/node');

class DB {
  // **********************************************************************
  // CONSTRUCTOR (initializes DB connection)
  // **********************************************************************

  constructor() {
    Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JAVASCRIPT_KEY);
    Parse.serverURL = 'https://parseapi.back4app.com';
  }

  // **********************************************************************
  // HELPER FUNCTIONS
  // **********************************************************************

  // private helper method, gets user Parse object
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

  // private helper method, gets intern Parse object
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

  // private helper method, gets all interns besides specified user
  static async #getAllInterns(unixname) {
    // setup Parse query, search for all but matching unixname
    const intern = new Parse.Object('Intern');
    const query = new Parse.Query(intern);
    query.notEqualTo('unixname', unixname);
    try {
      // perform query
      const interns = await query.findAll();
      return interns.map((obj) => obj.toJSON());
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // private helper method, computes a similarity index of two interns
  static #computeSimilarity(i1, i2) {
    let score = 0.0;
    if (i1.startDate === i2.startDate) {
      score += 0.1;
    }
    if (i1.division === i2.division) {
      score += 0.2;
    }
    if (i1.college === i2.college) {
      score += 0.5;
    }
    // latitude and longitude distance calculation
    // bio string similarity
    return score + Math.random();
  }

  // **********************************************************************
  // MAIN METHODS
  // **********************************************************************

  // creates a hub user account
  static async createUserAccount(unixname, name, role, ssoInfo) {
    const hubUser = new Parse.Object('HubUser');
    hubUser.set('unixname', unixname);
    hubUser.set('name', name);
    hubUser.set('role', role);
    hubUser.set('ssoInfo', ssoInfo);
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

  // creates a file entry
  static async uploadFile(unixname, file) {
    try {
      // construct and save parse file object
      const fileData = { base64: file.buffer.toString('base64') };
      const parseFile = new Parse.File(file.originalname, fileData);
      const responseFile = await parseFile.save();
      // store file with owner in InternFile class
      const internFile = new Parse.Object('InternFile');
      internFile.set('owner', unixname);
      internFile.set('file', responseFile);
      await internFile.save();
      return 201;
    } catch (error) {
      console.error(error);
      return 500;
    }
  }

  // retrieves all hub user info
  static async getRankedInterns(unixname) {
    let user1 = await this.#getInternObject(unixname);
    user1 = user1.toJSON();
    const interns = await this.#getAllInterns(unixname);
    interns.forEach((user2) => { user2.score = this.#computeSimilarity(user1, user2); });
    interns.sort((a, b) => ((a.score > b.score) ? -1 : 1));
    return interns;
  }
}

module.exports = DB;
