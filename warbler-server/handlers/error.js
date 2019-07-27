// we make a middle ware for errors
//we check if the response status is 500 or anything other than 404
//.json attached to give error output in json format
function errorHandler(err, req, res, next){
  return res.status(err.status || 500).json({
    error: {
      message: err.message || "Oops something is wrong"
    }
  });
}

module.exports = errorHandler;
