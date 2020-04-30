const jsonWebToken = require('jsonwebtoken');

module.exports = function (request, response, next){

    const token = request.header('authentication-token');

    if (!token)
        response.status(400).send("Access denied!");

    try{
        const verified = jsonWebToken.verify(token, process.env.secrettoken);
        request.user = verified;
        next();
    }catch (e) {
        response.status(400).send("Invalid token!");
    }
};