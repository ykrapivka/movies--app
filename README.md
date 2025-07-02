# Movies App

Цей проект — фронтенд додатку для збереження та пошуку фільмів.  
Для роботи використовується окремий Docker-образ бекенду з API: [webbylabhub/movies](https://hub.docker.com/r/webbylabhub/movies).


## Запуск бекенд-сервера
```bash
docker run --name movies-api -p 8000:8000 webbylabhub/movies
```
Бекенд API буде доступний за адресою: http://localhost:8000/api/v1

## Запуск фронтенду
```bash
docker run --name movies -p 3000:80 -e VITE_API_URL=http://localhost:8000/api/v1 egorkr12/movies-app2
```

Змінна оточення VITE_API_URL вказує на URL бекенд API.

Фронтенд буде доступний на http://localhost:3000.

DockerHub образ фронтенду: [https://hub.docker.com/repository/docker/egorkr12/movies-app/general](https://hub.docker.com/repository/docker/egorkr12/movies-app2/general)

Текстовий файл з фільмами для імпорту: https://gist.github.com/k0stik/3028d42973544dd61c3b4ad863378cad
