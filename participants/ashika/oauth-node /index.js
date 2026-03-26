require ('dotenv').config()
const express=require("express")
const axios=require("axios")

const app=express();
const PORT=3000;

//home route
app.get("/", (req, res)=>{
    res.send(`
        <h1>github auth demo</h1>
        <a href="/login">login wiht github</a>
        `);
});

//loginroute - redirect to github for login 
app.get("/login" , (req, res)=>{
    const redirecturl=`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user:read`;
    res.redirect(redirecturl);
});

//callback route-github redirect here after login
app.get("/callback", async (req, res)=>{
  const code=req.query.code;
  if(!code){
    res.status(400).send("no code provided")
  }
  try{
      const tokenResponse=await axios.post(
        'https://github.com/login/oauth/access_token',
        {
         client_id:process.env.CLIENT_ID,
        //  client_secret: process.env.CLIENT_SECRET,
         code,

        },
        {
            headers: {Accept: 'application/json'}
        }
    )
          const accessToken= tokenResponse.data.res.access_token;
        
        if(!accessToken){
            return res.status(400).send("No access token received");
        }

        const userResponse= await axios.get('https://api.github.com/user',{
            headers: {Authorization: `Bearer ${accessToken}`}
        });

        const user= userResponse.data;

        //Display simple html with user info
        res.send(`
            <h1> Welcome, ${user.login} !</h1>
            <img src="${user.avatar_url}" alt="avatar" width="100" />
            <p> Github ID: ${user.id} </p>
            <p> <a href= "${user.html_url}" target="_blank"> View Github Profile </a></p>
            <p> <a href="/" > Go back Home</a> </p>
            `);
    }catch(error){
        console.error(error);
        res.status(500).send('Authentication Failed');
    }
});

// Start the server

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`)
});

