/*
*  functions to format data returned from the database
*  as valid JSON API responses according to jsonapi.org
*  TODO: handle associations
*/
function formatItem(item){
  // sequelize internal properties
  var className = item['$modelOptions']['name']['plural']
  var itemAttributes = item.toJSON()
  delete itemAttributes.id

  return {
    id: item.id,
    type: className,
    attributes: itemAttributes
  }
}

function formatList(list){
  return list.map(formatItem)
}

function format(data){
  var payload;
  if(data instanceof Array){
    payload = formatList(data)
  } else {
    payload = formatItem(data)
  }

  return {
    data: payload
  }
}

module.exports = format