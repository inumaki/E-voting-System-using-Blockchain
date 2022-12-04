const cors = require('cors');
if (process.env.NODE_ENV != "production") {
  require('dotenv').config()
}

const express = require('express');

const app = express();
const path = require('path')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const { v4: uuid } = require('uuid')
app.set('view engine', 'ejs')
const joi = require('joi')
const mongoose = require('mongoose')
app.set('views', path.join(__dirname, 'views'))
let methodOverride = require('method-override')
app.use(methodOverride("_method"))
const ejsmate = require('ejs-mate')
app.engine('ejs', ejsmate)
// app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(__dirname + '/public'));
app.use(express.json())
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const localpassport = require('passport-local').Strategy
const User = require('./models/user')
const setTimer= require('./models/setTimer')
const port = 3020
const secret = 'thisismysecret'
const router = require('router')
const MongoDBStore = require('connect-mongo')
const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken')
app.use(bodyParser.urlencoded({ extended: true }));
const dburl = process.env.mongoatlas
// const user_router= require('./routes/user')
// const list_router= require('./routes/list');
// const editorial_router = require('./models/editorial');
const bcrypt = require('bcrypt')

const sessionConfig = {

  // store:MongoDBStore.create({  mongoUrl:dburl,secret:secret })

  name: 'connsession',
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
}
app.use(cors())
app.use(session(sessionConfig))

//----------passport--------------------

//----------------------------------------------


//----------------------------------------------------
app.listen(port, () => {
  console.log(`started listening at port ${port}`)

})
//---------------------------------------------------
app.use((req, res, next) => {
  res.locals.currentuser = req.user

  next()
})

//---------------------------------------------------
async function main() {

  await mongoose.connect(dburl)
  console.log('connected')
}
//----------------------------------------------------


//-------------------------------------------------------
main().catch(console.error);
app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/login', async (req, res) => {

  try {
        const salt = "$2b$10$OXZgGni6Mg4ta5XGOpbDge";

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

const result=await User.find({ adhaar: req.body.voterid, key: hashedPassword })
    if(result.length===0)
    res.status(500).send("Could Not Find User");
    else
    {
        res.redirect('http://localhost:3000/index1.html') // redirect to voting page
    }
  }
  catch (err) { 
    console.log(err)
    res.status(500).send(err) }
}
)
const requireAuth = (req,res,next)=>{



}

// app.post('/getTimerValue',async (req,res)=>{

// const timer = new setTimer({
//   key:"abc",
//   value:false
// })

// const data = await timer.save();

// if(data){
//   return res.status(201).json({
//     success:true,
//     data:data
//   })
// }


// })

app.get('/getTimerValue',async(req,res) => {
  const data = await setTimer.findOne({id:"638ce869748ee1d051e75003"})

  if(data){
    return res.status(200).json({
      success:true,
      data:data
    })
  }
})

app.post('/getTimerValue',async(req,res) => {
  const boolVal = await setTimer.findOne({id:"638ce869748ee1d051e75003"});
  const data = await setTimer.findOneAndUpdate({id:"638ce869748ee1d051e75003"},{value:!boolVal.value})
  if(data){
    return res.status(200).json({
      success:true,
      data:data
    })
  }
})



// app.post('/signup', async (req, res) => {

//   try {
//     const salt = "$2b$10$OXZgGni6Mg4ta5XGOpbDge";

//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//    console.log(has)
// const userinstance =await new User( { adhaar: req.body.adhaar, key: hashedPassword });
//     const result = await User.create(userinstance)
//     console.log(result)
//     res.status(201).send("yo sent");
//   }
//   catch (err) { 
//     console.log(err)
//     res.status(500).send(err) }
// }
// )


  // app.use("/",user_router)
  // app.use("/mylist",list_router)
  // app.use("/editorial",editorial_router)
  //----------------------------------------------------