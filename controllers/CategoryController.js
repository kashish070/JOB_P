const CategoryModel = require("../models/category");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "den97mqgv",
  api_key: "686633677163384",
  api_secret: "m-iMN1c1WkJot8_8bNeEZRzatVE",
});
class CategoryController {
  static display = async (req, res) => {
    try {
      const { name, image, role } = req.data;
      const data = await CategoryModel.find();
      //console.log(data)
      res.render("admin/category/display", {
        name: name,
        image: image,
        role:role,  
        d: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static categoryinsert = async (req, res) => {
    try {
      //console.log('hello')
      //console.log(req.body);
      const file = req.files.image;

      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      //console.log(imageUpload)
      const { name } = req.body;
      const result = new CategoryModel({
        name: name,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
      });
      await result.save();
      req.flash("success", "category insert");
      res.redirect("admin/category/display");
    } catch (error) {
      console.log(error);
    }
  };
  static categoryview = async (req, res) => {
    try {
      // console.log(req.body)

      const { name, image, role } = req.data;
      const data = await CategoryModel.findById(req.params.id);
      //console.log(data)
      res.render("admin/category/view", {
        name: name,
        image: image,
        role:role,
        d: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static categoryedit = async (req, res) => {
    try {
      // console.log(req.body)

      const { name, image, role } = req.data;
      const data = await CategoryModel.findById(req.params.id);
      //console.log(data)
      res.render("admin/category/edit", {
        name: name,
        image: image,
        role:role,
        d: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static categoryupdate = async (req, res) => {
    try {
      const { name, image, role } = req.data;
     
      const update = await CategoryModel.findByIdAndUpdate(req.params.id, {
        name: name,
        image: image,
        role:role
      });
      req.flash("success", "Course Update Successfully.");
      res.redirect("/admin/category/display");
    } catch (error) {
      console.log(error);
    }
  };

  static categorydelete = async (req, res) => {
    try {
      await CategoryModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/category/display");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = CategoryController;
