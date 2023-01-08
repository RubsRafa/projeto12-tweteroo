import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());

const PORT = 5000;
server.listen(PORT, () => {
	console.log(`SERVIDOR FUNCIONANDO NA PORTA ${PORT}`);
});

const usuarios = [];

const tweets = [];


server.post('/sign-up', (req, res) => {
	const usuario = req.body;

	if(!usuario || !usuario.username || !usuario.avatar){
		return res.status(400).send('BAD REQUEST');
	} 
	if(usuario.username === '' || typeof(usuario.username) !== 'string'){
		return res.status(400).send('BAD REQUEST');
	}
	if (usuario.avatar === '' || typeof(usuario.avatar) !== 'string') {
		return res.status(400).send('BAD REQUEST');
	}


	usuarios.push(usuario);
	return res.status(201).send(usuarios);
});

server.post('/tweets', (req, res) => {
	const post = req.body;

	if (!post || post.tweet === '' || typeof(post.tweet) !== 'string') {
		return res.status(400).send('Todos os campos são obrigatórios!');
	}

	const usuarioExiste = usuarios.find(u => u.username === post.username);

	if (!usuarioExiste) {
		return res.status(401).send("UNAUTHORIZED");
	}

	if (!post.username || !post.tweet) {
		return res.status(422).send('Objeto no formato incorreto');
	}

	const avatarUsuario = usuarios.find(u => u.username === post.username);


	tweets.push({ ...post, avatar: avatarUsuario.avatar });
	return res.status(201).send('OK');
});

server.get('/tweets', (req, res) => {
	const ultimosTweets = tweets.slice((tweets.length - 10), tweets.length);
	return res.send(ultimosTweets);
});

server.get('/tweets/:USERNAME', (req, res) => {
	const { USERNAME } = req.params;

	const usuarioSelecionado = tweets.filter((t) => t.username === USERNAME);
	const ultimosTweetsUsuario = usuarioSelecionado.slice((usuarioSelecionado.length - 10), usuarioSelecionado.length);

	return res.status(200).send(ultimosTweetsUsuario);

});
