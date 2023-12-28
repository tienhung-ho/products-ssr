module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    console.log('13123123');
    req.flash('error', 'Empty title')
    res.redirect('back')
    return
  }
  next()
}
