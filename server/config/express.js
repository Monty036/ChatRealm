const path = require("path"),
  express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  cors = require("cors")

// Load Routers
const userRoutes = require('../routes/userRoutes');
const chatRoutes = require('../routes/chatRoutes');

// Middleware
const { errorHandler, notFound } = require('../middleware/errorMiddleware');
const cookieParser = require("cookie-parser");

module.exports.init = () => {
  //initialize app
  const app = express();
  app.use(cookieParser());

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

  //morgan used for logging HTTP requests to the console
  app.use(morgan("dev"));

  //bodyParser middleware used for resolving the req and res body objects (urlEncoded and json formats)
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });  

  //add routers for /api
  app.use('/api/test', (req, res) => {
    res.send("Hello, World!");
  })

  const masterRouter = express.Router();
  masterRouter.use('/user', userRoutes);
  masterRouter.use('/chat', chatRoutes);
  masterRouter.use(notFound);
  masterRouter.use(errorHandler);


  app.use('/api', masterRouter);

  //for production build
  if (process.env.NODE_ENV === "production") {
    //Serve any static files
    app.use(express.static(path.join(__dirname, "../../client/build")));

    //Handle React routing, return all requests to React app
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
  }

  return app;
};