var createCustomError = require('custom-error-generator');

var UnauthorizedError   = createCustomError('UnauthorizedError',  { 'status' : 401, 'title' : 'Unauthorized' });
var ForbiddenError      = createCustomError('ForbiddenError',     { 'status' : 403, 'title' : 'Forbidden' });
var NotFoundError       = createCustomError('NotFoundError',      { 'status' : 404, 'title' : 'Not Found' });
var ValidationError     = createCustomError('ValidationError',    { 'status' : 422, 'title' : 'Unprocessable Entity' });
var InternalServerError = createCustomError('InternalServerError', { 'status' : 500, 'title' : 'Internal Server Error' });

var errors = {
  notFound: NotFoundError,

  forbidden: ForbiddenError,

  unauthorized: UnauthorizedError,

  validation: ValidationError,

  internal: InternalServerError
}

module.exports = errors