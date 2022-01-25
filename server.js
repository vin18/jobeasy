import express from 'express';
import colors from 'colors';

const app = express();

app.get(`/`, (req, res) => {
  res.send(`Hello World!`);
});

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
app.listen(PORT, () => {
  console.log(
    `Server listening in ${NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
