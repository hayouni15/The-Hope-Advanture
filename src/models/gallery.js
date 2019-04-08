const mongoose=require('mongoose')
const GallerySchema=new mongoose.Schema({
    Gallery_Title: {
        type: String,
        required:true
    },
    Gallery_place: {
        type: String,
        required:true

    },
    Picture_name: {
        type: String,
        required:true
    }

},{timestamps:true})
const gallery = mongoose.model('gallery', GallerySchema)


module.exports=gallery