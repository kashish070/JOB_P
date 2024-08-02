const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category:{type:String,required:true},
  description: { type: String,required:true},
  Company: { type: String,required:true },
  location: { type: String,required:true },
  emloyment_type: { type: String,required:true }, // Full-time, Part-time, Contract, etc.
  vacancy: { type: String ,required:true},
  required_skills: { type: String,required:true },
  salary: { type: String ,required:true},
  qualification: { type: String,required:true },
  posted_date: { type: Date, default: Date.now },
  closing_date: { type: Date,required:true },
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
emp_id:{
    type:String,
    require:true,
    

}

});

const JobModel = mongoose.model("jobs", JobSchema);
module.exports = JobModel;
