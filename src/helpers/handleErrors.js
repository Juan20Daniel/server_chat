var errorMessages = {
    LIMIT_PART_COUNT: 'Too many parts',
    LIMIT_FILE_SIZE: 'El archivo es demaciado grande',
    LIMIT_FILE_COUNT: 'Too many files',
    LIMIT_FIELD_KEY: 'Field name too long',
    LIMIT_FIELD_VALUE: 'Field value too long',
    LIMIT_FIELD_COUNT: 'Too many fields',
    LIMIT_UNEXPECTED_FILE: 'Unexpected field',
    MISSING_FIELD_NAME: 'Field name missing'
  }
const errorHandler = (err, req, res, next) => {
  let error = err.code;
  if(err.code) error = errorMessages[err.code];
  if(!err.code) error = err.message;
  console.log(err);
  res.status(err.status??500).json({
    success:false,
    message:error
  });
}

module.exports = errorHandler;
  