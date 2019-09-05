import http from 'http';

const PORT = 5000 || process.env.PORT;

const app = http.createServer();

app.listen(PORT, () => {
  console.log(`Server running at 127.0.0.1:${PORT}`);
});
