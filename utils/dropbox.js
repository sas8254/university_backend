const Dropbox = require("dropbox").Dropbox;
const fetch = require("node-fetch");
const { Readable } = require("stream");

const dbx = new Dropbox({
  accessToken:
    "sl.BdpDOefT8R_Hf7npLYLCwEq_w8v6zI3zp8FcVOa-i3JlIxg9hstC2fF8mFIuCs5mypcX70_Rk2S9E0SZQ6b30giC52AtFGzvOfelt8TyHwy7XMG7J-9MFwWqbX9xKy5IW6jhtlqV9xD_",
  fetch: fetch,
});

const uploadFile = async (filename, fileBuffer) => {
  try {
    const response = await dbx.filesUpload({
      path: `/${filename}`,
      contents: fileBuffer,
    });

    const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
      path: response.path_lower,
    });

    return sharedLink.url;
  } catch (error) {
    console.error("Error uploading file to Dropbox:", error);
    throw error;
  }
};

const downloadFile = async (fileUrl) => {
  try {
    const path = fileUrl.replace("https://www.dropbox.com", "");

    const response = await dbx.filesDownload({ path });

    const fileBuffer = response.fileBinary;
    const fileName = response.name;

    return { fileBuffer, fileName };
  } catch (error) {
    console.error("Error downloading file from Dropbox:", error);
    throw error;
  }
};

module.exports = {
  uploadFile,
  downloadFile,
};
