const Kart = require('../models/shoppingKart');
const Auth = require('../models/authenticate');
const Chout = require('../models/checkout');

exports.addNewItem = async (req, res) => {
    const number = req.body.number;
    const itemName = req.body.itemName;
    const quantity = req.body.quantity;
    const pass = req.body.password;
    if(await Auth(number,pass)==true){
        console.log("password correct");
        const kart = new Kart(number);
        await kart.addItem(itemName,quantity);
        res.send("Data updated");
        res.status(200);
    }
    else{
        res.status(401).send("Invalid Authorization");
    }
};

exports.authenticate = async (req,res) =>{
    const number = req.body.number;
    const pass = req.body.password;
    const x = await Auth(number,pass);
    if (x==1) {
        res.status(200).send("Authentication successful");
    } else if(x==2){
        res.status(402).send("Authentication failed (Unregistered user)");
    }
    else {
        res.status(401).send("Authentication failed");
    }
};


exports.getItems = async (req,res) =>{
    const number = req.body.number;
    const pass = req.body.password;
    if(await Auth(number,pass)==true){
        const kart = new Kart(number);
        const data = await kart.getItems();
        res.status(200).json(data);
        console.log(data);
    }
    else{
        res.status(401).send("Invalid Authorization");
    }

}

exports.checkout = async (req,res) =>{
    const number = req.body.number;
    const pass = req.body.password;
    if(await Auth(number,pass)==true){
        const kart = new Kart(number);
        const data = await kart.getItems();
        const checkoutStatus = await Chout(number,data);
        console.log(checkoutStatus);
        if(checkoutStatus){
            res.status(200).send("CheckOut Successful");
        }
        else{
            res.status(402).send("Low balance");
        }
    }
    else{
        res.status(401).send("Invalid Authorization");
    }
}

exports.getBalance = async (req,res)=>{
    const number = req.body.number;
    const pass = req.body.password;
    if(await Auth(number,pass)==true){
        const kart = new Kart(number);
        const data = await kart.getBalance();
        res.status(200).send(String(data));
        console.log(data);
    }
    else{
        res.status(401).send("Invalid Authorization");
    }
}

exports.deleteItem = async (req,res)=>{
    const number = req.body.number;
    const itemName = req.body.itemName;
    const pass = req.body.password;
    if(await Auth(number,pass)==true){
        const kart = new Kart(number);
        await kart.deleteItem(itemName);
        console.log("deleted");
        res.send("Data updated");
        res.status(200);
    }
    else{
        res.status(401).send("Invalid Authorization");
    }
}
