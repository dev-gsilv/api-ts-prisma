import Express from 'express';
import userController from './controllers/userController';
import postController from './controllers/postController';

const app = Express();
app.use(Express.json());
const PORT = 8000;

app.get('/health', (request, response) => {
  response.send('Health check: PASSED!');
});

app.post('/createUser', userController.createUser);
app.post('/createPost', postController.createPost);
app.get('/listPosts', postController.listPosts);
app.get('/listPost/:id', postController.listPost);
app.put('/updatePost', postController.updatePost);
app.delete('/deletePost/:id', postController.deletePost);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
