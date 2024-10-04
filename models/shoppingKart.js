const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKeys.json");
const price = require("./prices");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const customerRef = db.collection("ongoing shopping data");
const balanceRef = db.collection("registered users");


class Kart{
    constructor(number) {
        this.number = number;
    }

    async addItem(itemName, quantity){
        const number = this.number;
        const doc = customerRef.doc(number);
        const docSnapshot = await doc.get();
        const data = docSnapshot.data();
        let x = Number(quantity);


        if(!docSnapshot.exists){
            doc.set({
                [itemName] : x
            },{merge : true}).then(()=>{
                console.log("document updated\n");
            });
        }
        else if (data.hasOwnProperty(itemName)) {
            x += Number(data[itemName]);
            doc.update({
                [itemName] : x
            }).then(()=>{
                console.log("document updated\n");
            })
        }
        else{
            doc.set({
                [itemName] : x
            },{merge : true}).then(()=>{
                console.log("document updated\n");
            })
        }
    }

    async deleteItem(itemName){
        const number = this.number;
        const doc = customerRef.doc(number);
        const docSnapshot = await doc.get();
        const data = docSnapshot.data();
        if (data[itemName]==1){
            await doc.update({
                [itemName]: admin.firestore.FieldValue.delete()
            })
        }
        else{
            await doc.update({
                [itemName] : data[itemName]-1
            })
        }
    }

    async getItems(){
        const number = this.number;
        const doc = customerRef.doc(number);
        const docSnapshot = await doc.get();
        const data = docSnapshot.data();
        let total=0;
        for (const [key, value] of Object.entries(data)) {
            total+=price[key]*value;
            console.log(`${key}: ${value}`);
        }
        data["Total"]=total;
        return data;
    }

    async getBalance(){
        const number = this.number;
        const balanceDoc = balanceRef.doc(number);
        const balanceSnapshot = await balanceDoc.get();
        const balance = balanceSnapshot.data()["balance"];
        return balance;
    }

}

module.exports = Kart;