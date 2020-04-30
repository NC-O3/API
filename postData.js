const router = require('express').Router();
const roboInput = require('../Models/robotInput');
const {roboData} = require('../Validation/roboData');
const verify = require('../Token/verify');

router.post('/', verify, async (request, response) => {

    const {error} = roboData(request.body);
    if (error)
        response.status(400).send(error.details[0].message);

    const data = new roboInput({
        robotID: request.body.robotID,
        time: request.body.time
    });

    try{
        await data.save();
        response.send("Data sent!");
    }catch (e) {
        response.status(400).send(e);
    }
});

module.exports = router;