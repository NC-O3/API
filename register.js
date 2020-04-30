const hapiJoi = require('@hapi/joi');


const register = data => {
    const analyse = hapiJoi.object({
        email: hapiJoi.string()
            .required()
            .email(),
        name: hapiJoi.string()
            .required()
            .min(4)
            .max(20),
        password: hapiJoi.string()
            .required()
            .min(6)
    });

    return analyse.validate(data);

}

module.exports.validationRegister = register;