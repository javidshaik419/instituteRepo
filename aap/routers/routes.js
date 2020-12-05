var controllers=require('../controllers/controllers')
var jwt=require("../utils/auth")
const multipart = require('connect-multiparty');


const multipartMiddleware = multipart();

function api(appExpress){
    appExpress.post("/api/adminRegister",controllers.adminRegister)
    appExpress.post("/api/stuRegister",controllers.stuRegister) 
    appExpress.post("/api/stuLogin",controllers.stuLogin)
    appExpress.post("/api/getStuDetails",jwt.verifyToken,controllers.getStuDetails)
    appExpress.post("/api/stuEdit",controllers.stuEdit)


    appExpress.post("/api/addCourseWithCategory",controllers.addCourseWithCategory)
    appExpress.get("/api/getAllCourseWithCategory",controllers.getAllCourseWithCategory)
    appExpress.post("/api/aggregations",controllers.aggregations)


    appExpress.get("/api/moment",controllers.moment)






    appExpress.post("/api/adminLogin",controllers.adminLogin)
    appExpress.post("/api/getAdminDetails",jwt.verifyToken,controllers.getAdminDetails)

    appExpress.post("/api/addCategory",controllers.addCategory)
    appExpress.post("/api/addBranch",controllers.addBranch)
    appExpress.post("/api/addCourses",controllers.addCourses)

    appExpress.post("/api/editCategory",controllers.editCategory)
    appExpress.post("/api/deleteCategory",controllers.deleteCategory)

    appExpress.post("/api/editBranch",controllers.editBranch)
    appExpress.post("/api/deleteBranch",controllers.deleteBranch)

    appExpress.post("/api/editCourse",controllers.editCourse)
    appExpress.post("/api/deleteCourse",controllers.deleteCourse)

    appExpress.get("/api/getAllCategoryes",controllers.getAllCategoryes)
    appExpress.get("/api/getAllBranches",controllers.getAllBranches)
    appExpress.get("/api/getAllCourse",controllers.getAllCourse)
    appExpress.get("/api/getAllStudents",controllers.getAllStudents)

    appExpress.post("/api/sendEmail",controllers.sendEmail)
    // single is used for single image upload
    // array is used for multiple image upload 

    appExpress.post("/api/forGetPassword",controllers.forGetPassword)
    appExpress.post('/api/profilPicture',multipartMiddleware,controllers.profilPicture);


    
    appExpress.get("/api/hbs",function(req,res){
        res.render("index",{variable:"javeed"})
    })


















}
module.exports={
    api
}