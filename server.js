const express = require("express");
const path = require("path");
const axios = require("axios");



const methodOverride = require("method-override");
// const { response } = require("express");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public"))); ////makes the public folder accesible with EJS using express////


app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"));



app.get("/", (req, res) => {
  res.render("index")
})

app.get("/auth", (req, res) => {
  res.redirect("https://accounts.protected.com/?response_type=code&client_id=71ef9881-b8b4-4f7b-87fa-4c5046d9ef8b&redirect_popup=true")
})

app.get("/oauth-callback", async (req, res) => {
  const code = req.query.code;

  const body = {
    code: `${code}`,
    grant_type: "authorization_code",
    client_id: "XXX",
    client_secret: "XXXXX",


    
  };


  const post = await axios.post("https://api.protected.com/auth/protected/oauth/token", body, { headers: {
    "Authorization": "Basic XXXX",
    "Content-Type": "application/x-www-form-urlencoded",

  }});

  console.log(post.data);
  const token = post.data.access_token;
  console.log(token);

  const optionsGet = {
    headers:{
     "Authorization": `Bearer ${token}`,
    },
    methodType: "json",};

  const get = await axios.get("https://api.protected.com/auth/protected/resources/userinfo", optionsGet);


  console.log(get.data);

  res.redirect(`/${token}`)

})
  
// app.get("/test", (req, res) => {
//   res.redirect("https://protected.protected.com/#/users/349ce9cd-b07d-49c0-95f9-eae3cdec9295")
//   console.log(req.headers)
// })

app.get("/:token", (req, res) => {
  res.render("index")
})


app.listen (3000, () => {
  console.log("serving on port 3000")
})

