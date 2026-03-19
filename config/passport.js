import "./env.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    },
    async(accessToken, refreshToken, profile, done) => {
        try {
            const user = {
                id: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                role: "user"
            };
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));
export default passport;
