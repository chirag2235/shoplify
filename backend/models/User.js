const moongose = require('mongoose');
const usersSchema = new moongoose.Schema({
    name:String,
    email:String,
    password:String
});

module.exports = mongoose.model("users",usersSchema);