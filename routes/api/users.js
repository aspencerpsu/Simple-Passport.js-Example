const passport = require('passport')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const auth = require('../auth')
const Users = require('../users.json').users

const toAuthJSON = function({id,email,token}) {
	return {
	  id,
	  email,
	  token,
	}
}

const generateJWT = function({email, id}) {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);
  
	return jwt.sign({
	  email,
	  id,
	  exp: parseInt(expirationDate.getTime() / 1000, 10),
	}, 'secret')
}


  
router.post('/login', auth.optional, (req, res, next)=>{
	console.log(req.query, req.body, req.session, req.params)
	const {body: {email,password}} = req

	if (!email){
		return res.status(422).json({
			errors: {
				email: 'is required'
			},
		})
	}


	if (!password){
		return res.status(422).json({
			errors: {
				password: 'is required'
			}
		})
	}

	return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
		if (err) return next(err)

		if (passportUser) {
			const user = passportUser
			user.token = generateJWT(user)

			return res.json({ user: toAuthJSON(user) })
		}

		return res.status(400).send("Invalid Email or response")
	})(req, res, next)
})

router.get('/current', auth.required, (req, res, next) => {

	const { payload: { id } } = req

	const potentialUser = Users.find(e=>e.id===id)

	if (!potentialUser){
		return res.sendStatus(400)
	}

	return res.json({userInfo: JSON.stringify(potentialUser)})
})

module.exports = router
