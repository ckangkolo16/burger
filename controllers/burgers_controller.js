const express = require("express");
const burger = require("../models/burger");

const router = express.Router();

router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hdbrsObj = {
      burgers: data,
    };
    console.log(hdbrsObj);
    res.render("index", hdbrsObj);
  });
});

router.post("/api/burgers", function (req, res) {
  console.log(req.body);
  burger.insertOne(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],

    function (result) {
      res.redirect("/");
    }
  );
});

router.put("/api/burgers/:id", function (req, res) {
  const condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne(
    {
      devoured: req.body.devoured,
    },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

//router.deleteOne(condition, function (req, res) {
//const condition = "id =" + req.params.id;
//console.log("condition", condition);

//burger.deleteOne(condition, function (result) {
//if (result.changedRows === 0) {
//return res.status(404).end();
//}
//res.status(200).end();
//});
//});

// Export routes for server.js to use.
module.exports = router;
