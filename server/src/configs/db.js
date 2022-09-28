const mongoose= require("mongoose");

const connect= () => mongoose.connect("mongodb+srv://Diagon-Alley:Diagon-Alley@diagon-alley.kverdgn.mongodb.net/?retryWrites=true&w=majority")

module.exports= connect;