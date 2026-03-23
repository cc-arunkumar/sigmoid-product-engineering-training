const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID : process.env.GOOGLE_CLIENT_ID || "YOUR_CLIENT_ID",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "YOUR_CLIENT_SECRET",
            callbackURL:"/auth/google/callback"
        },
        async (accessToken,refreshToken,profile,done) => {
            try{
                const user = {
                    id: profile.id,
                    username: profile.displayName,
                    email : profile.emails[0].value,
                    role:"user"
                };
                return done(null, user);
            } catch(error){
                return done(error,null);
            }
        }
    )
);
module.exports = passport;