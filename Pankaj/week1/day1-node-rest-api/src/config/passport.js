const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || "your-google-client-id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "your-google-client-secret",
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {

                const user = {
                    goggleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                };
                return done(null, user);
            }
            catch (error) {
                return done(error, null);
            }   

        }
    )
);

module.exports = passport;