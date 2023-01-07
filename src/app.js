import express from 'express'
import cors from 'cors'

const server = express();

server.use(cors());
server.use(express.json())

const PORT = 5000;
server.listen(PORT, () => {
	console.log(`SERVIDOR FUNCIONANDO NA PORTA ${PORT}`)
})

const usuarios = [
	// {
	// 	username: 'Rubs',
	// 	avatar: 'avatar Rubs'
	// },
	// {
	// 	username: 'Zilda',
	// 	avatar: 'avatar Zilda'
	// },
	// {
	// 	username: 'Rubens',
	// 	avatar: 'avatar Rubens'
	// }
]

const tweets = [];


server.post('/sign-up', (req, res) => {
	const usuario = req.body

	if (!usuario.username || !usuario.avatar) {
		return res.status(422).send('Objeto no formato incorreto')
	}

	usuarios.push(usuario)
	res.status(200).send(usuarios)
})

server.post('/tweets', (req, res) => {
	const post = req.body

	const usuarioExiste = usuarios.find(u => u.username === post.username)

	if (!usuarioExiste) {
		return res.status(401).send("UNAUTHORIZED")
	}

	if (!post.username || !post.tweet) {
		return res.status(422).send('Objeto no formato incorreto - POST')
	}

	const avatarUsuario = usuarios.find(u => u.username === post.username)


	tweets.push({ ...post, avatar: avatarUsuario.avatar })
	res.status(200).send('OK')
})

server.get('/tweets', (req, res) => {
	const ultimosTweets = tweets.slice((tweets.length - 10), tweets.length)
	res.send(ultimosTweets)
})


