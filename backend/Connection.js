const { default: mongoose } = require("mongoose");

async function ConnectDb(){
    try {
        await mongoose.connect(process.env.MONG0_DB)
        console.log("Db Connected");
    } catch (error) {
        console.log("Db Connection Loss");
    }
}

module.exports = ConnectDb