const lodash = require('lodash')
const data = require('./sales.json')

module.exports = (req, res) => {
  const {
    from = 0, limit = 10, sort = 'id', order = 'asc', search = '', filters = {}
  } = req.body

  const fromInt = parseInt(from, 10)
  const limitInt = parseInt(limit, 10)

  const filtered = data.filter(item => {
    const str = JSON.stringify(item)
    return str.includes(search) && lodash.isMatch(item, filters)
  })

  const sortedData = lodash.orderBy(filtered, sort, order)
  const slicedData = sortedData.slice(fromInt * limitInt, (fromInt + 1) * limitInt)
  const pages = Math.ceil(data.length / limitInt)
  res.send({
    length: filtered.length,
    pages,
    from,
    limit,
    data: slicedData,
  })  
}