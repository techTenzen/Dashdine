const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://prajeshkumar2603:Mcu%402004@cluster0.zulagwx.mongodb.net/dashdine_menu";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    const collection = mongoose.connection.collection("fooditems");

    const documents = await collection.find({}).toArray();

    if (documents.length > 0) {
      global.fooditems = documents;
      console.log(
        "Fetched data from 'fooditems' collection:",
        global.fooditems
      );
    } else {
      console.log("No data found in the 'fooditems' collection.");
    }

    const foodCategory = mongoose.connection.collection("foodcategory");

    foodCategory.find({}).toArray(function (err, catData) {
      if (catData.length > 0) {
        global.foodcategories = catData;
        console.log(
          "Fetched data from 'foodcategory' collection:",
          global.foodcategories
        );
      } else {
        console.log("No data found in the 'foodcategory' collection.");
      }
    });
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

module.exports = mongoDB;
