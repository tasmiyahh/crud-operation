import express from "express"
import cors from "cors"
import mongoose from "mongoose"



const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cors(
  {
    origin : ['http://localhost:3000' ,'https://crud-fba3d.web.app', "*"],
    credentials : true
  }
))

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    code: { type: String }



  });
const productModel = mongoose.model('product', productSchema);


app.post('/product', async (req, res) => {
  console.log("product received", req.body)
  let newProduct = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    code: req.body.code
  })
  try {
    let response = await newProduct.save()
    console.log("product added", response)
    res.send({
      message: "product added",
      data: response
    })

  }

  catch (error) {
    console.log("failed to add product" , error)
    res.status(500).send({
      message: "failed to add product"
    })
  }
})




app.get('/products', async (req, res) => {
  try {
    let products = await productModel.find({}).exec()
    console.log("all products", products)
    res.send({
      message: "all product",
      data: products
    })
  }

  catch {
    res.send({
      message: "error in getting all products"
    })
  }
})

app.get('/product/:id', async (req, res) => {

  try {
    let product = await productModel.findOne({ _id: req.params.id }).exec()
    res.send({
      message: "product",
      data: product
    })
  }
  catch {
    res.send({
      message: "error in getting product"
    })

  }
})


app.delete('/product/:id', async (req, res) => {
  try {
    let deleted = await productModel.deleteOne({ _id: req.params.id }).exec()
    res.send({
      message: "product deleted",
      data: deleted
    })
  }
  catch {
    res.send({
      message: "error in deleting product"
    })
  }
})

app.put('/product/:id', async (req, res) => {

  console.log("product to be edit", req.body)
  let update = {}
  if (req.body.name) update.name = req.body.name //agr ye ho tw updte me ye dal do
  if (req.body.description) update.description = req.body.description
  if (req.body.price) update.price = req.body.price
  if (req.body.code) update.code = req.body.code

  try {
    let edit = await productModel.findOneAndUpdate({ _id: req.params.id },
      update, { new: true }).exec() //check thhese on mongoose doc eg

    console.log("updated product", edit)
    res.send({
      message: "product updated successfully",
      data: edit
    })
  }
  catch {
    res.send({
      message: "error in updating product"
    })
  }




})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let dbURI = process.env.dbURI || 'mongodb+srv://tasmiyah:web@cluster0.cj82tmo.mongodb.net/crud?retryWrites=true&w=majority';
mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
  console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
  console.log('Mongoose connection error: ', err);
  process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection closed');
    process.exit(0);
  });
});