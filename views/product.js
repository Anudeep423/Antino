const express = require("express");

const router = express.Router();

const {getProductById,getAProduct,createProduct,
    getAllProduct,updateProductDetails,deleteProduct} = require("../controllers/product")

const {getUserById,isAdmin}  = require("../controllers/users")

// middlewares

router.param("userID",getUserById );
router.param("productId",getProductById);


// protected route to create a product

router.post("/create/product/:userID" , isAdmin , createProduct ); 

// protected route to update a product

router.put("/update/product/:userID/:productId" , isAdmin , updateProductDetails )

// protected route to delete a product 

router.delete("/delete/product/:userID/:productId", isAdmin, deleteProduct )

// public route to get all products

router.get("/getallproducts", getAllProduct)

// public route to get product detail

router.get("/getproductdetails/:productId", getAProduct)


module.exports = router