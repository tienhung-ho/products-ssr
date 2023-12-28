const { prefix_admin } = require('../../config/system.js')
const dashboardRouter = require('./dashboard.route.js')
const productRouter = require('./products.route')


function Routes (app) {
    app.use(`/${prefix_admin}/dashboard`, dashboardRouter)

    app.use(`/${prefix_admin}/products`, productRouter)

}


module.exports = Routes