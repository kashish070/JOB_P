const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
   
    image: {
        public_id: {
            type: String,
            require: true
        },
    url: {
        type: String,
        require: true
    }
    },
    
    is_active: {
        type: Number,
        default: 0
    },
    role:{
        type:String,
        require:true,
        

    }
},{
    timestamps: true,
}
)


const CategoryModel = mongoose.model('category', CategorySchema)
module.exports = CategoryModel
