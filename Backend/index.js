require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;
const MongoUrl = process.env.MONGO_URL;
const app = express();

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
const bodyParser = require("body-parser");
const cors = require("cors");

const cookieParser = require('cookie-parser');
const authRoute = require("./routes/AuthRoute");

app.use(cors({
  origin: ["http://localhost:3001", "http://localhost:3000"], // frontend ka origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // cookies / auth headers allow
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// all holdings data fetching
app.get("/allHoldings", async (req, res) => {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});

// backend of signup and login 


// data insertion when new user put their inmormation in it
app.post("/newOrder", async (req, res) => {

    try {
        console.log("req.body is == ", req.body);
        const newOrder = new OrdersModel({
            name: req.body.name,
            qty: req.body.qty,
            price: req.body.price,
            mode: req.body.mode,
        });

        await newOrder.save();

        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

app.get("/allOrders", async (req, res) => {
    let allOrders = await OrdersModel.find({});
    res.json(allOrders);
});

app.listen(PORT, () => {
    console.log("app started");
    mongoose.connect(MongoUrl,{
    }).then(()=> console.log("MongoDB connected successfully"))
    .catch((err) => console.error(err));
});

// signup 

app.use(cookieParser());
app.use("/", authRoute);
