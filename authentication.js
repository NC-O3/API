const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const user = require('../Models/user');
const {validationRegister} = require('../Validation/register');
const {validationLogin} = require('../Validation/login');

router.post('/register', async (request, response) => {

    const {error} = validationRegister(request.body);
    if (error)
        {
            response.status(400).send(error.details[0].message);
            return 0;
        }

    const exists = await user.findOne({email: request.body.email});
    if (exists)
        {
            response.status(400).send("Email already registered!");
            return 0;
        }

    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(request.body.password, salt);

    const saveUser = new user({
        email: request.body.email,
        name: request.body.name,
        password: hash
    });

    try {
        const save = await saveUser.save();
        response.send("User registered!");
    }catch (e) {
        response.status(400).send(e);
    }


});

router.post('/login', async (request, response) => {

    const {error} = validationLogin(request.body);
    if (error)
        {
            response.status(400).send(error.details[0].message);
            return 0;
        }

    const exists = await user.findOne({email: request.body.email});
    if (!exists)
        {
            response.status(400).send("This email is not registered!");
            return 0;
        }

    const passwordValidity = bcrypt.compare(request.body.password, exists.password);
    if (!passwordValidity)
        {
            response.status(400).send("Password or Email is wrong!");
            return 0;
        }

    const token = jsonWebToken.sign({_id: exists._id}, process.env.secrettoken);
    response.header('authentication-token', token).send(token);

});

module.exports = router;