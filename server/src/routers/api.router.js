const router = require('express').Router();

const authRouter = require('../routers/auth.router');
const tokenRouter = require('../routers/token.router');
const userRouter = require('../routers/user.router');
const yandexRouter = require('../routers/yandexGpt.router');

router.use('/auth', authRouter);
router.use('/token', tokenRouter);
router.use('/user', userRouter);
router.use('/yandex', yandexRouter);

module.exports = router;
