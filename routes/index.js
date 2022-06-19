const express = require("express");
const controllers = require("../controllers");
const router = express.Router();
const { check, body, validationResult } = require('express-validator');

router.get("/", (req, res) => {
    res.json({ message: "Test Json... Yah! we are good to go" });
});

router.route("/search")
    .get(controllers.getSavedSearch)
    .post(
        [
            body('key', 'Key is required').exists(),
            body('data', 'List data is required').exists().custom(value => {
                return Array.isArray(value);
            })
        ],
        controllers.computation
    );

router
    .route("search/:id")
    .delete(controllers.deleteSearch);
module.exports = router;