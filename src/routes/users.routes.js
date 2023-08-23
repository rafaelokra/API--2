const { Router } = require('express');

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

const userscontroller = new UsersController();

usersRoutes.post('/', userscontroller.create);

module.exports = usersRoutes;