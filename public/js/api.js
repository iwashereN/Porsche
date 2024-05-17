const express = require("express");

const app = express();

require("dotenv").config()
const port =  2000
   // Middleware for authenticating token
   const jwt = require('jsonwebtoken');
   const JWT_SECRET_KEY = 'clowns';

   // Define a middleware function to verify JWT token
function verifyToken(req, res, next) {
    const head = req.headers['authorization'];
    const token = head && head.split(' ')[1]
    if (token == null) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
         // console.log(user)
            return res.status(403).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = user; // Store decoded user information in the request object
        next(); // Call next middleware
    });
} 
const {connectToDb,getDbConn} = require("./db1")
const {ObjectId} = require("mongodb")
app.use(express.json());
let db
connectToDb((err)=>{
    if(!err){
        app.listen(port,()=>{
            console.log("its ookkk")
            console.log(port)
        })
        db = getDbConn()
    }
    else{
        console.log("nooo")
    }
})

//Nancy
app.post("/api/auth/signup", async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // Check if the email is already registered
        const existingUser = await db.collection("Customer").findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        // Create user object
        const newUser = {
            email,
            password,
            name,
        };
        // Insert user into the database
        const result = await db.collection("Customer").insertOne(newUser);
        
        // Generate JWT token
        const token = jwt.sign({ email: newUser.email, name: newUser.name }, JWT_SECRET_KEY, { expiresIn: '1h' });

        // Respond with token
        res.status(200).json({ message: "Signup successful", token: token });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }})

    app.post("/api/auth/login", async (req, res) => {
        const { email, password } = req.body;
    
        try {
            // Find user by email
            const user = await db.collection("Customer").findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Check if passwords match
            if (password !== user.password) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
    
            const token = jwt.sign({ email: email, password: password }, JWT_SECRET_KEY, { expiresIn: '1h' });

            // Respond with token
            res.status(200).json({ message: "Login successful", token: token ,user : user});
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    //Menna
    app.get('/api/customer/profile/:email',verifyToken, async (req, res) => {
        try {
            const {email} = req.params;
           
            // Access the collection containing customer profiles
            const collection = db.collection('Customer');
    
            // Find the customer profile based on the provided username
            console.log(req.params)
            const customerProfile = await collection.findOne({email});
    
            // Check if customer profile exists
            if (!customerProfile) {
                return res.status(404).json({ message: 'Customer profile not found' });
            }
    
            // If profile exists, send it as a response
            res.status(200).json(customerProfile);
        } catch (error) {
            console.error('Error retrieving customer profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.put('/api/customer/updateprofile/:email', async (req, res) => {
        try {
            const { email } = req.params;
            console.log(req.params)
            // Access the collection containing customer profiles
            const collection = db.collection('Customer');
    
            // Find the customer profile based on the provided email
            const customerProfile = await collection.findOne({ email });
    
            // Check if customer profile exists
            if (!customerProfile) {
                return res.status(404).json({ message: 'Customer profile not found' });
            }
            
            const updatedProfileData = req.body ;
            await collection.updateOne({ email }, { $set: updatedProfileData });
    
            res.status(200).json({ message: 'Customer profile updated successfully' });
        } catch (error) {
            console.error('Error updating customer profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    //Aya
    app.delete('/api/admin/customers/delete/:customerId', async (req, res) => {
        const customerId = req.params.customerId;
        console.log(req.params);
        try {
            // Check if the customer exists in the database
            const customer = await db.collection('Customer').findOne({ _id: new  ObjectId(customerId) });
    
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
    
            // If the customer exists, delete it from the database
            await db.collection('Customer').deleteOne({ _id: new ObjectId(customerId) });
    
            res.json({ message: "Customer deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    //Radwa
 
  app.post('/api/admin/products/create',async (req, res) => {
    try {
      // Extract product data from request body
      const { name, price, description } = req.body;
  
      // Insert the new product into the database
      db.collection("Products").insertOne({ name, price, description }, (err, result) => {
        if (err) {
          console.error("Cannot insert product into database:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        // Product inserted successfully
        res.status(201).json({ message: 'Product created successfully', product: result.ops[0] });
      });
    } catch (err) {
      // If there's any error, send error response
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/admin/products/update/:id', async (req, res) => {
    try {
        const productID = req.params.id;
       
        // Access the collection containing products
        const collection = db.collection('Products');

        // Find the product based on the provided ID
        const product = await collection.findOne({ _id: new ObjectId(productID) });

        // Check if product exists
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        const updatedProductData = req.body ;
        // Update the product using updateOne
        await collection.updateOne({ _id: new ObjectId(productID) }, { $set: updatedProductData });

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating Product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Miriam
app.put('/api/admin/customers/update/:id', async (req, res) => {
    const id = req.params.id;
    const updatedDetails = req.body;

    try {
        const objectId = new ObjectId(id); // Create an ObjectID instance

        const result = await db.collection("Customer").updateOne(
            { _id: objectId }, // Use ObjectID in the query
            { $set: updatedDetails }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Customer not found in customer database" });
        }

        res.json({ message: "Customer details updated successfully in customer database" });
    } catch (error) {
        console.error("Error updating customer details in customer database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Basma
app.get('/api/admin/customers/:name', async (req, res) => {
    const customerId = req.params.name;

    try {
        // Find the customer by ID in the database
        const customer = await db.collection("Customer").findOne({ name: customerId });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Return the customer details
        res.status(200).json(customer);
    } catch (error) {
        console.error('Error retrieving customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//Mayar
app.delete('/api/admin/products/delete/:id',async (req, res) => {
    // Extract product ID from request parameters
    const productId = req.params.id;

    try {
        // Implement deletion logic here using MongoDB
        // For example:
         await db.collection('Products').deleteOne({ _id: new ObjectId(productId) });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/admin/customers', async (req, res) => {
    try {

        const customers = await db.collection("Customer").find().toArray();
        res.status(200).json(customers);
    } catch (error) {
        console.error("Error retrieving customers:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Mariam
app.get("/api/products", async (req, res) => {
    try {
      const products = await db.collection("Products").find().toArray();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.get("/api/products/:id", async (req, res) => {
    const productId = req.params.id;
     try {
       if (ObjectId.isValid(productId)) {
         const product = await db.collection("Products").findOne({ _id: new ObjectId(productId) });
         if (product) {
           res.status(200).json(product);
         } else {
           res.status(404).json({ error: "Product not found" });
        }
       } else {
         res.status(400).json({ error: "Invalid product ID" });
       }
   } catch (error) {
     console.error("Error fetching product:", error);
     res.status(500).json({ error: "Internal server error" });
   }
 });