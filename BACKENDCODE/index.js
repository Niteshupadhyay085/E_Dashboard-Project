const express = require('express'); 

const {connectToMongoDb} = require('./Db/config');
const User = require('./db/user');

const Product = require('./db/Product');

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const cors = require('cors');


const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

connectToMongoDb('mongodb://localhost:27017/e-commerce')
.then(() => console.log("Mongodb Connected"));

app.post("/register", async (req,res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password

    Jwt.sign({result}, jwtKey, {expiresIn: "2h"}, (err, token) => {
        if(err){
            res.send("Somthing went wrong")
        }
        res.send({result, auth:token})
    })
    
})


app.post("/login", async (req, res) => {
    console.log(req.body)
    if(req.body.password && req.body.email){

        let user = await User.findOne(req.body).select("-password");
       
        if(user){
            Jwt.sign({user}, jwtKey, {expiresIn: "2h"}, (err, token) => {
                if(err){
                    res.send("Somthing went wrong")
                }
                res.send({user, auth:token})
            })


            //res.send(user)
        }
        else{
            res.send({result: "No User Found"})
        }

    }
    else{
        res.send({result: "Please Send the proper data..."})
    }
});



app.post("/add-product", async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get("/products",async (req, res) => {
    let products = await Product.find();
    if(products.length > 0){
        res.send(products)
    }
    else{
        res.send({result: "No Products Found"});
    }
})

app.delete("/product/:id", async (req, res) => {
    const result = await Product.deleteOne({_id: req.params.id})
    res.send(result);
});


app.get("/product/:id", async(req, res) => {
    const result = await Product.findOne({_id: req.params.id})
    if(result){
        res.send(result)
    }
    else{
        res.send({result: "No Record found"})
    }
})

app.put("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, category, company } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            price,
            category,
            company
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Server Error" });
    }
});


app.get("/search/:key", async (req, res) => {
    let result = await Product.find({
        "$or" : [
            {name: {$regex: req.params.key, $options: 'i'}}, 
            {company: {$regex: req.params.key, $options: 'i'}},
            {category: {$regex: req.params.key, $options: 'i'}}

        ]
    });
    res.send(result)
})

app.listen(PORT, () => console.log(`Server Started at the Port: ${PORT}`));
