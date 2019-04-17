const mongoose=require('mongoose')
const PrimComSchema=new mongoose.Schema({
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
const PrimComment = mongoose.model('PrimComment', PrimComSchema)


module.exports=PrimComment