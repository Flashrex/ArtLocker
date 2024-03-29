const model = require('./model');
const fs = require('fs');
const crypto = require('crypto');

const userModel = require('./model');
const paintingModel = require('../painting/model');

const view = require('./pages/view');
const form = require('./pages/settings');

const { log } = require('../logger');

function listAction(request, response) {
    const profileid = parseInt(request.params.id, 10);
    
    const localUserId = request.session.passport.user;

    if(localUserId) {
      userModel.get( { id: localUserId }).then (
        localUser => {

          //set values for dynamic page rendering
          localUser.isLoggedIn = true;
          localUser.isProfileOwner = localUserId == profileid;

          //get data from profile owner
          userModel.get( { id: profileid }).then (
            user => {
                if(!user) {
                    response.send("Konnte Profil nicht finden.");
                    return;
                }
    
                //abfragen der bilder des profilbesitzer
                paintingModel.getAllByAuthorId(user.id).then(
    
                    paintings => {
                        if(!paintings) {
                            response.send("Fehler beim Laden der Bilder.");
                            return;
                        }
    
                        //user ist profilbesitzer
                        user.paintings = paintings;
    
                        response.send(view(user, localUser));
                    }
                )
            },
            err => response.send(err),
        )
        }
      )
    }
}

/*function deleteAction(request, response) {
  const id = parseInt(request.params.id, 10);
  model
    .delete(id)
    .then(
      () => response.redirect(request.baseUrl),
      error => response.send(error),
    );
}*/

function formAction(request, response) {
  const id = parseInt(request.params.id, 10);
  let user = { id: '', username: '', email: '', firstname: '', surname: '', password: '', avatar: '' };

  const localUser = {
    isLoggedIn: request.session.passport !== undefined,
    id: request.session.passport.user
  }

  if (request.params.id) {
    userModel
      .get({ id })
      .then(user => {
        response.send(form(user, localUser)), error => response.send(error)
      });
  } else {
    const body = form(user, localUser);
    response.send(body);
  }
}

function saveAction(request, response) {
    //get current userdata
    const userid = request.session.passport.user;
    userModel.get({ id: userid }).then(
      user => {
        if (!user) {
          response.send("Failed to get user from database.")
          return;
        }

        if(request.file) {
          //avatar uploaded

          //delete old avatar
          fs.rm(`public/avatars/${user.avatar}`, function() {
            log("UserController", `Deleted User Avatar [UserId: ${userid}]`, "info")
          })

          const date = new Date();
          const filename = `${user.username}${date.getTime()}.png`;

          fs.rename(request.file.path, 'public/avatars/' + filename, function() {
            log("UserController", `Renamed Avatar File [UserId: ${userid}]`, "info")
          });

          //delete temporary file
          fs.rm(request.file.path, function() {
            log("UserController", `Deleted temporary Avatar file`, "info")
          });

          user.avatar = filename;
        }

        if(request.body.username) {
          //username changed
          user.username = request.body.username;
        }

        if(request.body.email) {
          //email changed
          user.email = request.body.email;
        }

        if(request.body.password) {
          //password changed
          const hash = crypto
            .createHash('sha256')
            .update(request.body.password)
            .digest('hex');
          user.password = hash;
        }

        if(request.body.firstname) {
          //firstname changed
          user.firstname = request.body.firstname;
        }

        if(request.body.surname) {
          //surname changed
          user.surname = request.body.surname;
        }

        userModel.save(user).then(
          () => {
            response.redirect(`/user/profile/${user.id}`);
            },
            error => {
            response.send(error);
            }
        )
      },
      err => response.send(err),
    );
}

module.exports = {
  listAction,
  //deleteAction,
  formAction,
  saveAction,
};