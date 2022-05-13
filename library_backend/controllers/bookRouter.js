const express = require('express');
const bookRouter = express.Router();

const bookModel = require('../models/bookModel');
const customError = require('../utils/customError');





bookRouter.post('/', async (req, res, next) => {
    const bookData = req.body;
    console.log(bookData);
    try{
        await bookModel.create(bookData);
        console.log("Success");
        res.send({success: 'book created successfully'});
        return;
    }catch(error){
        next(error);
    }
})

bookRouter.patch('/:id', async (req, res, next) => {
    let _id = req.params.id;
    const newBookData = req.body;
    try{
        const exists = await bookModel.findById({_id});
        if(!exists){
            throw customError(400, 'NOT_FOUND', 'No such Book');
        }
        await bookModel.findByIdAndUpdate({_id}, newBookData);
        res.send({success: 'book updated successfully'});
    }catch(error){
        next(error);
    }
})


module.exports = bookRouter;