const mongoose=require('mongoose');const dbURI=process.env.MONGODB_URI;
let connected=false;
async function connect(){if(connected)return;await mongoose.connect(dbURI);connected=true;}
const schema=new mongoose.Schema({fullName:String,mobile:String,email:String,course:String,message:String,date:{type:Date,default:Date.now}});
const Enquiry=mongoose.models.Enquiry||mongoose.model('Enquiry',schema);
module.exports=async(req,res)=>{if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
try{await connect();const d=new Enquiry(req.body);await d.save();res.json({success:true});}
catch(e){res.json({success:false});}};