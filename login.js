const hapiJoi = require('@hapi/joi');


const login = data => {
    const analyse = hapiJoi.object({
        email: hapiJoi.string()
            .required()
            .email(),
        password: hapiJoi.string()
            .required()
            .min(6)
    });

    return analyse.validate(data);

}

module.exports.validationLogin = login;