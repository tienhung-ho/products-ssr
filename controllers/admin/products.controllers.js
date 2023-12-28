const { prefix_admin } = require("../../config/system")
const Products = require('../../models/products.model')
const filterStatusHelper = require('../../helpers/filterStatus.helper')
const searchHelper = require('../../helpers/search.helper')
const paginationHelper = require('../../helpers/pagination.helper')
const system = require("../../config/system")

//[GET], find, dislay /admin/products
module.exports.index = async (req, res) => {

  try {
    const filterStatus = filterStatusHelper(req.query)
    const searchOjb = searchHelper(req.query)

    const objFind = {
      deleted: false
    }

    if (req.query.status) {
      objFind.status = req.query.status
    }

    var keyword = ''

    if (req.query.keyword) {
      objFind.title = searchOjb.regex
    }
    let initpaginationObj = {
      currPage: 1,
      limitItem: 4
    }
    const counterProduct = await Products.count(objFind)
    const paginationObj = paginationHelper(initpaginationObj, req.query, counterProduct)

    const products = await Products.find(objFind)
      .sort({ position: "desc" })
      .limit(paginationObj.limitItem)
      .skip(paginationObj.skip)

    const newProduct = products.map(item => {
      item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(2)
      return item
    })

    if (products.length > 0 || counterProduct == 0) {
      res.render(`admin/pages/products/index.pug`, {
        pageTitle: 'Products-admin',
        products: newProduct,
        filterStatus,
        keyword: searchOjb.keyword,
        paginationObj
      })
    }
    else {
      let stringQuery = "";

      for (const key in req.query) {
        if (key != "page") {
          stringQuery += `&${key}=${req.query[key]}`;
        }
      }

      const href = `${req.baseUrl}?page=1${stringQuery}`;

      res.redirect(href);
    }

  }
  catch (err) {
    res.redirect('back')
  }

}

//[PATCH] change status /admin/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const status = req.params.status
    const id = req.params.id
    await Products.updateOne({ _id: id }, { status: status })
    req.flash('success', 'Updated!')
    res.redirect('back')
  }
  catch (err) {
    res.redirect('back')
  }
}

//[PATCH] change multi product /admin/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const type = req.body.type
    const ids = req.body.ids.split(", ")

    switch (type) {
      case 'active':
      case 'inactive':
        await Products.updateMany(
          { _id: { $in: ids } },
          { status: type }
        )
        req.flash('success', `${ids.length} Updated!`)
        break
      case 'delete-multi':
        await Products.updateMany(
          { _id: ids },
          {
            deleted: true,
            deletedAt: new Date()
          }

        )
        req.flash('success', `${ids.length} Deleted!`)
        break
      case 'change-position':
        console.log(ids);
        for (const item of ids) {
          const [id, position] = item.split('-')

          await Products.updateOne({ _id: id }, { position: position })
        }
        req.flash('success', `${ids.length} Updated positions!`)
        break
      default:
        break
    }

    res.redirect('back')

  }
  catch (err) {
    res.redirect('back')
  }
}

//[DELETE] delete product /admin/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id
    await Products.updateOne({ _id: id }, {
      deleted: true,
      deletedAt: new Date()
    }
    )
    res.redirect('back')
  }
  catch (err) {
    res.redirect('back')
  }
}

//[GET] dislay create new product /admin/create
module.exports.create = async (req, res) => {
  try {
    res.render(`admin/pages/products/create.pug`, {
      pageTitle: 'Products-admin',
    })
  }
  catch (err) {
    console.log('create err');
  }
}

//[POST] create new product /admin/create
module.exports.createPost = async (req, res) => {

  req.body.price = parseInt(req.body.price)
  req.body.stock = parseInt(req.body.stock)
  req.body.discountPercentage = parseFloat(req.body.discountPercentage)
  
  if (req.body.position === '') {
    const countDocuments = await Products.countDocuments({});
    req.body.position = countDocuments + 1
  }
  else {
    req.body.position = parseInt(req.body.position)
  }

  const product = new Products(req.body)

  await product.save()

  res.redirect(`/${prefix_admin}/products`)


}


//[GET] dislay edit product /admin/edit
module.exports.edit = async (req, res) => {

  try {
    const id = req.params.id

    const product = await Products.findOne({
      _id: id,
      deleted: false
    })

    res.render(`admin/pages/products/edit.pug`, {
      pageTitle: 'Products-admin-edit',
      product
    })
  }
  catch (err) {
    console.log(err);
  }

}


//[PATCH] edit product /admin/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id

    req.body.price = parseInt(req.body.price)
    req.body.stock = parseInt(req.body.stock)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.position = parseInt(req.body.position)
    req.flash('success', 'Update complete!')

    await Products.updateOne({
      _id: id
    },
      req.body
    )

  }
  catch (err) {
    console.log(err);
  }



  res.redirect(`/${prefix_admin}/products`)
}

//[GET] dislay detail product /admin/detail
module.exports.detail = async (req, res) => {

  try {
    const id = req.params.id

    const product = await Products.findOne({
      _id: id,
      deleted: false
    })

    res.render(`admin/pages/products/detail.pug`, {
      pageTitle: 'Products-admin-edit',
      product
    })
  }
  catch (err) {
    req.flash('error', 'Product does not exist')
    res.redirect(`/${prefix_admin}/products`)
  }

}
