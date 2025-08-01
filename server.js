const app = require('./app');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번에서 실행중입니다!`);
});