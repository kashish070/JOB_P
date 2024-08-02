//front controller
const UserModel = require("../models/user");
const CategoryModel = require("../models/category");
const JobModel = require("../models/jobs");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const CompanyJobModel = require("../models/companyjob");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

cloudinary.config({
  cloud_name: "den97mqgv",
  api_key: "966457348212713",
  api_secret: "59PaiCQVT4jtm4InotxWCNheXEs",
});

class FrontController {
  static home = async (req, res) => {
    try {
      const category = await CategoryModel.find();
      const joblist = await JobModel.find();

      const { name, image } = req.data; //name show krane ke liye navbar mai
      res.render("home", { n: name, cat: category, job: joblist });
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      const { name, image } = req.data;

      res.render("about", { n: name });
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (req, res) => {
    try {
      const { name } = req.body;
      res.render("login", {
        n: name,
        msg: req.flash("success"),
        msg1: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static registration = async (req, res) => {
    try {
      const { name } = req.body;
      res.render("registration", { n: name, msg: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };
  static job = async (req, res) => {
    try {
      const { name, image } = req.data;
      const joblist = await JobModel.find();
      res.render("job", { n: name, joblist: joblist });
    } catch (error) {
      console.log(error);
    }
  };
  static contact = async (req, res) => {
    try {
      const { name, image } = req.data;

      res.render("contact", { n: name });
    } catch (error) {
      console.log(error);
    }
  };
  static job_details = async (req, res) => {
    try {
      const { name, image, email } = req.data;
      const jobdetails = await JobModel.findById(req.params.id);
      res.render("job_details", {
        n: name,
        i: image,
        e: email,
        jdetails: jobdetails,
        msg: req.flash("success"),
        msg1: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static dashboard = async (req, res) => {
    try {
      const { name, email, image, id } = req.data;
      const displayjob = await CompanyJobModel.find({ user_id: id });

      res.render("dashboard", {
        n: name,
        email: email,
        image: image,
        displayjob: displayjob,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static category = async (req, res) => {
    try {
      const { name, image, email, id } = req.data;
      let jobs = null;
      const categories = await CategoryModel.find();

      res.render("category", {
        n: name,
        email: email,
        image: image,
        id: id,
        categories,
        jobs,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static categoryid = async (req, res) => {
    try {
      const { name, image, email, id } = req.data;
      const categories = await CategoryModel.find();
      const category = await CategoryModel.findById(req.params.id);
      const jobs = await JobModel.find({ category: category.name });

      res.render("category", {
        n: name,
        email: email,
        image: image,
        id: id,
        categories,
        jobs,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static profileUpdate = async (req, res) => {
    try {
      const { id } = req.data;
      const { name, email } = req.body;
      if (req.files) {
        const user = await UserModel.findById(id);
        const imageID = user.image.public_id;
        //console.log(imageID);

        //deleting image from Cloudinary
        await cloudinary.uploader.destroy(imageID);
        //new image update
        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "userprofile",
          }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await UserModel.findByIdAndUpdate(id, data);
      console.log("success", "Update Profile successfully");
      res.redirect("/dasboard");
    } catch (error) {
      console.log(error);
    }
  };
  static changePassword = async (req, res) => {
    try {
      const { id } = req.data;
      console.log(req.body);
      const { op, np, cp } = req.body;
      if (op && np && cp) {
        const user = await UserModel.findById(id);
        const isMatched = await bcrypt.compare(op, user.password);
        console.log(isMatched);
        if (!isMatched) {
          console.log("error", "Current password is incorrect ");
          res.redirect("/dasboard");
        } else {
          if (np != cp) {
            console.log("error", "Password does not match");
            res.redirect("/dasboard");
          } else {
            const newHashPassword = await bcrypt.hash(np, 10);
            await UserModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            console.log("success", "Password Updated successfully ");
            res.redirect("/dasboard");
          }
        }
      } else {
        console.log("error", "ALL fields are required ");
        res.redirect("/dasboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  static profile = async (req, res) => {
    try {
      res.render("profile");
    } catch (error) {
      console.log(error);
    }
  };

  static forgot = async (req, res) => {
    try {
      res.render("forgot");
    } catch (error) {
      console.log(error);
    }
  };

  //insert user
  static insertuser = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    try {
      // console.log("hello");
      //console.log(req.body);
      const file = req.files.image;

      //image upload cloudinary
      const imageUpload = await cloudinary.uploader.upload(
        file.tempFilePath,
        { timeout: 120000 },
        {
          folder: "userprofile",
        }
      );
      //console.log(imageUpload)

      const { n, e, p, cp, role } = req.body;
      const user = await UserModel.findOne({ email: e });
      //console.log(user);
      if (user) {
        req.flash("error", "email already exist");
        res.redirect("/registration");
      } else {
        if (n && e && p && cp && role) {
          if (p == cp) {
            const hashPassword = await bcrypt.hash(p, 10);
            const result = new UserModel({
              name: n,
              email: e,
              password: hashPassword,
              role: role,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url,
              },
            });
            const userdata = await result.save();

            if (userdata) {
              const token = jwt.sign({ ID: userdata._id }, "hellohi12");
              res.cookie("token", token);
              this.sendVerifyEmail(n, e, userdata._id);
              req.flash(
                "success",
                "your registration has been successfully please verify your mail"
              );
            }

            res.redirect("/registration");
          } else {
            req.flash("error", "Password doesn't match.");
            res.redirect("/registration");
          }
        } else {
          req.flash("error", "All fields are required");
          res.redirect("/registration");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // verify send mai

  static sendVerifyEmail = async (name, email, user_id) => {
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
      subject: "for verify msil", // Subject line
      text: "heelo", // plain text body
      html:
        "<p>Hii " +
        name +
        ',Please click here to <a href="http://localhost:1000/verify?id=' +
        user_id +
        '">verify</a>Your mail.',
    });
  };

  //verify mail
  static verifymail = async (req, res) => {
    try {
      const updateinfo = await UserModel.findByIdAndUpdate(
        req.query.id,

        {
          is_verified: 1,
        }
      );
      if (updateinfo) {
        res.redirect("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //verify login
  static verifyLogin = async (req, res) => {
    try {
      //console.log(req.body)
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email }); //database mai jaa kr check kr rhe h email h ya nhi
      //console.log(user)
      if (user != null) {
        //28
        const ismatch = await bcrypt.compare(password, user.password);
        //console.log(ismatch)
        if (ismatch) {
          if (user.role == "admin" && user.is_verified == 1) {
            //token
            const token = jwt.sign({ ID: user._id }, "hellohi12");
            //console.log(token)
            res.cookie("token", token);
            res.redirect("/admin/dashboard");
          } else if (user.role == "Job Seeker" && user.is_verified == 1) {
            const token = jwt.sign({ ID: user._id }, "hellohi12");
            //console.log(token)
            res.cookie("token", token);
            res.redirect("/home");
          } else if (user.role == "Employers" && user.is_verified == 1) {
            const token = jwt.sign({ ID: user._id }, "hellohi12");
            //console.log(token)
            res.cookie("token", token);
            res.redirect("/admin/dashboard");
          } else {
            req.flash("error", "Not Approved! Plz Wait");
            res.redirect("/");
          }
        } else {
          req.flash("error", "email password is not valid");
          res.redirect("/");
        }
      } else {
        req.flash("error", "you are not registered user");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // user update
  static profileUpdate = async (req, res) => {
    try {
      const { id } = req.data;
      const { name, email } = req.body;
      if (req.files) {
        const user = await UserModel.findById(id);
        const imageID = user.image.public_id;
        //console.log(imageID);

        //deleting image from Cloudinary
        await cloudinary.uploader.destroy(imageID);
        //new image update
        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "userprofile",
          }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await UserModel.findByIdAndUpdate(id, data);
      req.flash("success", "Update Profile successfully");
      res.redirect("/dasboard");
    } catch (error) {
      console.log(error);
    }
  };

  static userdashboardview = async (req, res) => {
    try {
      const { name, email, image } = req.body;
      const detail = await CompanyJobModel.find();
      res.render("userdashboardview", { n: name, e: email, d: detail });
    } catch (error) {
      console.log(error);
    }
  };

  static forgetpassword = async (req, res) => {
    try {
      const { email } = req.body;
      const userData = await UserModel.findOne({ email: email });
      if (userData) {
        const randomString = randomstring.generate();
        await UserModel.updateOne(
          { email: email },
          { $set: { token: randomString } }
        );
        this.sendEmail(userData.name, userData.email, randomString);
        req.flash("success", "plz check your email to reset your password");
        res.redirect("/");
      } else {
        req.flash("error", "you are not a registered email");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static sendEmail = async (name, email, token) => {
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
      subject: "Reset Password", // Subject line
      text: "heelo", // plain text body
      html:
        "<p>Hii " +
        name +
        ',Please click here to <a href="http://localhost:1000/reset-password?token=' +
        token +
        '">Reset</a>Your Password.',
    });
  };

  static reset_Password = async (req, res) => {
    try {
      const token = req.query.token;
      const tokenData = await UserModel.findOne({ token: token });
      if (tokenData) {
        res.render("reset-password", { user_id: tokenData._id });
      } else {
        res.render("404");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static reset_Password1 = async (req, res) => {
    try {
      const { password, user_id } = req.body;
      const newHashPassword = await bcrypt.hash(password, 10);
      await UserModel.findByIdAndUpdate(user_id, {
        password: newHashPassword,
        token: "",
      });
      req.flash("success", "Reset Password Updated successfully ");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = FrontController;
