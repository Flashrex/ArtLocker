const database = require('../database');
const connection = database.connection;

function get(queryData = {}) {
  return new Promise((resolve, reject) => {
    let queryElements = [];
    if (queryData) {
      for (let key in queryData) {
        queryElements.push(`${key} = ?`);
      }
    }
    
    const queryString = 'SELECT * FROM users WHERE ' + queryElements.join(' AND ');
    connection.query(queryString, Object.values(queryData), (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

function insert(user) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO Users (username, firstname, surname, email, password) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, 
        [user.username, user.firstname, user.surname, user.email, user.password], 
        (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        }
    );
  });
}

function update(user) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE Users SET username = ?, firstname = ?, surname = ?, email = ?, password = ?, avatar = ? WHERE id = ?';
    connection.query(
      query,
      [user.username, user.firstname, user.surname, user.email, user.password, user.avatar, user.id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
}

module.exports = {
  get,
  save(user) {
    if (!user.id) {
      return insert(user);
    } else {
      return update(user);
    }
  }
};