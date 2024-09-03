const routes = require('express').Router();
const { creteUser, getUser, getAllUser } = require('../controller/UserCtrl');

routes.post('/createUser',creteUser)
routes.post('/getUser',getUser)
routes.get('/getAllUser',getAllUser)

module.exports = routes