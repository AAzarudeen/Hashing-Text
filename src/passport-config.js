const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, con) {

  
  var user = {}

  const authenticateUser = async (email, password, done) => {

    con.query(`SELECT * FROM users where email = '${email}' and password = '${password}'`, function (err, result, fields) {
      if (err) throw err;
      user = result[0]
      if (user == null) {
        return done(null, false, { message: "No user with that email" });
      }
  
      try {
        if (password === user.password) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      } catch (e) {
        return done(e);
      }
    });

  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((id, done) => {
    return done(null, id);
  });
}

module.exports = initialize;
