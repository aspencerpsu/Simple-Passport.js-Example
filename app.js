const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')

const errorHandler = require('errorhandler')

const isProduction = process.env.NODE_ENV === 'production'


const app = express()

app.use(cors())
app.use(require('morgan')('dev'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'public')))

app.use(session({secret: 'passport-example', cookie: { maxAge: 60000 }, resave: false, saveUnitialized: false }))
if(!isProduction){
	app.use(errorHandler())
}

if (!isProduction){
	app.use((err, req, res)=>{
		res.status(err.status || 500)

		res.json({
			errors: {
				message: err.message,
				error: err
			}
		})
	})
}

require('./config/passport')

app.use(require('./routes'))

app.listen(8000, ()=>console.log('Server runs on 8000 port'))
