const express = require("express");
const cors = require("cors");
require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const instructorRouter = require("./src/routes/instructor.routes");
const classRouter = require("./src/routes/class.routes");
const paymentRouter = require("./src/routes/payment.routes");
const categoryRouter = require("./src/routes/category.routes");
const bodyParser = require("body-parser");

const paymentSchema = require("./src/model/payment.schema");

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(
  "/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/instructors", instructorRouter);
//app.use("/api/instructors", instructorRouter);
app.use("/api/courses", classRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/categories", categoryRouter);
const EventEmitter = require("eventemitter3");
const paymentEmitter = new EventEmitter();

const stripe = require("stripe")(
  "sk_test_51NIBhSHkcuY3CefPtCDm0U2OqEDR0xw4sy8FYyE0RAbMPGiywA7JZEzHHRKCIkQLQCcYbbRaknwJzrsX9SMPFtTM005QeFR5yA"
);

// checkout api
app.post("/api/checkout", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", true);

  const { email, products, totalItem, totalPrice: total } = req.body;

  console.log(total);

  console.log(req.body.products);

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "USD",
      product_data: {
        name: product.name,
        images: [product.classImage],
      },
      unit_amount: parseInt((product.price + product.price * 0.1) * 100),
    },
    quantity: 1,
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
    totalAmount: total,
    paymentStatus: session.payment_status,
    courses: products,
  });
  await transaction.save();
  res.json({ id: session.id });
});

const endpointSecret = "whsec_hzNvPm8XLBGPV2KJ9fo9e9H8KfmvOMyG";
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"];
    const payloadString = JSON.stringify(payload, null, 2);
    const secret = "whsec_hzNvPm8XLBGPV2KJ9fo9e9H8KfmvOMyG";
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    try {
      const event = stripe.webhooks.constructEvent(
        payloadString,
        header,
        secret
      );

      switch (event.type) {
        case "checkout.session.completed":
          const checkoutSessionCompleted = event.data.object;
          console.log(
            "checkoutSessionCompleted ::::",
            checkoutSessionCompleted
          );
          await paymentSchema.findOneAndUpdate(
            { sessionId: checkoutSessionCompleted.id },
            { $set: { paymentStatus: checkoutSessionCompleted.payment_status } }
          );
          //paymentEmitter.emit('successfulPayment', checkoutSessionCompleted.id);
          const successfulPaymentData = { paymentStatus: "paid" };
          // Replace "http://your-frontend-url/successful-payment" with the actual URL of your frontend endpoint
          fetch("http://localhost:5173/paid", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(successfulPaymentData),
          });
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }

      response.status(200).send();
    } catch (err) {
      console.error("Error verifying webhook signature:", err.message);
      response.status(400).send("Webhook Error: Invalid signature");
    }

    response.send();
  }
);

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
