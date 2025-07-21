const router = require('express').Router();

const authRouter = require('../routers/auth.router');
const tokenRouter = require('../routers/token.router');

const yandexRouter = require('../routers/yandexGpt.router');

router.use('/auth', authRouter);
router.use('/token', tokenRouter);

router.use('/yandex', yandexRouter);

module.exports = router;
