const homeRouter = require('./home.route')
const productsRouter = require('./products.route')

function Routes (app) {

    app.use('/', homeRouter)
    
    app.use('/products', productsRouter)
}

module.exports = Routes