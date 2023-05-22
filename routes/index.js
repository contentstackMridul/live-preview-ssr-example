var express = require("express");
var router = express.Router();
const { Stack } = require("../contentstack.config");
const Contenstack = require("contentstack");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let entry ;
  try {
    const result = await Stack.ContentType(process.env.CONTENTSTACK_CONTENT_TYPE_UID).Query().includeEmbeddedItems().toJSON().find();
    entry = result[0][0] || {};
  } catch (error) {
    console.log("error", error);
  } finally { 
    // Adding edit button related data to the entry
    Contenstack.Utils.addEditableTags(entry, process.env.CONTENTSTACK_CONTENT_TYPE_UID, false, entry?.locale);

    res.render("index", {
      title: entry.title ? entry.title : "No title found",
      singleLine: entry.single_line ? entry.single_line : "No sub title found", 
      dataCslp: entry.$,  // contain edit button related data. Please check https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-preview-for-your-website/#live-edit-tags-for-entries-optional to know more
    });
  }
});
module.exports = router;
