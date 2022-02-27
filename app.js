const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");

// const mongoose = require("mongoose");
// const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname,'/views/')); // suggested
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/home", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});
app.post("/logincompany", async (req, res) => {
  const companyDetails = {
    email: req.body.cemail,
    contactNo: req.body.ccontactNo,
    password: req.body.cpassword
  };
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:3000/api/v1/company/login",
      companyDetails,
      config
    );
    console.log(data);
  } catch (error) {
    console.log("err");
  }
  // console.log(data);
  res.redirect("/");

});
app.post("/loginfarmer", async (req, res) => {
  const farmerdetails = {
    email: req.body.email,
    contactNo: req.body.contactNo,
    password: req.body.password,
  };
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:3000/api/v1/farmer/login",
      farmerdetails,
      config
    );
    res.render("farmerdash", {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      contactNo: data.user.contactNo,
      aadhar: data.user.aadhar,
      land: data.user.land,
    });
  } catch (error) {
    console.log(error.response.data.errMessage);
  }
});

app.get("/signup", function (req, res) {
  res.render("signup");
});
app.post("/registercompany", async (req, res)=> {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  let companyDetails = {
    firstName: req.body.cfirstName,
    lastName: req.body.clastName,
    companyName: req.body.companyName,
    contactNo: req.body.ccontactNo,
    email: req.body.cemail,
    gst: req.body.cgst,
    password: req.body.cpassword
  };
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:3000/api/v1/company/register",
      companyDetails,
      config
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  console.log(companyDetails);
  res.redirect("/");
});

app.post("/registerfarmer", async (req, res) => {
  let crop = [];
  if (req.body.crop1 === "Rice") {
    crop.push("Rice");
  }
  if (req.body.crop2 === "Wheat") {
    crop.push("Wheat");
  }
  if (req.body.crop3 === "Barley") {
    crop.push("Barley");
  }
  if (req.body.crop4 === "Oats") {
    crop.push("Oats");
  }
  if (req.body.crop5 === "Pulse") {
    crop.push("Pulse");
  }

  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  let farmerdetails = {
    firstName: req.body.fname,
    lastName: req.body.lname,
    dob: req.body.dob,
    contactNo: req.body.contactNo,
    email: req.body.email,
    aadhar: req.body.aadhar,
    land: req.body.land,
    password: req.body.password,
    crops: crop,
  };
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:3000/api/v1/farmer/register",
      farmerdetails,
      config
    );
    res.render("farmerdash", {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      contactNo: data.user.contactNo,
      aadhar: data.user.aadhar,
      land: data.user.land,
    });
  } catch (error) {
    console.log("error");
  }
});

app.get("/farmerdash", function (req, res) {
  res.render("farmerDashboard");
});
app.get("/tandc", function (req, res) {
  res.render("TANDC");
});
app.get("/companydash", function (req, res) {
  res.render("companyDashboard");
});

app.listen(4000 || process.env.PORT, function () {
  console.log("Server started on port 4000");
});
