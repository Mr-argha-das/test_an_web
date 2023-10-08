const { con } = require('../../db/db.js')

function userCreate(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var secpassword = req.body.secpassword;
    var inviteCode = req.body.inviteCode;
    try {
        con.query(`SELECT * FROM user WHERE email = '${email}'`, function (error, result) {
            if (result[0] == undefined) {
                con.query(`INSERT INTO user (email, password, secpassword) VALUES ('${email}', '${password}', '${secpassword}')`,
                    function (err, result2) {
                        console.log(result2)
                        if (result["protocol41"] == true) {
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
}

module.exporst = { userCreate }