const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");

mongoose.connect("mongodb://localhost/userData", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const port = 8000;
const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

function sendResponse(response, error, data) {
  if (error) {
    response.json({
      success: false,
      message: error
    });
  } else if (!data) {
    response.json({
      success: false,
      message: "Not Found"
    });
  } else {
    response.json({
      success: true,
      data: data
    });
  }
}

// CREATE
app.post("/users", (request, response) => {
  User.create({ ...request.body.newData }, (error, data) => {
    sendResponse(response, error, data);
  });
});

app
  .route("/users/:id")
  .get((request, response) => {
    User.findById(request.params.id, (error, data) => {
      sendResponse(response, error, data);
    });
  })
  // UPDATE
  .put((request, response) => {
    User.findByIdAndUpdate(
      request.params.id,
      { ...request.body.newData },
      { new: true },
      (error, data) => {
        sendResponse(response, error, data);
      }
    );
  })
  // DELETE
  .delete((request, response) => {
    User.findByIdAndDelete(request.params.id, (error, data) => {
      sendResponse(response, error, data);
    });
  });
