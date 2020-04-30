const hapiJoi = require('@hapi/joi');

const roboData = data => {
    const analyse = hapiJoi.object({
        robotID: hapiJoi.string()
            .required(),
        time: hapiJoi.string()
            .required()
    });

    return analyse.validate(data);

}

module.exports.roboData = roboData;