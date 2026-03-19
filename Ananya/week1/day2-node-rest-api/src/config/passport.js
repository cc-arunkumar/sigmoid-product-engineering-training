const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Determine callback URL based on environment
const getCallbackURL = () => {
  const baseUrl = process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_URL
    : "http://localhost:3000";
  return `${baseUrl}/api/auth/google/callback`;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "YOUR_CLIENT_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "YOUR_CLIENT_SECRET",
      callbackURL: getCallbackURL()
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract user info from Google profile
        const user = {
          id: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          role: "user" // default role
        };

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
