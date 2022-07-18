const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const recursive = require("recursive-fs");
const basePathConverter = require("base-path-converter");

const uploadFolder = async (src, pinataFolderName) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  let data = new FormData();
  const { files } = await recursive.read(src);
  const fileNames = [];
  files.forEach((file) => {
    // cut file aflter ./uploads
    fileNames.push(file.slice("./uploads/".length));
    data.append(`file`, fs.createReadStream(file), {
      filepath: basePathConverter(src, file),
    });
  });
  const metadata = JSON.stringify({
    name: pinataFolderName,
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });
  data.append("pinataMetadata", metadata);
  const res = await axios.post(url, data, {
    maxBodyLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: process.env.PINATA_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET,
    },
  });
  return fileNames.map(
    (file) =>
      "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash + "/" + file
  );
};

module.exports = {
  uploadFolder,
};
