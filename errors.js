function defaultError(){
  return {
    status: '400',
    title: 'Bad Request',
    detail: 'Something went wrong'
  }
}

var errors = {
  notFound: function(comment){
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