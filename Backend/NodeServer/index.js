//modules import
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require("multer");
const path = require('path');
const helmet = require('helmet');

const fs = require('fs');

//aws
const AWS = require('aws-sdk');

//file import
const auth = require('./controller/auth');
const product = require("./controller/product");
const admin = require("./controller/admin");
const isAuth = require("./middleware/isAuth").isAuthenticate;
const isAdmin = require("./middleware/isAuth").isadmin;
const isAuthGet = require("./middleware/isAuth").isAuthenticateGet;
const isSameUser = require("./middleware/isAuth").isSameUser;
const user = require('./controller/user');
const shop = require('./controller/shop');
const merchant = require('./controller/merchant');
const inventory = require('./controller/inventory');

const app = express();
const port = 8080;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/product')
    },
    filename: function (req, file, cb) {
        try{
            cb(null, new Date().getTime()+""+(Math.floor(Math.random()*100000))+ new String(file.originalname).replace(/\s/g,"_").toLowerCase());
        }catch(e){
            console.log(e);
        }
    }
});

const strg = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/avatar')
    },
    filename: function (req, file, cb) {
        try{
            cb(null, new Date().getTime()+""+( Math.floor(Math.random()*100000) ) +new String(file.originalname).replace(/\s/g,"_").toLowerCase());
        }catch(e){
            console.log(e);
        }
      
    }
});

   
const upload = multer({storage: storage});
const uploadavatar = multer({storage: strg});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","OPTIONS,GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
    next();
});


app.use('/images',express.static(path.join(__dirname,'images')));

app.use(helmet({
    referrerPolicy:{policy:'no-referrer'}
}));

app.get('/', (req, res, next) => {res.status(200).json({msg:"Server is up..."}); } );

//log
app.use('/',(req,res,next)=>{
    //console.log("Endpoint : " + req.url);
    console.log("INFO  " + new Date().toDateString(),"/",new Date().getHours(),":",new Date().getMinutes(),":",new Date().getSeconds() +" URL="+ req.url);
    next();
});

//merchant operation
app.post('/admin/inventory/addvendor',isAuth,isAdmin,merchant.addmerchant);
app.put('/admin/inventory/updatevendor',isAuth,isAdmin,merchant.updatemerchant);
app.delete('/admin/inventory/deletevendor',isAuth,isAdmin,merchant.deletemerchant);
app.get('/admin/inventory/getvendors',isAuth,isAdmin,merchant.getmerchants);

//inventory operation
app.post('/admin/inventory/addproductstoinventory',isAuth,isAdmin,inventory.addproductstoinventory);
app.get('/admin/inventory/viewproductsininventory',isAuthGet,isAdmin,inventory.viewproductdataininventory);


//shop operation
app.post('/shop/addorder',isAuth,shop.addorder);
app.get('/shop/getorders',isAuthGet,shop.getorders);
app.get('/shop/getorderdata',isAuthGet,shop.getorderdata);
app.put('/shop/updateorder',isAuth,shop.updateproduct);
app.delete('/shop/deleteorder',isAuth,shop.deleteorder);



//admin operation
app.post('/admin/login',auth.adminlogin);

//user operations
app.post('/user/signup',auth.signupuser);
app.post('/user/login',auth.userlogin);
app.post('/user/setuserdata',isAuth,user.setuserdata);
app.put('/user/updateuserdata',isAuth,user.updateuserdata);
app.get('/user/getuserdata',isAuthGet,user.getuserdata);
app.put('/user/updateuseravatar',uploadavatar.single('file'),(req,res,next)=>{
    const file = req.file;
    if (!file) {
        res.status(400).json({err:"Please Upload File!"});
    }else{
        next();
    }  
},user.setuseravtar);

app.post('/auth/getotp',auth.setOTP);
app.post('/auth/checkotp',auth.checkOTP);
app.post('/auth/forgotpassword',auth.forgotpassword);
app.post('/auth/changepassword',isAuth,auth.changepassword);

//product operation

app.post('/admin/addproductimage',upload.array('file',1),(req, res, next) => {
    const file = req.files;
    if (!file) {
        res.status(404).json({err:"Please Upload File!"});
    }else{
        try{
            const fileName = new String(file[0].path).replace(/\\/g,"/");
            const s3 = new AWS.S3({
                accessKeyId: process.env.AWS_S3_ACCESSKEY_ID,
                secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
            });
            const fileContent = fs.readFileSync(fileName);
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: fileName, // File name you want to save as in S3
                Body: fileContent
            };
            s3.upload(params, function(err, data) {
                if (err) {
                    throw err;
                }
                let temp = data.Location.substr(8).split("/");
                let URL = temp[1]+"/"+temp[2]+"/"+temp[3]; 
                res.status(200).json(URL);
            });
        }catch(e){
            next(e);
        } 
    }  
});



app.post("/admin/addproductdata",isAuth,isAdmin,admin.addproduct);
app.put('/admin/updateproduct',isAuth,isAdmin,admin.updateproduct);
app.delete('/admin/deleteproduct',isAuth,isAdmin,admin.deleteproduct);
app.get('/product/getproducts',isAuthGet,product.getproduct);
app.get('/product/getallproducts',isAuthGet,isAdmin,product.getAllproduct);
app.get('/product/getproductsprice',isAuthGet,product.getproductprice);
app.put('/admin/updateproductprice',isAuth,isAdmin,admin.updateproductprice);
app.get('/shop/getproductsbyfilter',isAuthGet,product.getProductsByFilter);
app.get('/shop/getfilters',shop.getfilters);
app.get('/shop/getproductbyfilter',shop.getproductbyfilter);
app.post('/shop/addfilter',isAuth,isAdmin);
app.get('/shop/getsingleproductdata',shop.getNameAndCategory);
app.put('/shop/putreview',isAuth,shop.addreview);
app.get('/shop/getproductreview',shop.getproductreview);
app.get('/admin/getitemsold',isAuthGet,isAdmin,admin.getAllItemSold);
app.get('/admin/getpeichartdata',isAuthGet,isAdmin,admin.getPieChartData);
app.post('/admin/getrecommended',shop.getreccommanded);


//delivery service
app.get('/admin/order/getallorders',isAuthGet,isAdmin,admin.getAllOrders);
app.get('/admin/order/getacceptedorder',isAuthGet,isAdmin,admin.getAllAcceptedOrders);
app.post('/admin/order/setdelivery',isAuth,isAdmin,admin.setorder);
app.put('/admin/order/outfordeliver',isAuth,isAdmin,admin.outForDelivery);
app.put('/admin/order/delivered',isAuth,isAdmin,admin.delivered);
app.get('/admin/order/getnumbers',isAuthGet,isAdmin,admin.getNumbersofAllAcceptedOrders);
app.post('/admin/addfilter',isAuth,isAdmin,admin.addfilter);


//testing
app.get("/admin/test",isAuthGet,isAdmin,admin.testing);


//error handling
app.use((err,req,res,next)=>{
    let code  = err.code;
    let msg   = err.msg; 
    console.log("ERROR " + new Date().toDateString(),"/",new Date().getHours(),":",new Date().getMinutes(),":",new Date().getSeconds() +" URL="+ req.url);
    console.log("\n"+msg);
    res.status(code).json({error : msg});
});


console.log("----------------------------------------------------------------------------------------------------------------------");
console.log("Keys : ");
console.log("AWS_SES_SECRET_ACCESS_KEY : " + new String(process.env.AWS_SES_SECRET_ACCESS_KEY).substr(0,5));
console.log("AWS_SES_ACCESS_KEY_ID : " + new String(process.env.AWS_SES_ACCESS_KEY_ID).substr(0,5));
console.log("AWS_SES_REGION : " + new String(process.env.AWS_SES_REGION).substr(0,5));
console.log("AWS_S3_BUCKET_NAME : " + new String(process.env.AWS_S3_BUCKET_NAME));
console.log("AWS_S3_SECRET_ACCESS_KEY : " + new String(process.env.AWS_S3_SECRET_ACCESS_KEY).substr(0,5));
console.log("AWS_S3_ACCESSKEY_ID : " + new String(process.env.AWS_S3_ACCESSKEY_ID).substr(0,5));
console.log("AWS_SES_SENDER_EMAIL : " + new String(process.env.AWS_SES_SENDER_EMAIL).substr(0,5));
console.log("----------------------------------------------------------------------------------------------------------------------");


console.log("INFO " + new Date().toDateString(),"/",new Date().getHours(),":",new Date().getMinutes(),":",new Date().getSeconds() +" CONNECTING DATABASE AT "+ process.env.MONGO_URL);
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(result=>{
    console.log("INFO  " + new Date().toDateString(),"/",new Date().getHours(),":",new Date().getMinutes(),":",new Date().getSeconds() +" DATABASE CONNECTED");
    app.listen(process.env.PORT);
    console.log("INFO  " + new Date().toDateString(),"/",new Date().getHours(),":",new Date().getMinutes(),":",new Date().getSeconds() +" SERVER RUNNING ON "+ process.env.PORT);
}).catch(err=>{
    console.log("ERROR  " + new Date().toDateString(),"/",new Date().getHours(),":",new Date().getMinutes(),":",new Date().getSeconds() +" DATABASE ERROR "+err);
})
