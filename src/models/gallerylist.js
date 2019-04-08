const mongoose=require('mongoose')
const GalleryListSchema=new mongoose.Schema({
    Gallery_Title: {
        type: String,
        required:true
    },
    About_Gallery: {
        type: String,
        required:true

    },
    Pictures_number: {
        type: String,
        required:true
    },
    Gallery_place:{
        type:String
    }

},{timestamps:true})
const gallerylist = mongoose.model('gallerylist', GalleryListSchema)


module.exports=gallerylist