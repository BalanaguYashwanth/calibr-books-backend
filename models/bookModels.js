const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please add the title'],
    },
    author:{
        type:String,
        required:[true,'Please add the author']
    },
    publicationYear:{
        type:Number,
        required:[true,'Please add the publication']
    },
    isbn:{
        type:String,
        required:[true,'Please add the isbn']
    },
    description:{
        type:String,
        required:[true,'Please add the description']
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Books', bookSchema)