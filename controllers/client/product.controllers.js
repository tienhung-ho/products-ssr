const Products = require("../../models/products.model.js")


// [GET] display information of product /products/edit
module.exports.edit = (req, res) => {
    res.render('client/pages/products/edit.pug', {
        pageTitle: 'Edit page'
    })
}

// [GET] add new product /products/add
module.exports.add = (req, res) => {
    res.send('<h1> Add products </h1>', )
}

// [GET] display  product /products
module.exports.index = async (req, res) => {
  try {
    const products = await Products.find({
        deleted: false,
        status: "active"
    }).sort( { position: 'desc' } )

    const newProduct = products.map(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(2)
        return item
    })

    res.render('client/pages/products/index.pug', {
        pageTitle: 'Products',
        products: newProduct
    })
  }
  catch(err) {
    console.log(err);
  }
}

// [GET] display detail of product /products/detail/:slug
module.exports.detail = async (req, res) => {

  try {

    const slug = req.params.slug

    const product = await Products.findOne({
      slug,
      deleted: false,
      status: 'active'
    })

    res.render('client/pages/products/detail.pug', {
      pageTitle: "Details",
      product
    })

  }
  catch (err) {
    res.redirect('/')
  }


}

