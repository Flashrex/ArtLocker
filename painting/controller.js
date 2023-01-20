const model = require('./model');
const viewPage = require('./pages/view');
const formPage = require('./pages/form');
const paintingPage = require('./pages/painting');
const fs = require('fs');
const userModel = require('../user/model');

function listAction(request, response) {
  
  model.getAll().then(
    paintings => {

      const isLoggedIn = request.session.passport !== undefined;

      const userData = {
        isLoggedIn: isLoggedIn,
        id: isLoggedIn ? request.session.passport.user : -1,
        avatar: undefined
      }

      if(isLoggedIn) {
        userModel.get( { id: userData.id} ).then(
          user => {
            userData.avatar = user.avatar;
            response.send(viewPage(paintings, userData));
          }
        )
      } else {
        response.send(viewPage(paintings, userData));
      }
    },
    error => response.send(error)
  );
}

function listSingleAction(request, response) {
  const id = parseInt(request.params.id, 10);

  model
    .get(id)
    .then(
      painting => {
        console.log(painting);
        const isLoggedIn = request.session.passport !== undefined;

        const userData = {
          isLoggedIn: isLoggedIn,
          id: isLoggedIn ? request.session.passport.user : -1,
          avatar: undefined
        }

        if(isLoggedIn) {
          userModel.get( { id: userData.id} ).then(
            user => {
              userData.avatar = user.avatar;
              response.send(paintingPage(painting, userData));
            }
          )
        } else {
          response.send(paintingPage(painting, userData));
        }

        //update views
        painting.views++;

        model.save(painting);

      },
      error => response.send(error)
    );
}

function deleteAction(request, response) {
  const id = parseInt(request.params.id, 10);
  
  //delete image
  model
    .get(id)
    .then(
      painting => {
        fs.rm(`public/images/${painting.image}`, function() {
          console.log("file deleted");
        });
      }
    );
  
  //delete database entry
  model
    .delete(id)
    .then(
      () => response.redirect(request.baseUrl),
      error => response.send(error),
    );
}

function formAction(request, response) {
  let painting = { id: '', title: '', description: '', author: '', price: 0.0, image: '', favs: 0, views: 0 };

  const isLoggedIn = request.session.passport !== undefined;

  const userData = {
    isLoggedIn: isLoggedIn,
    id: isLoggedIn ? request.session.passport.user : -1,
    avatar: undefined
  }

  if(isLoggedIn) {
    userModel.get( { id: userData.id} ).then(
      user => {
        userData.avatar = user.avatar;

        if (request.params.id) {
          model
            .get(parseInt(request.params.id, 10))
            .then(painting => {
              response.send(formPage(painting, userData)), error => response.send(error)
            });
        } else {
          const body = formPage(painting, userData);
          response.send(body);
        }
      }
    )
  }
  else {
    if (request.params.id) {
      model
        .get(parseInt(request.params.id, 10))
        .then(painting => {
          response.send(formPage(painting, userData)), error => response.send(error)
        });
    } else {
      const body = formPage(painting, userData);
      response.send(body);
    }
  }
}

function saveAction(request, response) {
    
    //rename the uploaded file
    const date = new Date();
    const filename = `${request.body.title}${date.getTime()}.png`;

    fs.rename(request.file.path, 'public/images/' + filename, function() {
        console.log("file renamed");
    });

    //delete temporary file
    fs.rm(request.file.path, function() {
        console.log("deleted temp file");
    })

    //make sure price has a correct value
    const price = parseFloat(request.body.price);
    if(isNaN(price)) {
        response.status(400).send("Error: Ungültiger Preis");
        return;
    }

    //save new painting to database
    const creation = date.toJSON().slice(0, 19).replace('T', ' ');

    let painting = {
      id: request.body.id,
      title: request.body.title,
      description: request.body.description,
      author: 0,
      price: price,
      image: filename,
      createdAt: creation
    };

    const userid = request.session.passport.user;
    userModel.get({ id: userid }).then(
      user => {
        if (!user) {
          response.send("Fehler beim Laden des Users von der Datenbank.")
          return;
        }

        painting.author = user.id;

        model.save(painting).then(
          () => {
          response.redirect(request.baseUrl);
          },
          error => {
          response.send(error);
          },
      );

      },
      err => response.send(err),
    );
}

module.exports = {
  listAction,
  listSingleAction,
  deleteAction,
  formAction,
  saveAction,
};