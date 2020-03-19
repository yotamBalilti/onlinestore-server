const express = require('express');
const users = require('../controllers/users');
const products = require('../controllers/products');
const categories = require('../controllers/categories');
const authorization = require('./middlewares/authorization');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        const fileArr = file.originalname.split('.');
        cb(null, file.fieldname + Date.now() + '.' + fileArr[fileArr.length - 1]);
    }
});
const upload = multer({storage});

const apiRouter = express.Router();

apiRouter.get('/user', users.all);
apiRouter.put('/user', users.create);
apiRouter.post('/user/login', users.login);
apiRouter.get('/user/me',authorization ,users.me); //every request for me comes through authorization

apiRouter.get('/product', products.all);
apiRouter.get('/product/:id', products.getById);
apiRouter.put('/product', upload.single('image'), products.create);
apiRouter.post('/product/bulk', products.getByIds);

apiRouter.get('/category', categories.all);
apiRouter.get('/category/:id/product', categories.products);
apiRouter.put('/category', categories.create);


module.exports = apiRouter;