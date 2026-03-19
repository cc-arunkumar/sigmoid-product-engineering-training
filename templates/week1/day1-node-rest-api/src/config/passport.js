import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "YOUR_CLIENT_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "YOUR_CLIENT_SECRET",
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Debugging
        // console.log("CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
        // console.log("CLIENT SECRET:", process.env.GOOGLE_CLIENT_SECRET);

        const user = {
          id: profile.id,
          username: profile.displayName,
          email: profile.emails?.[0]?.value,
          role: "user",
        };

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;