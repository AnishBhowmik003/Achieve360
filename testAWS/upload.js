const AWS = require('aws-sdk');
const fs = require('fs');

// Set the region and credentials
AWS.config.update({
  region: 'us-east-2',
  accessKeyId: 'AKIAQSOTUX6JUZDPI5O7',
  secretAccessKey: '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'
});

// Create S3 service object
const s3 = new AWS.S3();

// Specify the parameters
const uploadParams = {
  Bucket: 'cs307',
  Key: 'Test Upload',
  Body: fs.createReadStream('testImage.png')
};

// Upload to the bucket
s3.upload(uploadParams, (err, data) => {
  if (err) {
    console.error("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});