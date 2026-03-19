const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/api/auth/google/callback";

console.log("Using Google ClientID:", clientID ? clientID : "[MISSING]");
console.log("Using Google CallbackURL:", callbackURL);

if (!clientID || !clientSecret) {
  console.error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in .env — OAuth will fail");
}

passport.use(
  new GoogleStrategy(
    { clientID, clientSecret, callbackURL },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] && profile.emails[0].value;
        const user = { id: profile.id, username: profile.displayName || null, email: email || null, role: "user" };
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;

