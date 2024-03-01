const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const signupController = async (req, res) => {
    const payload = req.body;
    try {
        if (payload.name && payload.email && payload.password && payload.age) {
            const isUserExist = await UserModel.findOne({ email: payload.email });
            if (!isUserExist) {
                const user = new UserModel({
                    ...payload
                });
                const userData = await user.save();
                const newUser = {
                    name: userData.name,
                    email: userData.email,
                    age: userData.age,
                    id: userData._id
                };
                const token = jwt.sign(newUser, 'PRIVATE_KEY', { expiresIn: '1h' });
                res.status(200)
                    .cookie('token', token, { secure: false, httpOnly: false })
                    .send({
                        isNewUserCreated: true,
                        user: newUser
                    });
            } else {
                res.status(400).send({
                    error: 'User already exist',
                });
            }
        } else {
            res.status(400).send({ error: 'Please enter all required fields' });
        }
    } catch (error) {
        res.status(200).send({
            error: 'Unexpected error in signup controller',
        });
    }
};

module.exports = signupController;