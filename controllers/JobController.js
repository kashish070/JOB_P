const CategoryModel = require("../models/category");
const JobModel = require("../models/jobs");
const cloudinary = require("cloudinary"); 

cloudinary.config({ 
    cloud_name: "den97mqgv", 
    api_key: "686633677163384", 
    api_secret: "m-iMN1c1WkJot8_8bNeEZRzatVE", 
  }); 

class JobController {
  static display = async (req, res) => {
    try {
     
    const { name, image, role,id } = req.data;
    const data = await JobModel.find({emp_id:id})
    const category=await CategoryModel.find()
      res.render("admin/employers/display",{
        re:data,
        cat:category,
        role:role,
        name:name,
        image:image
       
      })
    } catch (error) {
      console.log(error);
    }
  };
//   static jobinsert = async (req, res) => {
//     try {
//       //console.log('hello')
//      //console.log(req.body);
//      const file = req.files.image; 
//  //imageupload
//      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, { 
//        folder: "userprofile", 
//      }); 
      
//       const {
//         title,
//         category,
//         description,
//         Company,
//         location,
//         jobtype,
//         salary,
//         qualification,
//         vacancy,
//         postedDate,
//         closingDate 
//       } = req.body;
//       const result = new JobModel({
//         title: title,
//         category: category,
//         description: description,
//         company: Company,
//         location: location,
//         emloyment_type: jobtype,
//         salary: salary,
//         qualification: qualification,
//         vacancy: vacancy,
//         posted_date: postedDate,
//         closing_date: closingDate,
//         image: { 
//             public_id: imageUpload.public_id, 
//             url: imageUpload.secure_url, 
//           }, 
       
//      });
//       await result.save();
//       req.flash("successful");
//       res.redirect("/applyjob/display");
//     } catch (error) {
//       console.log(error);
//     }
//   };

  static jobinsert = async (req, res) => { 
    try { 
      console.log(req.body); 
      const { id } = req.data;
      const {  title,
        category,
        description,
        Company,
        location,
        emloyment_type,
        salary,
        qualification,
        vacancy,
        postedDate,
        required_skills,
        closingDate  } = req.body; 
      //console.log(req.body) 
      const file = req.files.image; 
      // console.log(req.body.name) 
      //image upload cloudinary 
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, { 
        folder: "userprofile", 
      }); 
      const result = new JobModel({ 
        title: title,
        category: category,
        description: description,
        Company: Company,
        location: location,
        emloyment_type: emloyment_type,
        salary: salary,
        qualification: qualification,
        vacancy: vacancy,
        required_skills:required_skills,
        posted_date: postedDate,
        closing_date: closingDate,
        image: { 
            public_id: imageUpload.public_id, 
            url: imageUpload.secure_url, 
          }, 
        emp_id :id  
      }); 
      //console.log(result) 
      await result.save(); 
      res.redirect("/employers/job/display"); 
    } catch (error) { 
      console.log(error); 
    } 
  };
  
  static jobdelete = async (req, res) => {
    try {
      await JobModel.findByIdAndDelete(req.params.id);
      res.redirect("/employers/job/display");
    } catch (error) {
      console.log(error);
    }
  };
}



module.exports = JobController;
