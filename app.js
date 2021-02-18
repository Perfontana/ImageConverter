const express = require('express');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const {
  setTempDirectory,
  setUploadDirectory,
  getTempDirectory,
} = require('./config/uploadSettings');
const audio = require('./routes/audio');
const app = express();

setTempDirectory(__dirname + '/tmp/');
setUploadDirectory(__dirname + '/public/uploads/');

// Use file upload middleware.
app.use(fileUpload({ useTempFiles: true, tempFileDir: getTempDirectory() }));

// Give access to public folder.
app.use(express.static('public'));

// Use body parser.
app.use(express.json());

app.use('/api/v1/audio', audio);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
