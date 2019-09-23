const Users = require('../routes/Users.json').users
const passport = require('passport')

const LocalStrategy = require('passport-local')

passport.use(new LocalStrategy({

	usernameField: 'email',
	passwordField: 'password',
}, (email, password, done)=>{
	let potentialUser = Users.find((e)=>e.email===email)
	if (!potentialUser || password!==potentialUser.password){
		return done(null, false, { errors: {'email or password': 'is invalid'}})
	}
	return done(null, potentialUser)
   })
)
