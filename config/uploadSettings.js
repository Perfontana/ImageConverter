const settings = {
  uploadDirectory: '',
  tempDirectory: '',
};

module.exports.setUploadDirectory = (directory) => {
  settings.uploadDirectory = directory;
};

module.exports.getUploadDirectory = () => settings.uploadDirectory;

module.exports.setTempDirectory = (directory) => {
  settings.tempDirectory = directory;
};

module.exports.getTempDirectory = () => settings.tempDirectory;
