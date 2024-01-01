const express = require("express");
const cors = require("cors");
require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const instructorRouter = require("./src/routes/instructor.routes");
const classRouter = require("./src/routes/class.routes");
const paymentRouter = require("./src/routes/payment.routes");
const categoryRouter = require("./src/routes/category.routes")
const bodyParser = require('body-parser');

const paymentSchema = require("./src/model/payment.schema");

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/instructors", instructorRouter);
//app.use("/api/instructors", instructorRouter);
app.use("/api/courses", classRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/categories", categoryRouter);

const {verifyJWT} = require('./src/middlewares/auth')



app.get("/jwt", async (req, res) => {
  console.log(req.headers)

  res.send('here');
});


const stripe = require("stripe")(
  "sk_test_51NIBhSHkcuY3CefPtCDm0U2OqEDR0xw4sy8FYyE0RAbMPGiywA7JZEzHHRKCIkQLQCcYbbRaknwJzrsX9SMPFtTM005QeFR5yA"
);

// checkout api
app.post("/api/checkout", async (req, res) => {

  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', true);

  const { email, paymentStatus, products, totalItem, totalPrice:total } = req.body;

  console.log(req.body.products)


  const lineItems = products.map((product) => ({
    price_data: {
      currency: "USD",
      product_data: {
        name: product.name,
        images: [product.classImage],
      },
      unit_amount: parseInt((product.price + product.price * 0.1) * 100) ,
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

  //const transaction = new paymentSchema({
  //  sessionId: session.id,
  //  email,
  //  paymentStatus,
  //  courses: products,
  //});
  //await transaction.save();

  //res.json({ sessionId: session.id });

  res.json({ id: session.id });
});
//const endpointSecret = 'whsec_9638c6781b1bf11b3e63132c40d44f151d313c2186572d1bbede46f25ee54c99';
//app.post('/webhook', express.raw({type: 'application/json'}),async (request, response) => {
//  console.log('here')
//  let event = request.body;
//  // Only verify the event if you have an endpoint secret defined.
//  // Otherwise use the basic event deserialized with JSON.parse
//  if (endpointSecret) {
//    // Get the signature sent by Stripe
//    const signature = request.headers['stripe-signature'];
//    console.log(signature,'dfs')
//    try {
//      console.log('here')
//      event = stripe.webhooks.constructEvent(
//        request.body,
//        signature,
//        endpointSecret
//      );
//      console.log(event)
//    } catch (err) {
//      console.log(`⚠️  Webhook signature verification failed.`, err.message);
//      return response.sendStatus(400);
//    }
//  }

//  // Handle the event
//  switch (event.type) {
//    case 'checkout.session.completed':
//      const checkoutSessionCompleted = event.data.object;
//      await handlePaymentIntentSucceeded(checkoutSessionCompleted);
//      // Then define and call a function to handle the event checkout.session.completed
//      break;
//    case 'payment_intent.succeeded':
//      console.log("done")
//      const paymentIntent = event.data.object;

//      await handlePaymentIntentSucceeded(paymentIntent);

//      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//      // Then define and call a method to handle the successful payment intent.
//      // handlePaymentIntentSucceeded(paymentIntent);
//      break;
//    case 'payment_method.attached':
//      const paymentMethod = event.data.object;
//      // Then define and call a method to handle the successful attachment of a PaymentMethod.
//      // handlePaymentMethodAttached(paymentMethod);
//      break;
//    default:
//      // Unexpected event type
//      console.log(`Unhandled event type ${event.type}.`);
//  }

//  // Return a 200 response to acknowledge receipt of the event
//  response.send();
//});

const endpointSecret = 'whsec_hzNvPm8XLBGPV2KJ9fo9e9H8KfmvOMyG';
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (request, response) => {
  console.log('here');
  console.log(request.body)

  const payload = {
    id: 'evt_3OTp5dHkcuY3CefP0yxL006Q',
    object: 'event',
  };

  const payloadString = JSON.stringify(payload, null, 2);
  const secret = 'whsec_hzNvPm8XLBGPV2KJ9fo9e9H8KfmvOMyG';

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret,
  });

  const event = stripe.webhooks.constructEvent(payloadString, header, secret);


  //let event;
  //// Only verify the event if you have an endpoint secret defined.
  //// Otherwise use the basic event deserialized with JSON.parse
  //if (endpointSecret) {
  //  // Get the signature sent by Stripe
  //  const signature = request.headers['stripe-signature'];
  //  console.log(signature, 'dfs');
  //  try {
  //    // Parse the raw body manually
  //    const rawBody = request.body;
  //    event = stripe.webhooks.constructEvent(
  //      rawBody,
  //      signature,
  //      endpointSecret
  //    );
  //    console.log(event);
  //  } catch (err) {
  //    console.log(`⚠️  Webhook signature verification failed.`, err.message);
  //    return response.sendStatus(400);
  //  }
  //}

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      //await handlePaymentIntentSucceeded(checkoutSessionCompleted);
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case 'payment_intent.succeeded':
      console.log("done");
      const paymentIntent = event.data.object;

      //await handlePaymentIntentSucceeded(paymentIntent);
      //await paymentSchema.findOneAndUpdate(
      //  { sessionId: paymentIntent.id },
      //  { $set: { paymentStatus: "success" } }
      //);

      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


async function handlePaymentIntentSucceeded(paymentIntent) {
  const { email, paymentStatus, products, totalItem, totalPrice:total } = paymentIntent.metadata; // Assuming you added metadata to the paymentIntent

  // Save payment information to the database
  const transaction = new paymentSchema({
    sessionId: paymentIntent.id,
    email,
    paymentStatus: "succeeded",
    courses: products,
    totalAmount:total
  });

  await transaction.save();

  console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
}


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
