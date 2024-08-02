const CompanyJobModel = require("../models/companyjob");
const JobModel = require("../models/jobs");
const UserModel = require("../models/user");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "den97mqgv",
  api_key: "686633677163384",
  api_secret: "m-iMN1c1WkJot8_8bNeEZRzatVE",
});

class AdminController {
  static dashboard = async (req, res) => {
    const { name, image, role } = req.data;
    const data = await UserModel.find();
    try {
      res.render("admin/dashboard", {
        name: name,
        image: image,
        d: data,
        role: role,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static adminprofile = async (req, res) => {
    try {
      const { name, image, role,email } = req.data;
      const detail = await UserModel.find();
      res.render("admin/profile/adminprofile", { d: detail,name:name,image:image,role:role,email:email });
    } catch (error) {
      console.log(error);
    }
  };
  static updateprofile = async (req, res) => {
    try {
      const { id, name, image, role } = req.data;
      if (req.files) {
        const user = await UserModel.findById(id);

        //img update
        const imagefile = req.file.image(imageId);
        const imageUpload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "userprofile",
          }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageUpload.public_id,
            url: imageUpload.secure_url,
            role: role,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await UserModel.findByIdUpdate(id, data);
      req.flash("success", "Update profile Successfully");
      res.redirect("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  //list of employeer in admin dashboard

  static Employers=async(req,res)=>{
    try{
      const{name,email,image,id,role}=req.data;
      const employers=await UserModel.find({role:"Employers"})
      res.render("admin/employers",{
        name:name,
        email:email,
        image:image,
        id:id,
        role:role,
        e:employers
      })
    }catch(error){
      console.log(error)
    }
  }

//list of job seeker in admin dashboard
  static Jobseeker=async(req,res)=>{
    try{
      const{name,email,image,id,role}=req.data;
      const employers=await UserModel.find({role:"Job Seeker"})
      res.render("admin/jobseeker",{
        name:name,
        email:email,
        image:image,
        id:id,
        role:role,
        e:employers
      })
    }catch(error){
      console.log(error)
    }
  }
//list of job apply
static listofjob=async(req,res)=>{
  try{
    const{name,email,image,id,role}=req.data;
    const listofjob=await JobModel.find()
    res.render("admin/listofjob",{
      name:name,
      email:email,
      image:image,
      id:id,
      role:role,
      l:listofjob
      
    })
  }catch(error){
    console.log(error)
  }
}


//apply job
static applyjob=async(req,res)=>{
  try{
    const{name,email,image,id,role}=req.data;
    const applyjob=await CompanyJobModel.find()
    res.render("admin/applyjob",{
      name:name,
      email:email,
      image:image,
      id:id,
      role:role,
      a:applyjob
      
    })
  }catch(error){
    console.log(error)
  }
}
}

module.exports = AdminController;
