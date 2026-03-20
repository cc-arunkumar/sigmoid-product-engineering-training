const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "Nikhil",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "Nikhli123454321",
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract user info
        const user = {
          id: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          role: "user", // default role
        };
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);
module.exports = passport;
