const express = require('express');
const bookRouter = express.Router();
const customError = require('../utils/customError');
const bookModel = require('../models/bookModel');



bookRouter.get('/', async (req, res, next) => {
    try {
        const books = await bookModel.find({});
        res.send(books);
    } catch (err) {
        console.log(err);
        next(customError(522, 'Server_Error', 'something went wrong'));
    }
});

bookRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await bookModel.findById(id);
        if (!book) throw customError(422, 'ID_NOT_FOUND', 'NO_SUCH_BOOK');
        res.send(book);
    } catch (err) {
        next(err);
    }
});



bookRouter.delete("/:id", async (req, res, next) => {
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

module.exports = bookRouter;