const {constants} = require("../constants")

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.StatusCode : 500
    res.json({message : err.message , stackTrace : err.stack})
    switch(statusCode){
        case constants.VALIDATION_ERROR :
            res.json({title:"Validation Failed",message : err.message , stackTrace : err.stack})
        case constants.NOT_FOUND:
            res.json({title:"Not Found",message : err.message , stackTrace : err.stack})
        case constants.UNAUTHORIZED:
            res.json({title:"Unauthorized",message : err.message , stackTrace : err.stack})
        case constants.FORBIDDEN:
            res.json({title:"Forbidden",message : err.message , stackTrace : err.stack})
        case constants.SERVER_ERROR:
            res.json({title:"Server error",message : err.message , stackTrace : err.stack})
        default:
            console.log("No Error, All Good!")
            break
    }
}


module.exports = errorHandler