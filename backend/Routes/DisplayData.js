const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    console.log("Fetched data from 'fooditems' collection:", global.fooditems);

    res.send([global.fooditems, global.foodcategories]); 
  } catch (error) {
    console.error("Error:", error);
  }
});

module.exports = router;
