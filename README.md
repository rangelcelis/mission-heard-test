# Heard (assignment)

## Instructions to start both projects

Please follow the following instructions in order to start both projects without errors.

---

### Backend (heard-backend):

Inside the directory /heard-backend, run the following commands in the terminal:

Install the dependencies

```bash
$ pnpm install
```

Create the DB and Prisma Client

```bash
$ pnpm dlx prisma migrate dev --name init
$ pnpm dlx prisma generate
```

Note: _The console must show one error with the automatic "seed" command, but it's ok._ We are going to populate the DB with the next command

```bash
$ pnpm run prisma:seed
```

Now the DB is ready and the service could be started to allow requests

```bash
$ pnpm run start:dev
```

---

### Frontend (heard-backend):

Inside the directory /heard-frontend, run the following commands in the terminal:

Install the dependencies

```bash
$ npm install
```

Start the project

```bash
$ npm run dev
```

Backend and frontend running, now you can visit the following URL to see the app:

[http://localhost:3000](http://localhost:3000)
