<h1> HankVanRose AI Assistant </h1>


<div>Проект виртуального помощника на базе YandexGPT</div>


<h2>Для запуска проекта требуется:</h2>

Форк репозитория, либо копирование ssh ключа и клонироывник себе и открытие.
После необходимо выполнить установку зависимостей  


<h4>На client: </h4>
client => npm i


<h4>На server: </h4>
server => npm i


Для работы приложения, потребуюется создание .env файлов как на сервере так и на клиенте

<h3> .env на клиенте</h3>



VITE_YANDEX_API_KEY=введите свой api ключ


VITE_YANDEX_OAUTH_KEY=введите свой oauth key

VITE_API=/api


VITE_TARGET=http://localhost:3000


VITE_API_URL=http://localhost:3000/api



VITE_API_STRAIGHT=http://localhost:3000/api 


<h3> .env на сервере: </h3>


PORT=3000


DB=postgres://<userName>:<password>@localhost:5432/<BdName>



SECRET_ACCESS_TOKEN='access'  



SECRET_REFRESH_TOKEN='refresh'  



YANDEX_API_KEY=введите свой api ключ



YANDEX_FOLDER_ID=введите свой folder id



CLIENT_URL=http://localhost:5173



Так как YandexGPT не дает отправлять на прямую запросы с фронтенда (браузера) пришлось проксировать своим сервером.


В самом проекте реализован UI, данные истории чатов хранятся в indexDB, пользователь и сообщения хранятся в MobX.



Если есть вопросы, по запуску проекта, можете связаться со мной.)
телеграм @hankvanrose
