const mongoose = require('mongoose')

const hashtags_Schema = mongoose.Schema({
    tagName:{type:String,require:true}
},
{ timestamps: true }
)

const hashtagsModel = mongoose.model("HasTag",hashtags_Schema)
module.exports = hashtagsModel