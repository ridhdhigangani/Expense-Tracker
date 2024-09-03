const { createTrans, getAllTrans, updateTrans, deleteTrans } = require('../controller/TransCtrl');
const routes = require('express').Router();

routes.post('/createTrans',createTrans);
routes.post('/getAllTrans',getAllTrans);
routes.put('/updateTrans',updateTrans);
routes.post('/deleteTrans',deleteTrans);

module.exports = routes;
