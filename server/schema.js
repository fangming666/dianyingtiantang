/**
 * Created by DELL on 2018/3/2.
 */
const mongoose = require("mongoose");
//引入mongoose依赖
const Schema = mongoose.Schema;
//创建一个Schema实例
const customerSchema = new Schema({
  name: {type: String},
  pwd: {type: String},
  uId: {type: Number}
});

//创建一个model，meigeschema实例对应一个model
const Models = {
  Customer: mongoose.model("Customer", customerSchema)
};

//创建mongoose链接
mongoose.connect("mongodb://localhost:27017/test");

const db = mongoose.connection;

db.on("error", () => {
  console.log(`error${error}`)
});

db.once("open", () => {
  console.log("the database has connected")
});

//导出models的接口
mosule.exports = Models;
