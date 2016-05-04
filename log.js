var bunyan = require('bunyan'),
  bformat = require('bunyan-format'),
  formatOut = bformat({ outputMode: 'short' })
// log to file in prod, stdout in dev
function liteReqSerializer(req){
  return {
    method: req.method,
    url: req.url
    // header: req.headers
  }
}

var logger
if(process.env.NODE_ENV === 'production'){
   logger = bunyan.createLogger({
      name: "ProductionLogger",
      serializers: bunyan.stdSerializers,
      streams: [{
        type: 'rotating-file',
        path: 'var/log/app.log',
        period: '1w',   // weekly rotation
        count: 4        // keep 4 back copies
      },
      {
        stream: process.stdout
      }]
  });
} else {
  logger = bunyan.createLogger({
      name: "DevelopmentLogger",
      serializers: {
        req: liteReqSerializer,
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err
      },
      streams: [
        {
          stream: formatOut
        }
      ]
  });
}

module.exports = logger