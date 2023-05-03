const express=require('express')
const app =express.Router()

const Employee=require('../Models/Employee')
const  nodemailer=require('nodemailer')
let emailDestination=""
sendMail()

async function sendMail (){


let transporter=nodemailer.createTransport({
    service:'gmail',
    port:'587',
    
    auth:{
        user:'uveghobamien@gmail.com',
        pass:'soskid19'
    },
 
    // secureConnection: 'false',
    // tls: {
    //     ciphers: 'SSLv3',
    //     rejectUnauthorized: false
    // }
});


let mailOptions={
    from:"uveghobamien@gmail.com",
    to: "gavohospitals@gmail.com",
    subject:"one time code to reset your GAVO password",
    text:"if you did not send this ignore-testing"
}

transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error);
    }
    else{
        console.log("email sent"+info.response);
    }
})

}

app.route('/').post(async(req,res)=>{
    if(!req.body) return res.json({
        code:401,
        msg:" request body is missing"
    })
    try{
        console.log(req.body.email);

const found_email= await Employee.findOne({"email":req.body.email})
if (!found_email)return res.json({
        msg:"email does not  exist",
        code:404,
        
    })


   
    let data={}
       emailDestination=found_email
    let randomGenerator= function async(){
        let x=Math.floor(Math.random()*10) ;
        let y=Math.floor(Math.random()*10) ;
        let z=Math.floor(Math.random()*10) ;
        let q=Math.floor(Math.random()*10) ;

       data. random_code= `${x}${y}${z}${q}`
        
       console.log("random code", data);
       res.json({
           msg:"email found",
           code:200,
        
           data
          
       })

    }
    

   

randomGenerator()

    }
    catch(err){
        // res.status(500).send(err)
        console.log(err);
    }
})
module.exports=app