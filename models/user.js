const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    company_name:{
        type:String
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
    token: {
        type: String
    },
    is_verified: {
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






const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel
