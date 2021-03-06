const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
	client: 'pg',
	connection: {
	  connectionString : process.env.DATABASE_URL,
	  ssl: true
	}
});


db.select('*').from('users').then(data => {	
	console.log('users', data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => { res.send('it is working') })
app.post('/signin', signin.handleSignIn(db, bcrypt) );
app.post('/register', register.handleRegister(db, bcrypt) );
app.put('/image', image.handleImage(db) );
app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)});
app.get('/profile/:id', profile.handleProfileGet(db) );

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})
