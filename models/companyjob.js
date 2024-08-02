const mongoose= require("mongoose")
const CompanyJobSchema= mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    companyname: {
        type: String,
        require: true,
    },
    jobtitle: {
        type: String,
        require: true,
    },
    website: {
        type: String,
        require: true,
    },
    coverletter: {
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
    status:{
        type: String,
        default:"Pending"

    },
    message:{
        type: String,
        default:"Pending"

    },
    user_id:{
        type: String,
        default:"Pending"

    },
    emp_id:{
        type: String,
        

    }
  
    
},{
    timestamps: true,
}
)


const CompanyJobModel = mongoose.model('companyjob', CompanyJobSchema)
module.exports =  CompanyJobModel;





