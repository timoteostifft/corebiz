# 🌐 Corebiz

### 📚 Library

- Typescript
- Express
- Awilix
- Prisma
- Joi

### 🚀 How To Use

1. Clone repository:

```bash
  git clone https://github.com/timoteostifft/corebiz.git && cd corebiz
```

2. Create your own .env copying env.example.

```bash
  cp /.env.example /.env
```

3. Ensure you have [pnpm](https://pnpm.io/pt/) installed

4. Install local dependencies.

```bash
  pnpm install
```

5. Run using docker-compose:

```bash
  docker-compose up --build
```

6. Run the seed:

```bash
  npx prisma migrate dev && pnpm run seed
```

### 🧪 Testing

1. Run using the default script:

```bash
  pnpm run test
```

### 📌 Notes

A database manager can be created using:

```bash
  npx prisma studio
```

The API docs can be found [here](http://localhost:3333/docs/)
