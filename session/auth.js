const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');

const login = require('./login');
const register = require('./register');

const userModel = require('../user/model');

module.exports = app => {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    
    userModel.get({ id }).then(
      user => {
        if (!user) {
          done('user nicht gefunden');
        }
        done(null, user);
      },
      err => done(err),
    );
  });

  app.use(
    expressSession({
      secret: 'top secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login', (req, res) => {
    if(req.user) res.redirect('/');
    else res.send(login());
  })

  app.post(
    '/login',
    passport.authenticate('local-login', { 
      successRedirect: '/',
      failureRedirect: '/login.html' 
    })
  );

  passport.use('local-login',
    new LocalStrategy((username, password, done) => {
      const hash = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');
      userModel.get({ username, password: hash }).then(
        user => {
          if (!user) {
            return done('user not found');
          }
          return done(null, user);
        },
        error => done(error),
      );
    }),
  );


  app.get('/register', (req, res) => {
    if(req.user) res.redirect('/');
    else res.send(register());
  })

  app.post(
    '/register',
    passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/register.html'
    })
  );

  passport.use('local-signup',
    new LocalStrategy({ passReqToCallback: true }, 
      function(req, email, password, done) {
        userModel.get({ email }).then(
          user => {
            if(user) {
              done('email bereits vergeben.');
            }
            
            const hash = crypto
                .createHash('sha256')
                .update(password)
                .digest('hex');

              const newUser = {
                username: req.body.nickname,
                firstname: req.body.vorname,
                surname: req.body.nachname,
                email: email, 
                password: hash
              }

              //register user
              userModel.save(newUser).then(
                newUserId => {
                  console.log(newUserId);
                  newUser.id = newUserId.insertId;
                  return done(null, newUser);
                },
                error => {
                  return done(error);
                },
              )
          },
          error => done(error),
        );
    })
  );

  app.get('/logout', (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
};