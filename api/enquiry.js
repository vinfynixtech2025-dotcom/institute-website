const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI;
let isConnected = false;

const EnquirySchema = new mongoose.Schema({
  fullName: String,
  mobile: String,
  email: String,
  course: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);

async function connectToDatabase(){
  if(isConnected) return;
  await mongoose.connect(dbURI,{ useNewUrlParser:true, useUnifiedTopology:true });
  isConnected = true;
}

module.exports = async (req,res)=>{
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  try{
    await connectToDatabase();
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(200).json({success:true});
  }catch(err){
    console.error(err);
    res.status(500).json({success:false});
  }
};
