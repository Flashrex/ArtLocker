const database = require('./../database');
const connection = database.connection;


function getAll() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT p.*, u.username FROM Paintings p LEFT JOIN Users u ON (p.author=u.id)';
    
    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function getAllByAuthorId(authorId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT p.*, u.username FROM Paintings p LEFT JOIN Users u ON (p.author=u.id) WHERE p.author = ?';

    connection.query(query, [authorId], (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function getOne(id) {
  return new Promise((resolve, reject) => {
    
    const query = 'SELECT u.*, p.* FROM Paintings p LEFT JOIN Users u ON (p.author=u.id) WHERE p.id = ?';
    
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

function insert(painting) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO Paintings (title, description, author, price, image, createdAt) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, 
        [painting.title, painting.description, painting.author, painting.price, painting.image, painting.createdAt], 
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

function update(painting) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE Paintings SET title = ?, description = ?, author = ?, price = ?, image = ?, favs = ?, views = ? WHERE id = ?';
    connection.query(
      query,
      [painting.title, painting.description, painting.author, painting.price, painting.image, painting.favs, painting.views, painting.id],
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

function remove(id) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM Paintings WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

module.exports = {
  getAll,
  getAllByAuthorId,
  get(id) {
    return getOne(id);
  },
  delete(id) {
    return remove(id);
  },
  save(painting) {
    if (!painting.id) {
      return insert(painting);
    } else {
      return update(painting);
    }
  },
};