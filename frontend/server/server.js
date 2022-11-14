const express = require('express')
const cors = require('cors')
const spotifyWebApi = require('spotify-web-api-node')

const app = express()
const port = 8000

app.use(cors()) // To handle cross-origin requests
app.use(express.json()); // To parse JSON bodies

const credentials = {
  clientId: "d514fdeb916e4b7a8824afea3a00c48b",
  clientSecret: "0a8e461905d7403a971ad6c91c5c3be9",
  redirectUri: "http://localhost:3000/",
};

app.post('/refresh', (req,res) => {
  //  setup 
    const refreshToken = req.body.refreshToken
    console.log("hi")
    let spotifyApi = new spotifyWebApi({
      clientId: "d514fdeb916e4b7a8824afea3a00c48b",
      clientSecret: "0a8e461905d7403a971ad6c91c5c3be9",
      redirectUri: "http://localhost:3000/",
      refreshToken,
    })

    // Retrieve an access token
    spotifyApi.refreshAccessToken().then((data) => {

        // Returning the User's AccessToken in the json formate  
        res.json({
            accessToken : data.body.access_token,
            expiresIn: data.body.expires_in,
        }) 
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(400)
    })

})

app.post('/login', (req,res) => {
//  setup 
    let spotifyApi = new spotifyWebApi(credentials)

//  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api     
    const code = req.body.code

    // Retrieve an access token
    spotifyApi.authorizationCodeGrant(code).then(data => {

        // Returning the User's AccessToken in the json formate  
        res.json({
            accessToken : data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        }) 
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(400)
    })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})