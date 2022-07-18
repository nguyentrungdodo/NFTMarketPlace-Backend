const cloudinary = require("cloudinary");
const { v4: uuidv4 } = require('uuid');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = async (file, folder) => {
  const cloudResult = await cloudinary.v2.uploader.upload(
    file,
    {
      resource_type: "image",
      public_id: uuidv4(),// chỗ này máy em với máy anh đọc khác nhau nè chắc do ios anh để Math.random thì đọc đúng
      // em giờ đổi thàm Math.random thành 1 cádi render key nào đó là được
      // ok anh, để em thử
      overwrite: true,
      notification_url: "https://mysite.example.com/notify_endpoint",
    },
    function (error, result) {
      console.log(result, error);
    }
  );
  return cloudResult;
};
module.exports = {
  uploads,
};
