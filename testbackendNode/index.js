const express = require("express");
const cors = require("cors");
const app = express();
const bs = require("body-parser");
const aws = require("aws-sdk");
const fs = require("fs");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


var mysql = require('mysql2');
const bodyParser = require("body-parser");

var current_user = null;

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Achieve360!",
    database: "achieve360"
  });

const port = 6969;

const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

function is_password_valid(password) {
    return /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
}

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.use(cors({
    origin: "http://localhost:3000"
}));

const s3 = new aws.S3({
    accessKeyId: "",
    secretAccessKey: "",
    region: "us-east-2"
});

function uploadToS3(file, callback) {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: "cs307",
        Key: file.originalname,
        Body: fileStream
    };
    s3.upload(uploadParams, callback);
}

const s3Params = {
    Bucket: "cs307",
    Key: ''
};

app.listen(port, () => {
    console.log(`Server started on port ${port}\n`);
});

app.post("/signup", async (req, res) => {
    if(is_password_valid(req.body.pass)) {
        con.execute(`SELECT * FROM user WHERE email = '${req.body.email}';`, function (err, result) {
            if (err) throw err;
            if(result.length == 0) {
                hashed_password = hash(req.body.pass);
                con.execute(`INSERT INTO user (username, password, email, type) VALUES ('${req.body.name}', '${hashed_password}', '${req.body.email}', '${req.body.role}')`, function (err, result) {
                    if (err) throw err;
                    current_user = req.body.email;
                    return res.status(200).json({ message: "User added successfuly."});
                });
            }
            else return res.status(400).json({ message: "Email already in use."});
        });
    }
    else {
        return res.status(400).json({ message: "Invalid Password. Your password must include an uppercase letter, a lowercase letter, and a number."});
    }
});

function check_password(email, password, callback) {
    con.execute(`SELECT password FROM user WHERE email = '${email}';`, function (err, result) {
        if (err) throw err;
        if(result.length == 0 || result[0].password != hash(password)) {
            callback(false);
        }
        else {
            callback(true);
        }
    });
}

app.post("/login", async (req, res) => {
    check_password(req.body.email, req.body.pass, function(bool) {
        if(bool) {
            current_user = req.body.email;
            return res.status(200).json({ message: "Logging in."});
        }
        else {
            return res.status(400).json({ message: "Invalid Username or Password."});
        }
    })
});

app.post("/submitMetrics", async (req, res) => {
    con.execute(`INSERT INTO metrics (email, age, weight, height, gender) VALUES ('${current_user}', '${req.body.age}', '${req.body.weight}', '${req.body.height}', '${req.body.gender}')`, function (err, result) {
        if (err) {
            con.execute(`UPDATE metrics SET age='${req.body.age}', weight='${req.body.weight}', height='${req.body.height}', gender='${req.body.gender}' WHERE email='${current_user}'`, function (updateErr, updateResult) {
                if (updateErr) {
                    console.error("Update failed:", updateErr);
                    return res.status(500).json({ message: "Error updating metrics."});
                } else {
                    // If the update is successful, respond accordingly
                    return res.status(200).json({ message: "Metrics updated successfully."});
                }
            });
        } else {
            return res.status(200).json({ message: "Metrics added successfully."});
        }
    });
    
});

app.post("/logout", async (req, res) => {
    current_user = null;
});

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'AchieveThreeSixty@gmail.com',
      pass: 'txmi gqqa aslj tulv'
    }
});
app.post("/sendMessage", async (req, res) => {
    if(req.body.fileName) {
        s3Params.Key = req.body.fileName;
    }
    else {
        s3Params.Key = '';
    }
    if(s3Params.Key) {
        s3.getObject(s3Params, function(err, data) {
            if (err) {
                console.error("Error fetching file from S3:", err);
                return;
            }
            var mailOptions = {
                from: 'AchieveThreeSixty@gmail.com',
                to: `${req.body.email}`,
                subject: 'You have a new message in Achieve360',
                text: `${current_user} sent you the following message:\n${req.body.message}`,
                attachments: [
                    {
                        filename: `${s3Params.Key}`,
                        content: data.Body
                    }
                ]
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });
        });
    }
    else {
        var mailOptions = {
            from: 'AchieveThreeSixty@gmail.com',
            to: `${req.body.email}`,
            subject: 'You have a new message in Achieve360',
            text: `${current_user} sent you the following message:\n${req.body.message}`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }
});


app.post("/upload", upload.single('file'), async (req, res) => {
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).json({message: "No files were uploaded." });
    // }
    if (req.file == null) {
        return res.status(400).json({message: "No files were uploaded." });
    }
    const file = req.file;

    const allowedTypes = ["image/png", "image/jpeg", "video/mp4", "text/plain"];
    if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({message: "Unsupported file type." });
    }

    uploadToS3(file, (err, data) => {
        if (err) {
            console.error("Error uploading to S3:", err);
            return res.status(500).json({message: "Error uploading file." });
        }
        console.log("Upload Success:", data.Location);
        return res.status(200).json({message: "File uploaded successfully.", url: data.Location });
    });
});

app.post("/submitSportsGoals", async (req, res) => {
    con.execute(`INSERT INTO goals (email, sport, position, goal) VALUES ('${current_user}', '${req.body.sport}', '${req.body.position}', '${req.body.goals}')`, function (err, result) {
        if (err) {
            return res.status(500).json({ message: "Error inputting goals."});
        } else {
            return res.status(200).json({ message: "goals added successfully."});
        }
    });
    
});
