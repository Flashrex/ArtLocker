const Router = require('express').Router;
const multer = require('multer');
const upload = multer({ dest: 'public/images/'});

const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const {
  listAction,
  deleteAction,
  formAction,
  saveAction,
} = require('./controller');

const router = Router();

router.get('/', listAction);
router.get('/delete/:id', ensureLoggedIn('/login'), deleteAction);
router.get('/form/:id?', ensureLoggedIn('/login'), formAction);
router.post('/save', ensureLoggedIn('/login'), upload.single("upload"),  saveAction);

module.exports = router;