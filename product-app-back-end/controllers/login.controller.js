const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const loginController = async (req, res) => {
    const payload = req.body;
    try {
        if (payload.email && payload.password) {
            const userData = await UserModel.findOne({ email: payload.email, password: payload.password });
            if (userData) {
                const userDetails = {
                    name: userData.name,
                    email: userData.email,
                    age: userData.age,
                    id: userData._id
                };
                const token = jwt.sign(userDetails, 'PRIVATE_KEY', { expiresIn: '10h' });
                res.status(200)
                    .cookie('token', token, { secure: false, httpOnly: false })
                    .send({
                        user: userDetails,
                    });
            } else {
                res.status(400).send({ error: 'Please enter valid credentials' });
            }
        } else {
            res.status(400).send({ error: 'Please enter all required fields' });
        }
    } catch (error) {
        res.status(200).send({
            error: 'Unexpected error in login controller',
            errorDescription: error
        });
    }
};

module.exports = loginController;