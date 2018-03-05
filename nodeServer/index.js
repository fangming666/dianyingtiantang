/**
 * Created by DELL on 2018/3/1.
 */
let cheerio = require("cheerio");
let http = require("http");
let iconv = require("iconv-lite");
let fs = require("fs");
let rp = require("request-promise");

/*获取标题时候定义的变量*/
let url = 'http://www.ygdy8.net/html/gndy/dyzz/list_23_';
let index = 1; //页面数控制
let titles = {"index": "", "content": []};//用来保存标题
let result = {"data": []};
let textTitle = "标题";
/*获取连接时候定义的变量*/
let btLink = [];
let BtUrl = [];
let BtContent = 0;

//获取标题的函数
let getTitle = (url, i) => {
    titles.index = `开始爬取第${i}页内容`;
    http.get(`${url}${i}.html`, sres => {
        let chunks = [];
        sres.on("data", chunk => {
            chunks.push(chunk)
        });

        sres.on("end", () => {
            let html = iconv.decode(Buffer.concat(chunks), "gb2312");
            let $ = cheerio.load(html, {decodeEntities: false});
            $(".co_content8 .ulink").each((idx, element) => {
                let $element = $(element);
                titles.content.push({
                    title: $element.text()
                });
                BtUrl.push({
                    "titleHref": $element.attr("href")
                })
            });
            result.data.push(titles);
            titles = {"index": "", "content": []};
            // console.log(result);
            if (i < 2) {
                getTitle(url, ++index);
            } else {
                getBtLink(BtUrl, BtContent);

            }

        })
    });
};
getTitle(url, index);


//获取连接的函数
let getBtLink = (urls, n) => {
    // console.log(`正在获取第${n + 1}个链接`);
    http.get(`http://www.ygdy8.net${urls[n].titleHref}`, sres => {
        let chunks = [];
        sres.on("data", chunk => {
            chunks.push(chunk);
        });
        sres.on("end", () => {
            let html = iconv.decode(Buffer.concat(chunks), 'gb2312');
            let $ = cheerio.load(html, {decodeEntities: false});
            $("#Zoom td").children("a").each((index, item) => {
                let $element = $(item);
                btLink.push({
                    bt: $element.attr("href")
                });
            });
            if (n < urls.length - 1) {
                getBtLink(urls, ++n);
            } else {
                btLink.map((item, index) => {
                    if (item.bt.split("magnet:?xt=").length > 1) {
                        // console.log(index);
                        btLink.splice(index, 1);
                    }
                });
                result.data.map((item, index) => {
                    item.content.map((item2, index2) => {
                        item2.href = btLink[index2 + (index == 0 ? 0 : index * (result.data[index - 1].content.length ))].bt;
                    })
                });
                save();
                // 删除文件,(即清空文件)
                fs.unlink('./data/' + textTitle + '.json', err => {
                    if (err) console.log(2, err);
                });
                // // 将爬取的数据写进文件中
                fs.appendFile('./data/' + textTitle + '.json', JSON.stringify(result), 'utf-8', err => {
                    if (err) console.log(2, err);
                });
            }
        })
    });
};


//使用mongoDB存贮数据
let save = () => {
    let MongoClient = require("mongoDB/index").MongoClient;
    let DB_CONN_STR = 'mongodb://localhost:27017/test';

    let insertData = function (db, callback) {
        let dbS = db.db("test");
        //连接到表 dytt;
        let collection = dbS.collection('dytt');
        //插入数据
        let dataS = result;
        collection.insert(dataS, function (err, result) {
            if (err) {
                console.log('Error:' + err);
                return;
            }
            callback(result);
        });
    };
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        console.log("连接成功！");
        insertData(db, function (result) {
            db.close();
        });
    });
};




