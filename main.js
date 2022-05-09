const express = require('express');
const morgan = require('morgan');
const { sequelize } = require("./models");
const UserRouter = require('./routes/UserRoute')
const app = express();
app.set('port', process.env.PORT || 3000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결됨.');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // uri 파싱

app.use('/test', function (req, res) {
  res.send("test");
})

app.use('/user', UserRouter)




app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  // 템플릿 변수 설정
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 배포용이 아니라면 err설정 아니면 빈 객체
  res.status(err.status || 500);
  res.send('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
