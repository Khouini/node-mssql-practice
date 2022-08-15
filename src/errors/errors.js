function errorHandler(error, res) {
  if (error.details[0].message)
    return res.status(403).send({ msg: 'Schema validation error:', errorMessage: error.details[0].message });
  if (error.name === 'RequestError')
    return res.status(403).send({ msg: 'RequestError: MS SQL', errorMessage: error.originalError.info.message });
  console.log(error);
  return res.status(500).send({ error: 'Something went wrong' });
}
export default errorHandler;
