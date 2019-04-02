const mongoose=require('mongoose')
const articleSchema=new mongoose.Schema({
    Article_title: {
        type: String,
        required:true
    },
    Article_content: {
        type: String,
        required:true

    },
    Article_topic: {
        type: String

    },
    Author_name: {
        type: String
    },
    Article_picture: {
        type: String
    },
    Article_date:
    {
        type:String
    },
    Article_views:
    {
        type:Number
    }

},{timestamps:true})
const posts = mongoose.model('posts', articleSchema)


module.exports=posts