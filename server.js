const express = require('express');
const connectDB = require('./config/db')
const app = express ()
const path=require('path')

const PORT = process.env.PORT || 5000
// The code below helps to fix any potential CORS issue.
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    
    next()
})

//Connect database
connectDB()
app.use(express.json({
    extented : false
}));
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));

//server static assets in production
if (process.env.NODE_ENV==='production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});