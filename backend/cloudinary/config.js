const Cloudinary = require('cloudinary').v2

require('dotenv').config()

Cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });


  const uploadCloudinary = (urlImg, publicId)=>{
     
    Cloudinary.uploader.upload(urlImg,
    { public_id: publicId }, 
    function(error, result) {
      if (result) {
          console.log (result.secure_url); 
      } else {
          console.error(error)
      }    
  });

 }
 module.exports = uploadCloudinary;
 