# Fullstack todo list. React + TS + Redux + Postgres

## Запуск приложения.

### 1. Делаем npm install в обоих папках.
### 2. В папке backend создаем файл .env и копируем туда данные с файла .env.example.
### 3. С помощью sequelize создать базу данных. npx sequelize db:create 
### 4. С помощью sequelize накатить миграцию. npx sequelize db:migrate
### 5. Запустить два сервера. В папке backend npm run dev. В папке frontend npm start.