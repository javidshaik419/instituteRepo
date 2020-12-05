var mongoose = require("mongoose");
var moment = require('moment')
var passwordHash = require("password-hash")
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer')
var emailValidated = require('../utils/auth');
const validator = require('../utils/auth')
var randomstring = require("randomstring");
var fs = require('fs')
//multer//
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
//end//

var adminRegisterSchema = require('mongoose').model('admin');
var addCategorySchema = require('mongoose').model('category');
var addBranchSchema = require('mongoose').model('branches');
var addCourseSchema = require('mongoose').model('course')
var stuRegSchema = require('mongoose').model('students')
var addCourseWithCatSchema = require('mongoose').model('combined')
var addprofileSchema = require('mongoose').model('pictures')








async function adminRegister(req, res) {
    let reqData = req.body
    if (reqData.name && reqData.email && reqData.password && reqData.role) {

        var emailverification = await emailValidated.isEmail(reqData.email)
        if (emailverification == true) {
            var a = moment()
            console.log(a)

            let hashedPassword = passwordHash.generate(reqData.password)

            let query = {
                name: reqData.name,
                email: reqData.email,
                password: hashedPassword,
                loginAttempts: 3,
                role: reqData.role,
                time: moment().format('Do MMMM YYYY, h:mm:ss a')


            }

            let newUser = await new adminRegisterSchema(query)
            let result = await newUser.save()
            if (result) {
                res.json({
                    msg: "register sucessful",
                    code: 2000,
                    data: result

                })
            } else {
                res.json({
                    msg: "register failed",
                    code: 5000
                })
            }
        } else {
            res.json({
                msg: "email format is wrong",
                code: 5000
            })

        }
    } else {
        res.json({
            msg: "please make sure that you have given all the required fileds",
            code: 5000
        })

    }


}


async function adminLogin(req, res) {
    reqBody = req.body

    if (validator.isEmail(reqBody.email)) {

        let result = await adminRegisterSchema.findOne({ email: reqBody.email })

        if (result) {
            var passCheck = await passwordHash.verify(reqBody.password, result.password)
            let jwt_secrect = "36s634uper!@_$%~^131*($133421%Dsecrzxcet_123456@aaa";
            const token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 20,
                    id: result._id,
                    email: result.email,
                },
                jwt_secrect
            );

            if (passCheck) {
                res.json({
                    msg: "logged in sucessfully",
                    code: 2000,
                    data: result,
                    token: token

                })
            } else {
                res.json({
                    msg: "password incorrect",
                    code: 5000
                })
            }

        } else {
            res.json({
                msg: "email does not exit",
                code: 5000
            })
        }
    } else {
        res.json({
            msg: "enter proper email",
            code: 5000
        })
    }


}


async function getAdminDetails(req, res) {
    reqBody = req.body
    let adminDetails = await adminRegisterSchema.findOne({ _id: reqBody.id })
    if (adminDetails) {
        res.json({
            msg: "details found",
            code: 2000,
            data: adminDetails
        })
    } else {
        res.json({
            msg: "details not found",
            code: 5000
        })
    }
}


async function addCategory(req, res) {
    reqBody = req.body
    let categoryCheck = await addCategorySchema.findOne({ categorys: reqBody.category })
    if (categoryCheck) {
        res.json({
            msg: "category alreedy exist",
            code: 5000
        })

    } else {
        let query = {
            categorys: reqBody.category
        }
        let addedCategory = await new addCategorySchema(query)
        let result = await addedCategory.save()

        if (result) {
            res.json({
                msg: "category added sucessfully",
                code: 2000,
                data: result
            })

        } else {
            res.json({
                msg: "category addition failed",
                code: 5000
            })
        }
    }



}

async function addBranch(req, res) {
    reqBody = req.body
    let branchCheck = await addBranchSchema.findOne({ branches: reqBody.branch })

    if (branchCheck) {
        res.json({
            msg: "branch alreedy exist",
            code: 5000
        })

    } else {
        let query = {
            branches: reqBody.branch
        }
        let addedBranch = await new addBranchSchema(query)
        let result = await addedBranch.save()

        if (result) {
            res.json({
                msg: "branch added sucessfully",
                code: 2000,
                data: result
            })

        } else {
            res.json({
                msg: "branch addition failed",
                code: 5000
            })
        }
    }

}


async function addCourses(req, res) {
    reqBody = req.body
    let courseCheck = await addCourseSchema.findOne({ courses: reqBody.course })

    if (courseCheck) {
        res.json({
            msg: "course alredy exist",
            code: 5000
        })

    } else {
        let query = {
            courses: reqBody.course
        }
        let addedCourse = await new addCourseSchema(query)
        let result = await addedCourse.save()

        if (result) {
            res.json({
                msg: "course added sucessfully",
                code: 2000,
                data: result
            })

        } else {
            res.json({
                msg: "course addition failed",
                code: 5000
            })
        }
    }



}






async function editCategory(req, res) {
    let reqData = req.body
    let oldCategory = await addCategorySchema.findOne({ categorys: reqData.category })
    if (oldCategory) {
        res.json({
            msg: "category already exist",
            code: 5000
        })

    } else {
        let obj = {
            categorys: reqData.category
        }
        let user = await addCategorySchema.findOne({ _id: reqData.id })
        if (user) {
            let query = {
                $set: obj
            }
            let result = await addCategorySchema.updateOne({ _id: reqData.id }, query)
            if (result) {

                res.json({
                    msg: "update sucedssful",
                    code: 2000,
                    data: result
                })
            } else {
                res.json({
                    msg: "update failed",
                    code: 5000
                })

            }
        } else {
            res.json({
                msg: "id not found",
                code: 5000
            })

        }


    }

}


async function editBranch(req, res) {
    let reqData = req.body
    let oldBranch = await addBranchSchema.findOne({ branches: reqData.branch })
    if (oldBranch) {
        res.json({
            msg: "branch already exist",
            code: 5000
        })

    } else {
        let obj = {
            branches: reqData.branch
        }
        let user = await addBranchSchema.findOne({ _id: reqData.id })
        if (user) {
            let query = {
                $set: obj
            }
            let result = await addBranchSchema.updateOne({ _id: reqData.id }, query)
            if (result) {

                res.json({
                    msg: "update sucedssful",
                    code: 2000,
                    data: result
                })
            } else {
                res.json({
                    msg: "update failed",
                    code: 5000
                })

            }
        } else {
            res.json({
                msg: "id not found",
                code: 5000
            })

        }


    }

}

async function editCourse(req, res) {
    let reqData = req.body
    courses = []

    let idCheck = await addCourseWithCatSchema.findOne({ _id: reqData.id })
    if (idCheck) {
        let categoryCheck = await addCourseWithCatSchema.find({ categorys: reqData.category })
        for (i = 0; i < categoryCheck.length; i++) {
            if (categoryCheck[i].course) {
                courses.push(categoryCheck[i].course)
            } else {
                res.json({
                    msg: "itteration problem",
                    code: 5000
                })
            }
        }
        let courseCheck = courses.includes(reqData.course)
        if (courseCheck) {
            res.json({
                msg: "course already exist in that category",
                code: 5000
            })
        } else {
            let obj = {
                course: reqData.course
            }
            let user = await addCourseWithCatSchema.findOne({ _id: reqData.id })
            if (user) {
                let query = {
                    $set: obj
                }
                let result = await addCourseWithCatSchema.updateOne({ _id: reqData.id }, query)
                if (result) {

                    res.json({
                        msg: "update sucedssful",
                        code: 2000,
                        data: result
                    })
                } else {
                    res.json({
                        msg: "update failed",
                        code: 5000
                    })

                }

            } else {
                res.json({
                    msg: "user not found",
                    code: 5000
                })

            }



        }

    } else {
        res.json({
            msg: "id not found",
            code: 5000
        })
    }
}








async function deleteCategory(req, res) {
    reqData = req.body
    let user = await addCategorySchema.deleteOne({ _id: reqData.id })
    if (user) {
        res.json({
            msg: " category deleted sucessfully",
            code: 2000
        })

    } else {
        res.json({
            msg: "category delete failed",
            code: 5000
        })
    }
}

async function deleteBranch(req, res) {
    reqData = req.body
    let user = await addBranchSchema.deleteOne({ _id: reqData.id })
    if (user) {
        res.json({
            msg: " branch deleted sucessfully",
            code: 2000
        })

    } else {
        res.json({
            msg: "branch delete failed",
            code: 5000
        })
    }
}


async function deleteCourse(req, res) {
    reqData = req.body
    let idCheck = await addCourseWithCatSchema.findOne({ _id: reqData.id })
    if (idCheck) {
        console.log("hiiiiiiii", idCheck)

        let user = await addCourseWithCatSchema.deleteOne({ _id: reqData.id })
        if (user) {
            res.json({
                msg: " course deleted sucessfully",
                code: 2000
            })

        } else {
            res.json({
                msg: "course delete failed",
                code: 5000
            })
        }
    }
    else {
        res.json({
            msg: "id not found",
            code: 5000
        })

    }
}





async function getAllCategoryes(req, res) {
    var result = await addCategorySchema.find()
    if (result) {
        res.json({
            msg: " details found",
            code: 2000,
            data: result
        })

    } else {
        res.json({
            msg: " details not found",
            code: 5000
        })

    }
}



async function getAllBranches(req, res) {
    var result = await addBranchSchema.find()
    if (result) {
        res.json({
            msg: " details found",
            code: 2000,
            data: result
        })

    } else {
        res.json({
            msg: " details not found",
            code: 5000
        })

    }
}

async function getAllCourse(req, res) {
    var result = await addCourseSchema.find()
    if (result) {
        res.json({
            msg: " details found",
            code: 2000,
            data: result
        })

    } else {
        res.json({
            msg: " details not found",
            code: 5000
        })

    }
}


async function stuRegister(req, res) {
    reqData = req.body
    let user = await stuRegSchema.findOne({ email: reqData.email.toLowerCase() })
    if (user) {
        res.json({
            msg: " email already exist",
            code: 5000
        })


    } else {
        let stdMobile = await stuRegSchema.findOne({ mobile: reqData.mobile })
        if (stdMobile) {
            res.json({
                msg: " mobile number already exist",
                code: 5000
            })

        } else {
            var hashedPassword = passwordHash.generate(reqData.password)
            let query = {
                firstName: reqData.firstName,
                lastName: reqData.lastName,
                email: reqData.email,
                password: hashedPassword,
                gender: reqData.gender,
                education: reqData.education,
                serverTechnology: reqData.database,
                branch: reqData.branch,
                mobile: reqData.mobile,
                role: reqData.role,
                loginAttempts: 0


            }
            let stdrec = await new stuRegSchema(query)
            let result = await stdrec.save()
            if (result) {


                res.json({
                    msg: " Registration Sucessful",
                    code: 2000,
                    data: result
                })
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'javidshaik419@gmail.com',
                        pass: '11196789@Gbi'
                    }
                });

                var mailOptions = {
                    from: 'javidshaik419@gmail.com',
                    to: result.email,
                    subject: ' password and email',

                    html: "<p>your register email is:" + "<b>" + result.email + "</b>" + "<br>and your Paswword is:" + "<b>" + reqData.password + "</b>" + "</p> <br>" +
                        '<p> Please Click <a href="http://localhost:4200/stdLogin ">Here</a> to login with above credentials </p>' +
                        "<p> Thank You for registering with Us </p>",
                    // attachments:[
                    //     {filename:"",path:"",contentType: 'application/pdf'}

                    // ]

                };

                transporter.sendMail(mailOptions, function (error, info) {
                    console.log("information email", info);
                    if (error) {
                        console.log("error", error);
                    } else {
                        console.log('Email sent: ' + info.response, "inffooo");
                    }
                });
                res.json({
                    msg: "email sent sucessfully to " + result.email,
                    code: "2000"
                })
            } else {
                res.json({
                    msg: " Registration Failed",
                    code: 5000,

                })
            }
        }
    }

}

async function stuLogin(req, res) {
    reqBody = req.body
    let result = await stuRegSchema.findOne({ email: reqBody.email })
    if (result) {
        let loginAttempts = result.loginAttempts
        var a = moment(result.updatedAt);
        var b = moment();
        var timeDif = b.diff(a, 'seconds')
        //timeDif in SECONDS//
        console.log("diffff", timeDif)
        if (loginAttempts < 3 || timeDif >= 300) {

            if (passwordHash.verify(reqBody.password, result.password)) {
                const attempts = await stuRegSchema.findOneAndUpdate({ email: result.email }, { loginAttempts: 0 })

                let jwt_secrect = "36s634uper!@_$%~^131*($133421%Dsecrzxcet_123456@aaa";
                const token = jwt.sign(
                    {
                        exp: Math.floor(Date.now() / 1000) + 60 * 20,
                        id: result._id,
                        email: result.email,
                    },
                    jwt_secrect
                );
                res.json({
                    msg: "sucessfully loggedIn",
                    code: 2000,
                    data: result,
                    token: token

                })

            } else {
                stuRegSchema.findOneAndUpdate({ email: result.email }, { $inc: { loginAttempts: 1 } }).then((result) => {
                }).catch((err) => {

                })
                if (result.loginAttempts == 0) {
                    var x = 3
                }
                if (result.loginAttempts == 1) {
                    var x = 2
                }
                if (result.loginAttempts == 2) {
                    var x = 1
                }
                res.json({
                    code: 5000,
                    messaage: "Password wrong " + x + " attempts left"
                })

            }

        } else {
            res.json({
                code: 5000,
                messaage: "your account blocked  for 5 minute"
            })
        }


    } else {
        res.json({
            msg: "email doesNot exist",
            code: 5000
        })
    }


}
// reqBody = req.body
// let result = await stuRegSchema.findOne({ email: reqBody.email })

// if (result) {
//     var loginAttempts = result.loginAttempts
//     var a = moment(result.updatedAt);
//     var b = moment();
//     var timeDif = b.diff(a, 'seconds')
//     console.log(timeDif, loginAttempts, "resultsss")
//     if (result.loginAttempts < 3||timeDif < 3600) {
//         if (result.loginAttempts < 3) {

//             stuRegSchema.findOneAndUpdate({ email: result.email }, { loginAttempts: 0 })
//             console.log("hisdfiasdf")
//         }


//         if (passwordHash.verify(reqBody.password, result.password) && result.loginAttempts==0) {
//             let jwt_secrect = "36s634uper!@_$%~^131*($133421%Dsecrzxcet_123456@aaa";
//             const token = jwt.sign(
//                 {
//                     exp: Math.floor(Date.now() / 1000) + 60 * 20,
//                     id: result._id,
//                     email: result.email,
//                 },
//                 jwt_secrect
//             );
//             res.json({
//                 msg: "sucessfully loggedIn",
//                 code: 2000,
//                 data: result,
//                 token: token

//             })

//         } else {
//             stuRegSchema.findOneAndUpdate({ email: result.email }, { $inc: { loginAttempts: 1 } }).then((result) => {
//             }).catch((err) => {
//             })
//             res.json({
//                 code: 5000,
//                 messaage: "Password wrong"
//             })
//         }



//     } else {
//         res.json({
//             code: 5000,
//             messaage: "your account blocked  for 1 hour"
//         })
//     }
// } else {
//     res.json({
//         msg: "email doesNot exist",
//         code: 5000
//     })
// }
//        if ((result.loginAttempts < 3 && timeDif <= 60) || timeDif >= 3600) {

//             if (timeDif >= 3600) {
//                 stuRegSchema.findOneAndUpdate({ email: results.email }, { loginAttempts: 0 })
//             }
//             if (passwordHash.verify(reqBody.password, result.password)) {
//                 let jwt_secrect = "36s634uper!@_$%~^131*($133421%Dsecrzxcet_123456@aaa";
//                 const token = jwt.sign(
//                     {
//                         exp: Math.floor(Date.now() / 1000) + 60 * 20,
//                         id: result._id,
//                         email: result.email,
//                     },
//                     jwt_secrect
//                 );
//                 res.json({
//                     msg: "sucessfully loggedIn",
//                     code: 2000,
//                     data: result,
//                     token: token

//                 })

//             } else {
//                 stuRegSchema.findOneAndUpdate({ email: result.email }, { $inc: { loginAttempts: 1 } }).then((result) => {
//                 }).catch((err) => {
//                 })
//                 res.json({
//                     code: 5000,
//                     messaage: "Password wrong"
//                 })
//             }
//         } else {
//             res.json({
//                 code: 500,
//                 messaage: "your account blocked  for 1 hour"
//             })
//         }
//     } else {
//         res.json({
//             msg: "email doesNot exist",
//             code: 5000
//         })
//     }
// }
//hiii//
// function userLogin(req, res) {
//     if (req.body.email && req.body.password) {
//         if (validator.isEmail(req.body.email)) {
//             userRegSchema.findOne({ email: req.body.email })
//                 .then(results => {
//                     var loginAttempts = results.loginAttempts
//                     if (!results) {
//                         return res.json({
//                             code: 400,
//                             message: "Invalid email address"
//                         })
//                     } else {
//                         var a = moment(results.updatedAt);
//                         var b = moment();
//                         var timeDif = b.diff(a, 'seconds')
//                         console.log('current time', moment().format('YYYY-MM-DD hh:mm:ss'))
//                         console.log('update time', moment(results.updatedAt).format('YYYY-MM-DD hh:mm:ss'))
//                         if ((results.loginAttempts < 3 && timeDif <= 60) || timeDif >= 3600) {
//                             if (timeDif >= 3600) {
//                                 userRegSchema.findOneAndUpdate({ email: results.email }, { loginAttempts: "0" })
//                             }
//                             if (bcrypt.compareSync(req.body.password, results.password)) {
//                                 var jwt_secrect = "36s634uper!@_$%~^131*($133421%Dsecrzxcet_123456@aaa"
//                                 let token = jwt.sign({ id: results._id }, jwt_secrect, {

//                                 });
//                                 res.json({
//                                     code: 200,
//                                     messaage: "userLogin successfully",
//                                     token: token,
//                                     data: results
//                                 })
//                             } else {
//                                 userRegSchema.findOneAndUpdate({ email: results.email }, { $inc: { loginAttempts: 1 } }).then((result) => {
//                                 }).catch((err) => {
//                                 })
//                                 res.json({
//                                     code: 400,
//                                     messaage: "Password wrong"
//                                 })
//                             }
//                         } else {
//                             res.json({
//                                 code: 500,
//                                 messaage: "your account blocked  for 1 hour"
//                             })
//                         }
//                     }
//                 }).catch((err) => {
//                     res.json({
//                         code: "400",
//                         message: "sum error occured"
//                     })

//                 })

//         } else {
//             res.json({
//                 code: 400,
//                 message: "please enter proper email"
//             })
//         }

//     } else {
//         res.json({
//             code: 400,
//             messaage: "Plese provide proper information"
//         })
//     }
// }

//byyy//



//         var passCheck = await passwordHash.verify(reqBody.password, result.password)
//         let jwt_secrect = "36s634uper!@_$%~^131*($133421%Dsecrzxcet_123456@aaa";
//         const token = jwt.sign(
//             {
//                 exp: Math.floor(Date.now() / 1000) + 60 * 20,
//                 id: result._id,
//                 email: result.email,
//             },
//             jwt_secrect
//         );
//         if (passCheck) {
//             res.json({
//                 msg: "sucessfully loggedIn",
//                 code: 2000,
//                 data: result,
//                 token: token

//             })

//         } else {
//             res.json({
//                 msg: "please check your password",
//                 code: 5000
//             })

//         }

//     } else {
//         res.json({
//             msg: "email doesNot exist",
//             code: 5000
//         })
//     }
// }

async function getStuDetails(req, res) {
    reqBody = req.body

    let result = await stuRegSchema.findOne({ _id: reqBody.id })
    if (result) {
        res.json({
            code: 2000,
            result: result

        })
    } else {
        res.json({
            code: 5000,
            msg: "stu details not found"
        })
    }
}

async function getAllStudents(req, res) {
    let reqBody = req.body
    let data = await stuRegSchema.find()
    if (data) {
        res.json({
            msg: "student Details found sucessfully",
            code: 2000,
            result: data
        })
    } else {
        res.json({
            msg: "Student Details Not found",
            code: 5000
        })
    }
}


async function stuEdit(req, res) {
    reqBody = req.body
    let obj = {
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        mobile: reqBody.mobile,

    }
    let mobileCheck = await stuRegSchema.findOne({ mobile: obj.mobile })
    if (mobileCheck) {
        res.json({
            msg: "mobile number already exist",
            code: 5000
        })
    } else {
        let result = await stuRegSchema.findOne({ _id: reqBody.id })
        if (result) {
            let query = {
                $set: obj
            }
            let update = await stuRegSchema.updateOne({ _id: reqBody.id }, query)
            if (update) {
                res.json({
                    msg: "Stu Details updated sucessfully",
                    code: 2000,
                    result: update
                })
            } else {
                res.json({
                    msg: "update failed",
                    code: 5000
                })

            }


        } else {
            res.json({
                msg: "id not found",
                code: 5000
            })
        }
    }
}

async function addCourseWithCategory(req, res) {
    reqData = req.body
    let courses = [];
    let idCheckd = await addCourseWithCatSchema.find({ categorys: reqData.category })
    idCheckd.forEach(cours => {
        courses.push(cours.course)
    })


    if (idCheckd) {
        let courseCheck = courses.includes(reqData.course)
        if (courseCheck) {
            res.json({
                msg: "course already exist",
                code: 5000


            })


        } else {


            let getCategory = await addCategorySchema.findOne({ categorys: reqData.category })

            let query = {
                categoryId: getCategory._id,
                categorys: getCategory.categorys,
                course: reqData.course
            }

            let withCourse = await new addCourseWithCatSchema(query)
            let result = await withCourse.save()
            if (result) {
                res.json({
                    msg: "course added sucessfully",
                    code: 2000,
                    data: result
                })
            } else {
                res.json({
                    msg: "course addition failed",
                    code: 5000
                })
            }
        }


    } else {

        let getCateg = await addCategorySchema.findOne({ categorys: reqData.category })
        if (getCateg) {
            let query = {
                categoryId: getCateg._id,
                categorys: getCateg.categorys,
                course: reqData.course
            }
            let result = await new addCourseWithCatSchema(query)
            let newCourse = await result.save()
            if (newCourse) {
                res.json({
                    msg: "course added sucessfully",
                    code: 2000,
                    data: newCourse
                })
            } else {
                res.json({
                    msg: "course addition failed",
                    code: 5000
                })
            }

        } else {
            res.json({
                msg: "no iddddd",
                code: 5000
            })
        }

    }


}









async function getAllCourseWithCategory(req, res) {

    let courseCategory = await addCourseWithCatSchema.find()
    if (courseCategory) {
        res.json({
            msg: "details found sucessfully",
            result: courseCategory,
            code: 2000
        })
    } else {
        res.json({
            msg: "details not found",
            code: 5000
        })
    }
}

async function sendEmail(req, res) {
    reqData = req.body
    let result = await stuRegSchema.findOne({ email: reqData.email })
    if (result) {
        const emailId = result.email
        console.log("email", emailId)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            //use this link to give 3rd party acess with gmail https://www.google.com/settings/security/lesssecureapps//
            auth: {
                user: 'javidshaik419@gmail.com',
                pass: '11196789@Gbi'
            }
        });
        const link = `http://localhost:4200/enterPass/${result._id}`

        var mailOptions = {
            from: 'javidshaik419@gmail.com',
            to: emailId,
            subject: 'link to change your password',
            html: `<p> Hi <br> Please <a target=\"_blank\" href=${link}>click here </a> to reset your password </p>`


        };

        transporter.sendMail(mailOptions, function (error, info) {
            console.log("information email", info);
            if (error) {
                console.log("error", error);
            } else {
                console.log('Email sent: ' + info.response, "inffooo");
            }
        });
        res.json({
            msg: "email sent sucessfully to " + emailId,
            code: "2000"
        })
    } else {
        res.json({
            code: 5000,
            msg: "email doesNot exist"
        })
    }
}


async function forGetPassword(req, res) {
    reqBody = req.body
    if (reqBody.newPassword == reqBody.confirmPassword) {
        let result = await stuRegSchema.findOne({ _id: reqBody.id })
        if (result) {
            let newPasswordz = reqBody.newPassword
            let confirmPassword = reqBody.confirmPassword

            let hashedPassword = passwordHash.generate(newPasswordz)
            console.log("result", hashedPassword)


            let changedPassword = {
                password: hashedPassword,
            }
            const query = {
                $set: changedPassword,


            }

            const newPassword1 = await stuRegSchema.updateOne({ _id: reqBody.id }, query);

            if (newPassword1) {
                console.log("rasdfsdf", newPassword1);
                res.json({
                    code: 200,
                    msg: "password Upadted successfully!"
                })
            }

            else {
                res.json({
                    code: 5000,
                    msg: 'password update failed',
                })

            }

        } else {
            res.json({
                msg: "id not found",
                code: 5000
            })

        }

    } else {
        res.json({
            msg: "confirm password and new password does not match",
            code: 5000
        })
    }
}







async function aggregations(req, res) {

  let reqBody=req.body
  console.log("hiii",reqBody)



}


const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

function convert(originalName, buffer) {

    let extension = path.extname(originalName);
    // console.log(extension, "array")

    return parser.format(extension, buffer).content;

}

async function profilPicture(req, res) {
    if (req['files']) {
        var k = req['files']['image'].type;
        if (k == "image/jpeg" || k == "image/png") {
            if (req['files']['image'].size <= 1024 ** 1024 * 2) {
                const { path, originalFilename } = req['files']['image'];
                const imageData = fs.readFileSync(path);
                const ext = originalFilename.substr(originalFilename.lastIndexOf('.'));

                const newFilename = `jav_${Date.now() + randomstring.generate({ length: 8 })}${ext}`;
                cloudinary.config({
                    cloud_name: "javeed",
                    api_key: "954763346381161",
                    api_secret: "xZxDzaTUPcjihL1Da0Dryx2nBsY"
                });


                const imageObj = convert(
                    newFilename,
                    imageData
                );

                const imageUrl = await cloudinary.uploader.upload(imageObj);
                console.log(imageUrl,"link")
                let query = {
                    picUrl: imageUrl.secure_url
                }
                let Url = await new addprofileSchema(query)
                let result = await Url.save()
                if (result) {
                    res.json({
                        msg: "image  saved sucessfully ",
                        code: 2000,
                        data: result
                    })
                } else {
                    res.json({
                        msg: "image save failed",

                        code: 5000
                    })
                }
            } else {
                res.json({
                    msg: "size is more",

                    code: 5000
                })
            }
        } else {
            res.json({
                msg: "not a proper file format",
                code: 5000
            })

        }
    } else {
        res.json({
            msg: "file size is not in limits",
            code: 5000
        })
    }

    // multiple upload

    // if (req['files']) {
    //     for (const obj in req['files']) {
    //         const { path, originalFilename } = req['files'][obj];
    //         const imageData = fs.readFileSync(path);
    //         const ext = originalFilename.substr(originalFilename.lastIndexOf('.'));

    //         const newFilename = `jav_${Date.now() + randomstring.generate({ length: 8 })}${ext}`;
    //         cloudinary.config({
    //             cloud_name: "javeed",
    //             api_key: "954763346381161",
    //             api_secret: "xZxDzaTUPcjihL1Da0Dryx2nBsY"
    //         });

    //         const imageObj = convert(
    //             newFilename,
    //             imageData
    //         );
    //         const imageUrl = await cloudinary.uploader.upload(imageObj);
    //         console.log("where", imageUrl.secure_url)



    //     }
    // } else {
    //     res.json({
    //         msg: "not a proper file format",
    //         code: 5000
    //     })
    // }




}
async function moment(req,res){
    console.log(moment().format('LT'))
}


module.exports = {
    adminRegister,
    adminLogin,
    addCategory,
    addBranch,
    editCategory,
    deleteCategory,
    addCourses,
    getAllCategoryes,
    getAllBranches,
    getAllCourse,
    editBranch,
    deleteBranch,
    editCourse,
    deleteCourse,
    stuRegister,
    getAdminDetails,
    stuLogin,
    getStuDetails,
    getAllStudents,
    stuEdit,
    addCourseWithCategory,
    getAllCourseWithCategory,
    sendEmail,
    forGetPassword,
    aggregations,
    profilPicture,
    moment
}


