const express = require("express");
const mongoose = require("mongoose");
// Install and setup mongoose:

require("dotenv").config({ path: ".env" });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

// Create a person having this prototypes

var Schema = mongoose.Schema;
const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

//create a Model

var personModel = mongoose.model("person", PersonSchema);

// Create and Save a Record of a Model

var person = new personModel({
  name: "mohamed",
  age: 33,
  favoriteFoods: ["pizza", "couscous"],
});

person.save(function (err, data) {
  if (err) {
    console.log("err to save model");
  }
  console.log("element is added");
});

// Create Many Records with model.create()
var arrayOfPeople = [
  { name: "ali", age: 25, favoriteFoods: ["hot-dog", "banana"] },
  { name: "tarek", age: 20, favoriteFoods: ["pasta", "chocolat"] },
  { name: "issam", age: 30, favoriteFoods: ["bssissa", "milk"] },
  { name: "ramy", age: 36, favoriteFoods: ["ananas", "kiwi"] },
];

personModel.create(arrayOfPeople, (err, data) => {
  if (err) console.log(err);
  else console.log(arrayOfPeople);
});
// Use model.find() to Search Your Database
personModel
  .find({ name: "tarek" })
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

// //Use model.findOne() to Return a Single Matching Document from Database
personModel
  .findOne({ favoriteFoods: { $in: ["pizza"] } })
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

// //Use model.findById() to Search Your Database By _id

personModel
  .findById({
    _id: "5f4d7316887a9921a884fb0d",
  })
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

// //   Perform Classic Updates by Running Find, Edit, then Save

personModel.findById("5f4d7316887a9921a884fb0d", (err, person) => {
  if (err) console.log(err);
  person.favoriteFoods.push("Touna");
  person.save((err, person) => {
    if (err) console.log(err);
    console.log(person);
  });
});

// // Perform New Updates on a Document Using model.findOneAndUpdate()

personModel.findOneAndUpdate(
  { name: "ramy" },
  { age: 36 },
  { new: true },
  (err, person) => {
    if (err) console.log(err);
    console.log(person);
  }
);

// // Delete One Document Using model.findByIdAndRemove

personModel.findOneAndRemove(
  "5f4d7316887a9921a884fb0d",
  (err, person) => {
    if (err) console.log(err);
    console.log(person);
  }
);

// // MongoDB and Mongoose - Delete Many Documents with model.remove()

personModel.deleteMany({ name: "ramy" }, (err, person) => {
  if (err) console.log(err);
  console.log("Person(s) with name 'ramy' was deleted");
});
// // Chain Search Query Helpers to Narrow Search Results

personModel
  .find({ favoriteFoods: { $in: ["ananas"] } })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec()
  .then((doc) => console.log(doc))
  .catch((err) => console.error(err));
