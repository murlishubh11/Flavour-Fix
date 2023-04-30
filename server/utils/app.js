const express = require('express') // Backend App (server)
const cors = require('cors') // HTTP headers (enable requests)
const {ORIGIN} = require('../constants')
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Preference = require('../models/Preference')
const MenuItem = require('../models/MenuItem')
const http = require('http');
const multer = require('multer');
//const socketIO = require('socket.io');
const {PORT} = require('../constants/index')
const natural = require("natural");
const Review = require('../models/Review')

// initialize app
const app = express()
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
//-----------------------------------------------------------------------

const server = http.createServer(app); // Create HTTP server
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});


io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("newOrder", (order) => {
    
    io.emit("orderBroadcast", order);
  });

  // Event listener for updating preference data
  socket.on("updatePreference", (updatedPreference) => {
    // Update the preference data in the server
    // ...rest of the code

    io.emit("preferenceUpdated", updatedPreference);
  });
 
 
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//------------------------------------------------------------------

// middlewares
app.use(cors({origin: ORIGIN}))
app.use(express.json({extended: true})) // body parser
app.use(express.urlencoded({extended: false})) // url parser

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true    }));
app.use(express.static("public"));


app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send()
  next()
})

//--------------------------------------------------------------------------------------------------



app.route("/preferences/:preferencePhonenumber")
  .get(function(req, res){
    const phone = req.params.preferencePhonenumber;

    // Find the Preference document with the given phone number
    Preference.findOne({ phone: phone})
      .then((preference) => {
        if (!preference) {
          // If no preference is found, create a new preference with the given phone number and null fields
          const newPreference = new Preference({
            name: null,
            phone: phone,
            tips: null
          });
          // Save the new preference to the database
          newPreference.save()
            .then((createdPreference) => {
              // Return the newly created preference as the response
              res.send(createdPreference);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send("Error creating new preference");
            });
        } else {
          // If preference is found, return it as response
          res.send(preference);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error fetching preference");
      });
  });
//---------------------------------------------------------------------------
  app.route("/preferences/:preferencePhonenumber")
  .post(function(req, res){
    const phone = req.params.preferencePhonenumber;

    // Update the Preference document with the given phone number
    Preference.findOneAndUpdate({ phone: phone }, { name: req.body.name, tips: req.body.tips }, { new: true })
      .then((preference) => {
        // If preference is found and updated, return it as response
        res.send(preference);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error updating preference");
      });
  });


  //______________________________________________________________

  MenuItem.find({})
  .then((menuItems) => {
    const classifier = new natural.BayesClassifier();

    menuItems.forEach((menuItem) => {
      classifier.addDocument(menuItem.name, menuItem.category);
      menuItem.tags.forEach((tag) => {
        classifier.addDocument(tag, menuItem.category);
      });
    });

    classifier.train();
    console.log("Classifier trained with all menu items from the database");
    app.route("/menuItems")
    .post(async function(req, res){
      
      const feedback = req.body.feedback;
    
      const tokenizer = new natural.WordTokenizer();
      const keywords = tokenizer.tokenize(feedback);
    
      try {
        const menuItems = await MenuItem.find({
          $or: [
            { category: { $in: keywords } },
            { tags: { $in: keywords } }
          ]
        });
    
        res.json(menuItems);
      } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
    });
    
  })
  .catch((err) => console.error(err));

// ___________________________________________________________

app.route("/api/menu")
  .get(function(req, res){
  MenuItem.find({})
    .then(menuItems => {
      res.json(menuItems);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server error');
    });
});
// __________________________________________________________________________


// Define an API endpoint to search for a menu item by name
app.route("/api/menuitems")
  .get( async function (req, res){
  const name = req.query.name;
  try {
    
    const menuItem = await MenuItem.findOne({ name: name });
    res.json(menuItem); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//___________________________________
// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Handle form data
app.post('/api/reviews', upload.single('photo'), async (req, res) => {
  const { review, rating, phoneNumber } = req.body;
  const photo = req.file ? req.file.path : null;

  try {
    const newReview = new Review({
      review,
      rating,
      phoneNumber,
      photo
    });
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = app
