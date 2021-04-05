// JavaScript source code
//const mysql = require('mysql/promise');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "samyuktha",
    database: "sam2"
});

const util = require('util');

const LocalStrategy = require("passport-local").Strategy

const bcrypt = require('bcrypt')

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        //const user = getUserByUsername(username)
        console.log("u"+username)
        //console.log(password)
        const query = util.promisify(con.query).bind(con);
        //const results = await con.query("Select * from users where user='" + username + "'");
        const user = await query("Select * from users where user='" + username + "'");
        console.log(user)
        //console.log("uu" + user[0].user)
        if (user === undefined || user.length == 0) {
            return done(null, false, { message: "no user" })
        } 

        try {
            //console.log("s" + password)
            console.log(user[0].password)
            const comp = await bcrypt.compare(password, user[0].password);
            //console.log(comp) 
            if (comp == true) {
                //console.log("c")
                return done(null, user[0])
            }
            else {
                //console.log("ic")
                return done(null, false, { message: "password incorrect" })
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    passport.use(new LocalStrategy({ usernameField: "username" }, authenticateUser))
    passport.serializeUser(function (user, done) {
        //console.log("s"+user)
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        //console.log("d" + user)
        return done(null, user);
    });

}

module.exports = initialize