const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('screenshot'), (req, res) => {
  res.status(200).json({ message: 'Screenshot uploaded successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
