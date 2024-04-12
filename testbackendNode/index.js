const express = require("express");
const cors = require("cors");
const app = express();
const bs = require("body-parser");
const aws = require("aws-sdk");
const fs = require("fs");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { exec } = require("child_process");

var mysql = require('mysql2');
const bodyParser = require("body-parser");

var con = mysql.createPool({
    host: "database-2.cvmicwscqnza.us-east-2.rds.amazonaws.com",
    user: "achieve360",
    password: "ProjectDB123!",
    port: "3306",
    database: "Achieve360",
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
        if(!req.body.sport) req.body.sport = 'NULL';
        con.execute(`SELECT * FROM user WHERE email = '${req.body.email}';`, function (err, result) {
            if (err) throw err;
            if(result.length == 0) {
                hashed_password = hash(req.body.pass);
                con.execute(`INSERT INTO user (username, password, email, type, sport) VALUES ('${req.body.name}', '${hashed_password}', '${req.body.email}', '${req.body.role}', '${req.body.sport}')`, function (err, result) {
                    if (err) throw err;
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
            return res.status(200).json({ message: "Logging in."});
        }
        else {
            return res.status(400).json({ message: "Invalid Username or Password."});
        }
    })
});

const stats = {
    male: {
        twenties: {
            avgHeight: 69.6,
            avgWeight: 188.6,
            stdHeight: 2.5,
            stdWeight: 24.5
        },
        thirties: {
            height: 69.3,
            weight: 208.1,
            stdHeight: 2.5,
            stdWeight: 24.5
        },
        forties: {
            height: 69.0,
            weight: 206.9,
            stdHeight: 2.5,
            stdWeight: 24.5
        },
        fifty_plus: {
            height: 68.0,
            weight: 193.65,
            stdHeight: 2.5,
            stdWeight: 24.5
        },
    },
    female: {
        twenties: {
            avgHeight: 64.2,
            avgWeight: 165.0,
            stdHeight: 2.2,
            stdWeight: 22.5
        },
        thirties: {
            avgHeight: 63.8,
            avgWeight: 174.9,
            stdHeight: 2.2,
            stdWeight: 22.5
        },
        forties: {
            avgHeight: 63.6,
            avgWeight: 178.1,
            stdHeight: 2.2,
            stdWeight: 22.5
        },
        fifty_plus: {
            avgHeight: 63.0,
            avgWeight: 165.05,
            stdHeight: 2.2,
            stdWeight: 22.5
        },
    }
};


app.post("/submitMetrics", async (req, res) => {
    var age;
    if(req.body.age >= 20 && req.body.age <= 29) age = "twenties";
    else if(req.body.age >= 30 && req.body.age <= 39) age = "thirties";
    else if(req.body.age >= 40 && req.body.age <= 49) age = "forties";
    else if(req.body.age >= 50) age = "fifty_plus";
    else return res.status(300).json({ message: "Age must be at least 20."});
    const vals = stats[req.body.gender][age];
    con.execute(`INSERT INTO metrics (email, age, weight, height, gender, heightZscore, weightZscore) VALUES ('${req.body.email}', '${req.body.age}', '${req.body.weight}', '${req.body.height}', '${req.body.gender}', (${req.body.height} - ${vals.avgHeight}) / ${vals.stdHeight}, (${req.body.weight} - ${vals.avgWeight}) / ${vals.stdWeight})`, function (err, result) {
        if (err) {
            con.execute(`UPDATE metrics SET age='${req.body.age}', weight='${req.body.weight}', height='${req.body.height}', gender='${req.body.gender}' WHERE email='${req.body.email}'`, function (updateErr, updateResult) {
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
    // console.log(req.body.sender);
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
                text: `${req.body.sender} sent you the following message:\n${req.body.message}`,
                attachments: [
                    {
                        filename: `${s3Params.Key}`,
                        content: data.Body
                    }
                ]
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.error(error);
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
            text: `${req.body.sender} sent you the following message:\n${req.body.message}`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.error(error);
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

app.post("/addGoal", async (req, res) => {
    con.execute(`INSERT INTO goals (email, sport, position, goals) VALUES ('${req.body.email}', '${req.body.sport}', '${req.body.position}', '${req.body.goals}')`, async function (err, result) {
        if (err) {
            return res.status(500).json({ message: "Error inputting goals."});
        } else {
            try {
                const output = await runRubyScript(req.body.goals, req.body.position);
                // console.log("Script output:", output);
                return res.status(200).json({ message: output.trim() }); // Use trim() to remove new lines if necessary
              } catch (error) {
                console.error(`An error occurred while running the script: ${error}`);
                return res.status(500).json({ message: "An error occurred while running the script." });
              }
        }
    });  
  });
  

  function escapeShellArg(arg) {
    if (typeof arg !== 'string') {
      throw new Error('Provided argument is not a string');
    }
    // Escape potentially dangerous characters
    return `"${arg.replace(/(["'$`\\])/g,'\\$1')}"`;
  }
  
function runRubyScript(timeGoal, position) {
    const safeTimeGoal = escapeShellArg(timeGoal);
    const safePosition = escapeShellArg(position);
    
    const command = `./plan.rb --time ${safeTimeGoal} --program ${safePosition}`;
    // console.log(command);
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error);
            }
            // console.log(`stdout: ${stdout}`);
            if(stderr) {
                console.error(`stderr: ${stderr}`);
            }
            resolve(stdout);
        });
    });
}



app.post("/addProgress", async (req, res) => {
    var str;
    if(req.body.type == 'workout') {
        str = `INSERT INTO progress (email, days, time, type) VALUES ('${req.body.email}', '${req.body.days}', '${req.body.value}', '${req.body.type}')`
    }
    else {
        str = `INSERT INTO progress (email, days, calories, type) VALUES ('${req.body.email}', '${req.body.days}', '${req.body.value}', '${req.body.type}')`
    }
    con.execute(str, function (err, result) {
        if (err) {
            return res.status(500).json({ message: "Error inputting progress."});
        } else {
            return res.status(200).json({ message: "progress added successfully."});
        }
    });
});

app.post("/fetchProgress", async(req, res) => {
    const str = req.body.type == 'workout' ? 'time' : 'calories';
    con.execute(`SELECT days, ${str} FROM progress WHERE email='${req.body.email}' AND type='${req.body.type}'`, function(err, results) {
        if(err) {
            console.error(err);
            return res.status(500).json({message: "Error fetching progress"})
        }
        else {
            // console.log(results);
            return res.status(200).json({message: "success", res: results});
        }
    });
});

// const express = require('express')

app.post('/createDiet', (req, res) => {

    con.execute(`SELECT age, weight, height, gender FROM metrics WHERE email='${req.body.email}'`, function(err, results) {
        if(err) {
            console.error(err);
            return res.status(500).json({message: "Error generating diet plan"})
        }
        else {
            // console.log(results[0]);
            const { spawn } = require('child_process');
            const pyProg = spawn('python3', ['./dietPlan.py', req.body.weightGoal, results[0].weight, results[0].height, results[0].age, results[0].gender, req.body.activityLevel]);

            pyProg.stdout.on('data', function(data) {

                console.log(data.toString());
                return res.status(200).json({message: "success", res: data.toString()});
            });
        }
    }); 
});

app.post("/getSimilarPlayers", (req, res) => {
    con.execute(`SELECT heightZscore, weightZscore FROM metrics WHERE email='${req.body.email}'`, function(err, results) {
        if(err) {
            return res.status(300).json({message: 'Input your metrics'});
        }
        else {
            // console.log(results[0]);
            const userHeight = results[0].heightZscore;
            const userWeight = results[0].weightZscore;
            con.execute(`SELECT name, position, height, weight, 40_yard, bench, vert, broad, shuttle, 3cone from nfl NATURAL JOIN (SELECT nfl.id, ABS(${userHeight} - heightZscore.zScore) + ABS(${userWeight} - weightZscore.zScore) as val FROM weightZscore join nfl on nfl.id = weightZscore.id join heightZscore on nfl.id = heightZscore.id ORDER BY val LIMIT 10) as t;`, function(err, results) {
                if(err) {
                    console.error(err);
                    return res.status(500).json({message: "error"});
                }
                else {
                    // console.log(results);
                    return res.status(200).json({message: "success", res: results});
                }
            });
        }
    });
});

app.post("/connect", (req, res) => {
    con.execute(`INSERT INTO connections (user_email, coach_email) VALUES ('${req.body.user}', '${req.body.coach}')`, function(err, results) {
        if(err) {
            console.log(err);
            return res.status(500).json({message: err});
        }
        else {
            return res.status(200).json({message: 'Successfully connected to coach'});
        }
    });
});

app.post("/findCoaches", (req, res) => {
    con.execute(`SELECT username, email FROM user WHERE sport = '${req.body.sport}'`, function(err, results) {
        if(err) {
            return res.status(500).json({message: 'Error'});
        }
        else {
            return res.status(200).json({message: 'Success', res: results});
        }
    });
});


