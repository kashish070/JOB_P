const CompanyJobModel = require("../models/companyjob");
const cloudinary = require("cloudinary");
const nodemailer=require("nodemailer")
cloudinary.v2.uploader.upload('my_image.jpg', {timeout:120000}, function(error,result){});

cloudinary.config({
  cloud_name: "den97mqgv",
  api_key: "686633677163384",
  api_secret: "m-iMN1c1WkJot8_8bNeEZRzatVE",
});

class CompanyJobController {
  static applyinsert = async (req, res) => {
    try {
      //console.log('hello')
     // console.log(req.body);
      const file = req.files.image;

      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      //console.log(imageUpload)
      const { name, email, companyname, website ,coverletter,emp_id,jobtitle } = req.body;
      const result = new CompanyJobModel({
        name: name,
        email: email,
        website:website,
        companyname: companyname,
        coverletter: coverletter,
        jobtitle:jobtitle,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
        user_id:req.data.id,
        emp_id:emp_id
      });
      await result.save();
      ///console.log("applyinsert");
      this.sendEmail(name,email,companyname,jobtitle)
      res.redirect("/job_details");
    } catch (error) {
      console.log(error);
    }
  };

  static sendEmail = async (name, email, companyname,jobtitle) => {
    // console.log(name,email,status,comment)
    // connenct with the smtp server

    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "kashishtiwari0707@gmail.com",
        pass: "fpdybceszxgxigqr",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Apply Job SuccessFully", // Subject line
      text: "heelo", // plain text body
      html:
        "<p>Hii " +
        name +
        ',Apply Job Successfully , Company Name'+ companyname + " Job Title " + jobtitle
    });
  };


  static jobdisplay = async (req, res) => {
    try {
      const { name, image, role,id } = req.data;
      const detail = await CompanyJobModel.find({emp_id:id});
      res.render("admin/companyjob/display", {
        d: detail,
        name: name,
        image: image,
        role: role,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(imageUpload)



  static updateStatus = async(req,res)=>{
    try {
       console.log(req.body)
      const update =await CompanyJobModel.findByIdAndUpdate(req.params.id,{
        status:req.body.status,
        message:req.body.message
      })
      res.redirect('/jobDisplay')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = CompanyJobController;
