const productSchema = require("../models/product")


//Middleware to get a product by its Id

exports.getProductById = (req, res, next, id) => {
  console.log('Called', id)
  productSchema.findOne({ _id: id })
    .exec((err, product) => {
      if (err || !product) {
        return res.json(err)
      }
      req.product = product
      console.log("REQ>PROD",req.product)
      next();
    })
}

//Controller to display product details passed by getProductById middleware

exports.getAProduct = (req, res) => {

  return res.json(req.product);

}


//Controller to create a product 


exports.createProduct = (req, res) => {

  const product = new productSchema(req.body)

  product.save((err, product) => {
    if (err) {
      return res.json({
        error: err
      })
    }
    return res.json(product);
  })
}


// Controller to get all the products created

exports.getAllProduct = (req, res) => {
    productSchema.find()
    .exec((err, product) => {
      if (err || !product) {
        return res.json(err)
      }
      return res.json(product)
    })
}


//Controller for updating product details 



exports.updateProductDetails = (req, res) => {
    console.log('Called', req.product)
  productSchema.findByIdAndUpdate(
    { _id: req.product._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, product) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(product);
    }
  );
};


//Controller for deleting a session 

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this product"
      });
    }
    res.json({
      message: "Successfully deleted"
    });
  });
}




