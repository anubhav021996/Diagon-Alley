const multer= require("multer");
const path= require("path");

const storage= multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,path.join(__dirname,"../uploads"));
    },
    filename: function(req,file,callback){
        let prefix= Date.now()+Math.random().toString();
        callback(null,`${prefix}-${file.originalname}`);
    }
});

const fileFilter= (res,file,callback) => {
    if(file.mimetype=="image/jpeg" || file.mimetype=="image/png") callback(null, true);
    else callback(new Error("File not supported"),false);
}

const upload= multer({storage,fileFilter});

const uploadSingle= (fileKey) => {
    return function(req,res,next){
        const uploadItem= upload.single(fileKey);
        uploadItem(req,res,function(err){
            if (err instanceof multer.MulterError) {
                return res.status(500).send(err.message);
            } else if (err) {
                return res.status(500).send(err.message);
            }
            next();
        })
    }
}

module.exports= uploadSingle;