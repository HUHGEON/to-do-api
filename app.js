const express = require('express');
const app = express();

app.use(express.json());

const todoRoutes = require('./routes/toDo');
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json({
    message: '할일 관리 API 실행!',
    version: '1.0.0'
  });
});

module.exports = app;