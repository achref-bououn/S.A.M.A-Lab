const mysql = require("mysql");
const mysqlConfig = require("./config.js");

const connection = mysql.createConnection(mysqlConfig);

const getUserId = function(username){
  return new Promise((resolve,reject)=>{
    connection.query(`select id from users where username='${username}'`,(e,result)=>{
      if(e){
        console.log(e)
        reject(e);
      }
      resolve(result);
    })
  })
}

/***** crud operations for organisations table *****/
const createOrganization = function (userID, name, description) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO organizations set ?`,
      { name, description, userID },
      (e, result) => {
        if (e) {
          console.log(e);
          return reject();
        }
        resolve(result);
      }
    );
  });
};

const getOrganization = function (userID) {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from organizations where userID=${userID}`,
      (e, result) => {
        if (e) {
          console.log(e);
          return reject();
        }
        resolve(result);
      }
    );
  });
};

const deleteOrganisation = function (userID, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `delete from organizations where userID=${userID} and id=${id}`,
      (e, result) => {
        if (e) {
          console.log(e);
          return reject();
        }
        resolve(result);
      }
    );
  });
};

const updateOrgenazation = function (id, name, description, userID) {
  return new Promise((resolve, reject) => {
    connection.query(
      `update organizations set name=${name},description=${description} where id=${id} and userID=${userID} `,
      (e, result) => {
        if (e) {
          console.log(e);
          return reject();
        }
        resolve(result);
      }
    );
  });
};


const getOrgproject = function (organizationID) {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from organizations where organizationID=${organizationID}`,
      (e, result) => {
        if (e) {
          console.log(e);
          return reject();
        }
        resolve(result);
      }
    );
  });
};

const getUserproject = function (userID) {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from organizations where user_id=${userID}`,
      (e, result) => {
        if (e) {
          console.log(e);
          return reject();
        }
        resolve(result);
      }
    );
  });
};

const deleteProject = function (organizationID, id) {

/**
 * get all projects by org id by user id
 */
const getOrgProjects = function (orgId, userId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from projects where organizationID=${orgId} and userID = ${userId}`,
      (e, result) => {
        if (e) {
          console.log(e);
          return reject();
        }
        resolve(result);
      }
    );
  });
};

const updateProject = function (id, name, description, organizationID) {
  return new Promise((resolve, reject) => {
    connection.query(
      `update projects set name=${name},description=${description} where id=${id} and organizationID=${organizationID} `,
      (e, result) => {
        if (e) {
          console.log(e);
          return reject();
        }
        resolve(result);
      }
    );
  });
};
/***** getting a user messages *****/
const getMessages = function (userID) {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from messages where recieverID=${userID}`,
      (e, result) => {
        if (e) {
          console.log(e);
          return reject();
        }
        resolve(result);
      }
    );
  });
};

/***** displaying the connection to the database *****/
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
}
module.exports = {
  connection,
  createOrganization,
  getOrganization,
  deleteOrganisation,
  updateOrgenazation,
  /* just to clarify */
  getUserproject,
  getOrgproject,
  deleteProject,
  /* just to clarify */
  getUserId
};
