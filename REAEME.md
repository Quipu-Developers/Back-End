<img width="600" alt="image" src="https://github.com/Quipu-Developers/.github/assets/147997324/9122451c-e0b1-41d3-a22c-5b1cb7eb49a1">

## main web의 Back-End
- 퀴푸 메인 웹의 백엔드를 담당하는 레포지토리입니다.

## period
- 2024.01 - 2024.03

## maintainers
- 이제민 | [@ejjem](https://github.com/ejjem)

## environment
- Language: JavaScript
- Package Manager: npm 10.2.4
- Library: cors, express, mysql2

### local
- production - recommended

```bash
git clone https://github.com/Quipu-Developers/quipu-main-backend.git

npm install --production

npm node server.js
```

- develop

  ```bash
git clone https://github.com/Quipu-Developers/quipu-main-backend.git

npm install

npx sequelize db:create

npm start
```