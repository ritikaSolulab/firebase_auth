const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

// admin credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://server-auth-41acc.firebaseio.com",
});

// login 
exports.login = async(req, res) => {
    return res.render("login.html");
};

// signup
exports.signup =  async(req, res) => {
    return res.render("signup.html");
};


// profile
exports.profile = async(req, res) => {
    const sessionCookie = req.cookies.session || "";
  
    admin
      .auth()
      .verifySessionCookie(sessionCookie, true /** checkRevoked */)
      .then((userData) => {
        console.log("Logged in:", userData.email)
        res.render("profile.html");
      })
      .catch((error) => {
        res.redirect("/login");
    });
};

// indexing
exports.index = async(req, res) => {
    return res.render("index.html");
};


// session login
exports.sessionLogin = async(req, res) => {
    const idToken = req.body.idToken.toString();
  
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
  
    admin
      .auth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          const options = { maxAge: expiresIn, httpOnly: true };
          res.cookie("session", sessionCookie, options);
          res.end(JSON.stringify({ status: "success" }));
        },
        (error) => {
          return res.status(401).send("UNAUTHORIZED REQUEST!");
        }
    );
};


// session logout
exports.sessionLogout = async(req, res) => {
    res.clearCookie("session");
    res.redirect("/login");
};