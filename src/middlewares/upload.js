const util = require("util");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const fileFilter = (req, file, callback) => {
  var ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    callback(null, false);
  }
  callback(null, true);
};
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];
    var filename = `${Date.now()}-nft-${file.originalname}`;
    callback(null, filename);
  },
});
var uploadFiles = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (
      ext.toLocaleLowerCase() !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg"
    ) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
}).array("multi-files", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
const dir = "uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
module.exports = uploadFilesMiddleware;
