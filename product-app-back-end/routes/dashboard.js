const express = require('express');
const jwt = require('jsonwebtoken');
const dashboardController = require('../controllers/dashboard.controller');

const dashboardRouter = express.Router();

const verifyUser = (req, res, next) => {
    try {
        const token = req.headers['authorization'] || req.cookies.token;
        const user = jwt.verify(token, 'PRIVATE_KEY');
        if(user) {
            req.user = user;
            next();
        } else {
            res.status(400).send({
                error: 'Invalid token, Please logout and login again',
            });
        }
    } catch (error) {
        res.status(400).send({
            error: 'Invalid token, Please logout and login again',
            errorDescription: error
        });
    }
};

dashboardRouter.get('/', verifyUser, dashboardController);

module.exports = dashboardRouter;