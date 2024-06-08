/*jshint esversion: 6 */

const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html')
  });

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);


const url = "https://us13.api.mailchimp.com/3.0/lists/49e3f23870";

const options = {
    method: "POST",
    auth: "hadiuzzaman:b9dda24ec8c12894a00f0333d47b94bd-us13"
}

const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
        // res.send("successfully");
    } else {
        res.sendFile(__dirname + "/failure.html");
        // res.send("there is a problem");
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
});
request.write(jsonData)
request.end();

});

app.post("/fail", function (req, res){
    res.redirect("/");
  });


//*jshint esversion: 6 */


//to test the app locally in port 3000
// app.listen(process.env.PORT || 3000, function(){
app.listen(process.env.PORT || 3000, function(){
console.log("Server is running in port 3000")
});

