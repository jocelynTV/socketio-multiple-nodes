# Socket IO với cluster mode

Cách tích hợp và sử dụng socket.io cùng với Node.js sử dụng pm2 với nhiều cluster.

## Yêu cầu

- Node.js 16 hoặc cao hơn, Typescript, Yarn, PM2

## Cách sử dụng

Thực hiện các lệnh bên dưới:

```bash
yarn install
```

```bash
yarn build
```

```bash
pm2 start dist/index.js -i max
```
