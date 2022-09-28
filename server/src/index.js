const express= require("express");
const connect= require("./configs/db");

const app= express();

app.listen(2548,async()=>{
    try{
        await connect();
        console.log("Listening to port no. 2548");
    }
    catch(e){
        console.log(e.message);
    }
})