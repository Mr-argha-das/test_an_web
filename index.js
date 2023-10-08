const cors = require("cors")
const express = require("express")
const app = express()
app.use(cors());
app.use(express.json())
const multer = require('multer');
const { con } = require('./db/db.js')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define where to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename the uploaded file
    },
})
const upload = multer({ storage: storage });
app.post('/api/v1/user-create', function userCreate(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var secpassword = req.body.secpassword;
    var inviteCode = req.body.inviteCode;
    try {
        con.query(`SELECT * FROM user WHERE email = '${email}'`, function (error, result) {
            if (result[0] == undefined) {
                con.query(`INSERT INTO user (email, password, secpassword) VALUES ('${email}', '${password}', '${secpassword}')`,
                    function (err, result2) {
                        console.log(result2["protocol41"])
                        if (result2["protocol41"] == true) {
                            res.status(200).json({
                                message: "User singup done",
                                status: 200
                            })
                        } else {
                            res.status(404).json({
                                message: "some thing went wrong",
                                status: 404
                            })
                        }
                    })
            } else {
                res.status(404).json({
                    message: "email already exist",
                    status: 402
                })
            }
        })

    } catch (e) {
        console.log(e)
    }
});

app.post('/api/v1/user-login', function (req, res) {
    con.query(`SELECT * FROM user WHERE email = '${req.body.email}'`, function (err, result) {
        if (result[0] == undefined) {
            res.status(404).json({
                message: "user not found",
                status: 404
            })
        } else {
            if (result[0]["password"] == req.body.password) {
                res.status(200).json({
                    message: "User logn succes",
                    data: result,
                    status: 200
                })
            } else {
                res.status(404).json({
                    message: "User logn faild",
                    data: null,
                    status: 404
                })
            }
        }
    })
})

app.post('/api/v1/vip-add', upload.single('image'), (req, res) => {
    const level = req.body.level
    const dailytask = req.body.dailytask
    const singleprofit = req.body.singleprofit
    const dailyprofit = req.body.dailyprofit
    const totalprofut = req.body.totalprofut
    const usdt = req.body.usdt

    con.query(`INSERT INTO vip (level, dailytask, singleprofit, dailyprofit, totalprofit, usdt) 
    VALUES ('${level}', '${dailytask}', '${singleprofit}','${dailyprofit}', '${totalprofut}','${usdt}')`, function (err, result) {
        if (result["protocol41"] == true) {
            res.status(200).json({
                message: "vip added",
                status: 200
            })
        } else {
            res.status(404).json({
                message: "some thing went wrong",
                status: 404
            })
        }
    })

});

app.get('/api/v1/vip-list', function (req, res) {
    con.query('SELECT * FROM vip', function (err, result) {
        res.status(200).json({
            message: "vip list",
            data: result,
            status: 200
        })
    })
})


app.listen(8080, function () {
    console.log("server is running on posrt 8080")
});