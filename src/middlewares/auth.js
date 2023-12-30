require("dotenv").config();
var jwt = require("jsonwebtoken");
const userCollection = require("../model/user.schema");

const verifyJWT = (req, res, next) => {
  console.log('here')
  //console.log(req.headers)
  const authorization = req.headers.authorization;
  //console.log(authorization)
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  const token = authorization.split(" ")[1];
  console.log('token::::' ,token)
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      console.log(err)
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    console.log(req.decoded)
    next();
  });
};

//middleware for admin verify
const verifyAdmin = async (req, res, next) => {
  email = req.decoded.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  if (user?.role !== "admin") {
    return res.status(403).send({ error: true, message: "forbidden access" });
  }
  next();
};

//middleware for seller verify
const verifyInstructor = async (req, res, next) => {
  email = req.decoded.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  if (user?.role !== "instructor") {
    return res.status(403).send({ error: true, message: "forbidden access" });
  }
  next();
};

module.exports = { verifyJWT, verifyAdmin, verifyInstructor };
