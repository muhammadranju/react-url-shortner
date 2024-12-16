/* eslint-disable no-undef */
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model/user.model");
// Passport Local Strategy
module.exports = function (passport) {
  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({
            $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
          });

          if (!user) {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              photoURL: profile.photos[0].value,
              accountType: "GOOGLE",
            });
          }
          user.photoURL = profile.photos[0].value;
          user.googleId = profile.id;
          user.accountType = "GOOGLE";
          await user.save();
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
};
