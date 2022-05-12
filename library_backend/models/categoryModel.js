const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    }, 
    categoryName: String 
});
const categoryModel = mongoose.model('category', categorySchema);
module.exports = categoryModel;
