function defaultError(){
  return {
    status: '400',
    title: 'Bad Request',
    detail: 'Something went wrong'
  }
}

function MyError(message) {
  this.name = 'MyError';
  this.status = '404'
  this.title = 'Not Found'
  this.message = message || 'Default Message';
  this.stack = (new Error()).stack;
}
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

var errors = {
  notFound: function(comment){
    return new MyError(comment)
    var errorObj = {
      status: '404',
      title: 'Not Found'
    }
    if(comment){
      errorObj.detail = comment
    }
    return errorObj
  },

  forbidden: function(comment){
    var errorObj = {
      status: '403',
      title: 'Forbidden'
    }
    if(comment){
      errorObj.detail = comment
    }
    return errorObj
  },

  unauthorized: function(comment){
    var errorObj = {
      status: '401',
      title: 'Unauthorized'
    }
    if(comment){
      errorObj.detail = comment
    }
    return errorObj
  }
}

module.exports = errors