const express = require("express");

const { body } = require("express-validator");
const FrontController = require("../controllers/FrontController");

const route = express.Router();
const checkUseAuth = require("../middleware/auth");
const AdminController = require("../controllers/AdminController");
const CategoryController = require("../controllers/CategoryController");
const JobController = require("../controllers/JobController");
const CompanyJobController = require("../controllers/CompanyJobController");

route.get("/home", checkUseAuth, FrontController.home);
route.get("/contact", checkUseAuth, FrontController.contact);
route.get("/about", checkUseAuth, FrontController.about);
route.get("/", FrontController.login);
route.get("/registration", FrontController.registration);
route.get("/job", checkUseAuth, FrontController.job);
route.get("/profile", FrontController.profile);
route.get("/job_details/:id", checkUseAuth, FrontController.job_details);
route.get("/dasboard", checkUseAuth, FrontController.dashboard);
route.get("/category", checkUseAuth, FrontController.category);
route.get("/category/:id", checkUseAuth, FrontController.categoryid);

route.get(
  "/userdashboardview",
  checkUseAuth,
  FrontController.userdashboardview
);
//user profile update
route.post("/updateProfile", checkUseAuth, FrontController.profileUpdate);
route.post("/changepassword", checkUseAuth, FrontController.changePassword);

route.get("/logout", FrontController.logout);
//user profile update
route.post("/updateProfile", checkUseAuth, FrontController.profileUpdate);
//forget password

route.post("/forgetpassword", FrontController.forgetpassword);
route.get("/reset-password", FrontController.reset_Password);
route.post("/reset_Password1", FrontController.reset_Password1);

//inert data
route.post(
  "/insertuser",
  [
    body("n").notEmpty().withMessage("Name is required").trim().escape(),
    body("e").isEmail().withMessage("Enter a valid email").normalizeEmail(),
    body("p")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("cp").custom((value, { req }) => {
      if (value !== req.body.p) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
  FrontController.insertuser
);
route.post("/verifylogin", FrontController.verifyLogin);

//AdminController
route.get("/admin/dashboard", checkUseAuth, AdminController.dashboard);
route.get("/adminprofile", checkUseAuth, AdminController.adminprofile);
route.get("/employers", checkUseAuth, AdminController.Employers);
route.get("/jobseeker", checkUseAuth, AdminController.Jobseeker);
route.get("/listofjob", checkUseAuth, AdminController.listofjob);
route.get("/applyjob", checkUseAuth, AdminController.applyjob);

//admin category

route.get("/admin/category/display", checkUseAuth, CategoryController.display);
route.post("/category/insert", checkUseAuth, CategoryController.categoryinsert);
route.get(
  "/category/admin/category/display",
  checkUseAuth,
  CategoryController.display
);
route.get(
  "/admin/category/view/:id",
  checkUseAuth,
  CategoryController.categoryview
);
route.post(
  "/admin/category/edit/:id",
  checkUseAuth,
  CategoryController.categoryedit
);
route.get(
  "/admin/category/edit/:id",
  checkUseAuth,
  CategoryController.categoryedit
);
route.post(
  "/admin/category/update/:id",
  checkUseAuth,
  CategoryController.categoryupdate
);
route.get(
  "/admin/category/delete/:id",
  checkUseAuth,
  CategoryController.categorydelete
);

//admin applyjob
route.get("/employers/job/display", checkUseAuth, JobController.display);
route.post("/jobinsert", checkUseAuth, JobController.jobinsert);

route.get("/jobdelete/:id", checkUseAuth, JobController.jobdelete);

//applyjob
route.post("/applyinsert", checkUseAuth, CompanyJobController.applyinsert);
route.get("/jobDisplay", checkUseAuth, CompanyJobController.jobdisplay);
route.post(
  "/updateStatus/:id",
  checkUseAuth,
  CompanyJobController.updateStatus
);

// verify email
route.get("/verify", FrontController.verifymail);

module.exports = route;
