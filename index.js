const express = require("express");
const qrcode = require("qrcode");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index", { QR_code: "" });
});

app.post("/", (req, res) => {
  const url = req.body.url;
  console.log(url);

  if (url) {
    qrcode.toDataURL(url, (err, src) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      var filePath = "./qrImages/" + Date.now() + ".png";
      qrcode.toFile(filePath, url, {
        color: {
          dark: "#000",
          light: "#0000",
        },
      });
      res.render("index", { QR_code: src, img_src: filePath });
    });
  } else {
    res.send("URL not set");
  }
});

app.get("/download", (req, res) => {
  res.download(req.query.filePath);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000...");
});
