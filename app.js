const express = require("express");
const cors = require("cors");
require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const instructorRouter = require("./src/routes/instructor.routes");
const classRouter = require("./src/routes/class.routes");
const paymentRouter = require("./src/routes/payment.routes");
const categoryRouter = require("./src/routes/category.routes")

const paymentSchema = require("./src/model/payment.schema");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/instructors", instructorRouter);
app.use("/api/instructors", instructorRouter);
app.use("/api/courses", classRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/categories", categoryRouter);

const stripe = require("stripe")(
  "sk_test_51NIBhSHkcuY3CefPtCDm0U2OqEDR0xw4sy8FYyE0RAbMPGiywA7JZEzHHRKCIkQLQCcYbbRaknwJzrsX9SMPFtTM005QeFR5yA"
);

// checkout api
app.post("/api/checkout", async (req, res) => {
  const { email, paymentStatus, products } = req.body;

  const total = products.totalPrice + products.totalPrice * 0.1;

  const lineItems = products.courses.map((product) => ({
    price_data: {
      currency: "USD",
      product_data: {
        name: product.name,
        images: [product.classImage],
      },
      unit_amount: parseInt(total * 100),
    },
    quantity: products.totalItem,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173",
    cancel_url: "http://localhost:5173",
  });

  const transaction = new paymentSchema({
    sessionId: session.id,
    email,
    paymentStatus,
    courses: products.courses,
  });
  await transaction.save();

  //res.json({ sessionId: session.id });

  res.json({ id: session.id });
});

//Home page
app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/./src/view/index.html");
});

//route not found error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

//handling server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something broke",
  });
});

module.exports = app;
