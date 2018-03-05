/**
 * Created by DELL on 2018/3/5.
 */
let MongoClient = require('mongodb').MongoClient;
let DB_CONN_STR = 'mongodb://localhost:27017/test';
let selectData = function (db, callback) {
    //连接数据库
    let dbS = db.db("test");
    //连接到表
    let collection = dbS.collection('dytt');
    collection.find({}).toArray(function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
};
MongoClient.connect(DB_CONN_STR, function (err, db) {
    console.log("连接成功！");
    selectData(db, function (result) {
        // console.log(result[0].data);
        db.close();
        return result[0];
    });
});
