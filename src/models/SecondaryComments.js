const mongoose=require('mongoose')
const SecComSchema=new mongoose.Schema({
    Comment_author: {
        type: String,
        required:true
    },
    Comment_content: {
        type: String,
        required:true

    },
    Comment_of: {
        type: String,
        required:true
    }

},{timestamps:true})
const SecComment = mongoose.model('SecComment', SecComSchema)


module.exports=SecComment