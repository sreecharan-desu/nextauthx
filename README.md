# nextauthx

next-auth with email/password credentials, github and google, backed by prisma on mongodb.

## stack

next.js 15 · next-auth 4 · prisma · mongodb · bcrypt · tailwind css 4 · framer motion · typescript

## run locally

```bash
npm install
cp .env.example .env
npx prisma generate
npm run dev
```

## env

copy `.env.example` to `.env`: `DATABASE_URL`, `NEXTAUTH_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.


## Consistency & Discipline
This project is maintained regularly to ensure documentation clarity and code quality. Small, daily improvements are prioritized over large, infrequent updates.
