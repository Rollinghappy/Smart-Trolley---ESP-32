const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKeys.json");

const db = admin.firestore();

const customerRef = db.collection("registered users");

async function check(number, pass){
    const doc = customerRef.doc(number);
    const docSnapshot = await doc.get();
    if(!docSnapshot.exists){
        return 2;
    }
    const data = docSnapshot.data();
    if(data["password"] == pass){
        //console.log("given password: "+pass+"\nActual password: "+data["password"]);
        return 1;
    }
    return 0;
}

module.exports = check;