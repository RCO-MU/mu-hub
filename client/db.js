require('dotenv').config();
const Parse = require('parse/node');
const stringSimilarity = require('string-similarity');

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
  static async #getUserObject(unixname, toJSON) {
    // setup Parse query, search for matching unixname
    let user = new Parse.Object('HubUser');
    const query = new Parse.Query(user);
    query.equalTo('unixname', unixname);
    try {
      // perform query
      [user] = await query.find();
      return toJSON ? user.toJSON() : user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // private helper method, gets intern Parse object
  static async #getInternObject(unixname, toJSON) {
    // setup Parse query, search for matching unixname
    let intern = new Parse.Object('Intern');
    const query = new Parse.Query(intern);
    query.equalTo('unixname', unixname);
    try {
      // perform query
      [intern] = await query.find();
      return intern ? (toJSON ? intern.toJSON() : intern) : null;
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

  // distance between two pairs of latitude and longitude
  static #distance(lat1, lat2, lon1, lon2) {
    lon1 *= (Math.PI / 180);
    lon2 *= (Math.PI / 180);
    lat1 *= (Math.PI / 180);
    lat2 *= (Math.PI / 180);
    // Haversine formula
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a = Math.sin(dlat / 2) ** 2
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));
    const r = 3956; // radius of earth in miles
    return (c * r);
  }

  // private helper method, computes a similarity index of two interns
  static #computeSimilarity(i1, i2) {
    let score = 0.0;
    // start date
    if (i1.startDate === i2.startDate) {
      score += 0.2;
    }
    // division
    if (i1.division === i2.division) {
      score += 0.3;
    }
    // college
    if (i1.college === i2.college) {
      score += 0.5;
    }
    // residence proximity (added to score if within 5 miles)
    const res1 = i1.residence;
    const res2 = i2.residence;
    const distance = this.#distance(res1.latitude, res2.latitude, res1.longitude, res2.longitude);
    score += Math.max(0.0, (1.0 - distance / 5.0));
    // bio similarity (scored 0 - 1) as long as neither bio is blank
    if (i1.bio !== '' && i2.bio !== '') {
      score += stringSimilarity.compareTwoStrings(i1.bio, i2.bio);
    }
    return score;
  }

  static #announcementVisible(a, userInfo) {
    a = a.toJSON();
    if (a.role && a.role !== userInfo.user.role) {
      return false;
    }
    if (a.startDate && a.startDate !== userInfo.intern.startDate) {
      return false;
    }
    if (a.division && a.division !== userInfo.intern.division) {
      return false;
    }
    if (a.residence && a.residence.name !== userInfo.intern.residence.name) {
      return false;
    }
    if (a.college && a.college !== userInfo.intern.college) {
      return false;
    }
    return true;
  }

  static async #getUsersAnnouncements(unixname) {
    const announcement = new Parse.Object('Announcements');
    const query = new Parse.Query(announcement);
    query.equalTo('posterInfo.unixname', unixname);
    try {
      // perform query
      const announcements = await query.find();
      return announcements;
    } catch (error) {
      console.error(error);
      return null;
    }
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
    const user = await this.#getUserObject(unixname, true);
    let intern = null;
    // also retrieve intern info if needed
    if (user.role === 'intern') {
      intern = await this.#getInternObject(unixname, true);
      if (intern) {
        delete intern.unixname;
      } // remove redundant field
    }
    delete user.unixname; // remove redundant field
    return {
      unixname,
      user,
      intern,
    };
  }

  // updates intern bio
  static async putInternInfo(unixname, bio) {
    const intern = await this.#getInternObject(unixname, false);
    intern.set('bio', bio);
    try {
      await intern.save();
    } catch (error) {
      console.error(error);
    }
  }

  // deletes user and all associated data from database
  static async deleteUser(unixname) {
    const user = await this.#getUserObject(unixname, false);
    try {
      await user.destroy();
      // also delete intern information
      if (user.get('role') === 'intern') {
        const intern = await this.#getInternObject(unixname, false);
        await intern.destroy();
        const files = await this.getFiles(unixname, false);
        await files.forEach((file) => file.destroy());
      }
      const announcements = await this.#getUsersAnnouncements(unixname);
      await announcements.forEach((a) => a.destroy());
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

  // creates a file entry
  static async getFiles(unixname, toJSON) {
    const internFile = new Parse.Object('InternFile');
    const query = new Parse.Query(internFile);
    query.equalTo('owner', unixname);
    try {
      // perform query
      const files = await query.findAll();
      return toJSON ? files.map((obj) => obj.toJSON()) : files;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // retrieves all hub user info
  static async getRankedInterns(unixname) {
    const user1 = await this.#getInternObject(unixname, true);
    const interns = await this.#getAllInterns(unixname);
    // add similarity score and name to each intern
    await Promise.all(interns.map(async (user2) => {
      user2.score = this.#computeSimilarity(user1, user2);
      const obj = await this.#getUserObject(user2.unixname, true);
      user2.name = obj.name;
      user2.ssoInfo = obj.ssoInfo;
    }));
    // sort the list by similarity score
    interns.sort((a, b) => ((a.score > b.score) ? -1 : 1));
    return interns;
  }

  // gets announcements related to user
  static async getAnnouncements(unixname) {
    const announcement = new Parse.Object('Announcements');
    const query = new Parse.Query(announcement);
    query.addDescending('updatedAt');
    try {
      // perform query
      let announcements = await query.find();
      const userInfo = await this.getUserInfo(unixname);
      // filter if intern
      if (userInfo.user.role === 'intern') {
        announcements = announcements.filter((a) => this.#announcementVisible(a, userInfo));
      }
      return announcements.map((obj) => obj.toJSON());
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // gets announcements related to user
  static async postAnnouncement(announcement) {
    const aObj = new Parse.Object('Announcements');
    aObj.set('posterInfo', announcement.posterInfo);
    aObj.set('title', announcement.title);
    aObj.set('content', announcement.content);
    aObj.set('attachment', announcement.attachment);
    aObj.set('startDate', announcement.startDate);
    aObj.set('division', announcement.division);
    aObj.set('residence', announcement.residence);
    aObj.set('college', announcement.college);
    aObj.set('role', announcement.role);
    try {
      await aObj.save();
      return 201;
    } catch (error) {
      console.error(error);
      return 500;
    }
  }
}

module.exports = DB;
