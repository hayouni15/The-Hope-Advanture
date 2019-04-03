const mongoose = require('mongoose')
const dbURL=process.env.dbURL||'mongodb://127.0.0.1:27017/angela'
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})


