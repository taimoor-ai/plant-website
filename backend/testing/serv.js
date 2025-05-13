// app.js or routes/upload.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('../Config/cloudinary');
const upload = multer({ dest: 'uploads/' });
const app = express();

// Single or multiple image upload
app.post('/upload', upload.array('images'), async (req, res) => {
    console.log("i am here")
  try {
    const urls = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      urls.push(result.secure_url);
      fs.unlinkSync(file.path); // Remove local file
    }
     console.log(urls)
    // Save `urls` to database
    // Example: await ImageModel.create({ urls });

    res.json({ urls }); // Return uploaded image URLs
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(3000, () => { 
  console.log('Server is running on port 3000');
}    );