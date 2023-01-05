import express from 'express'
import cors from 'cors'

const server = express(); 

server.use(cors());

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`SERVIDOR FUNCIONANDO NA PORTA ${PORT}`)
})

const posts = [
	{
		username: "bobesponja",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
		tweet: "eu amo o hub"
	}
]

server.get('/tweets', (req, res) => {
    res.send(posts)
})