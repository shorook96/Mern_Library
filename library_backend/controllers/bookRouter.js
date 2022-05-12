const express = require('express');
const bookRouter = express.Router();
const customError = require('../utils/customError');
const bookModel = require('../models/bookModel');


bookRouter.delete("/:id",async (req, res,next) => {
    try {
        const id = req.params.id;
       await bookModel.deleteOne(
            {
                _id: id,
            },
            (err, output) => {
                if (!err) {
                    res.send(output);
                }
                else {
                    res.send(err);
                }
            }
        );
    } catch (err) {
        next(err);
    }
});

module.exports = authorRouter;