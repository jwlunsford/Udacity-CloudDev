import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { filterImageFromURL, deleteLocalFiles } from "./util/util.js";

// load env vars
dotenv.config({ path: "./config/config.env" });

// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */

//! END @TODO1

app.get("/filteredimage", async (req, res) => {
  // unpack the url
  const { image_url } = req.query;
  console.log(image_url);

  // check to make sure image_url query provided
  if (!image_url) {
    return res.status(400).send("<h1>No image_url Query Provided...</h1>");
  }

  try {
    // process image which returns a path to image in local storage
    const imgPath = await filterImageFromURL(image_url);
    res.status(200).sendFile(imgPath, (err) => {
      if (err) {
        return res.status(400).send(`<h1>Bad Request...</h1><p>${err}</p>`);
      } else {
        deleteLocalFiles([imgPath]);
        console.log(`File: ${imgPath} successfully deleted...`);
      }
    });
  } catch (err) {
    // a content issue
    return res.status(422).send(`<h1>Content Error...</h1><p>${err}</p>`);
  }
});

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("GET /filteredimage?image_url={{}}");
});

// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
