Для запуска проекта требуется:
Форк репозитория, либо копирование ssh ключа и открытие.
После необходимо выполнить установку зависимостей как на 
client => npm i
так и на 
server => npm i

Для работы приложения, потребуюется создание .env файлов как на сервере так и на клиенте
в .env на клиенте

VITE_YANDEX_API_KEY=введите свой api ключ


VITE_YANDEX_OAUTH_KEY=введите свой oauth key

VITE_API=/api


VITE_TARGET=http://localhost:3000

VITE_API_URL=http://localhost:3000/api


VITE_API_STRAIGHT=http://localhost:3000/api 

.env на сервере 

PORT=3000
DB=postgres://<userName>:<password>@localhost:5432/<BdName>


SECRET_ACCESS_TOKEN='access'  


SECRET_REFRESH_TOKEN='refresh'  


YANDEX_API_KEY=введите свой api ключ


YANDEX_FOLDER_ID=введите свой folder id


CLIENT_URL=http://localhost:5173

Так как YandexGPT не дает отправлять на прямую запросы с фронтенда (браузера) пришлось проксировать своим сервером.

В самом проекте реализован UI, данные истории чатов хранятся в indexDB, пользователь и сообщения хранятся в MobX.

Хотелось бы использовать Socket.io для того, что бы не ждать ответ от чата, а видеть как ответ набирается в реальном времени, но это очень трудоемко

Если есть вопросы, по запуску проекта, можете связаться со мной.)
