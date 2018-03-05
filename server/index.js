/**
 * Created by DELL on 2018/3/2.
 */
const Models = require("./schema");

module.exports = apiRouters => {
  apiRouters.get("/customer/find", (req, res) => {
    Models.Customer.find({}, (err, doc) => {
      if (err) {
        console.log(err)
      } else if (doc) {
        res.end(JSON.stringify(doc))
      }
    })
  });

  apiRouters.post("/customer/save", (req, res) => {
    Models.Customer(req.body).save().then(() => {
      res.status(200).end()
    }).catch(() => {
      res.status(500).end()
    })
  })
};
