This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run applicaton on your machine

1. Rename `.env.local.example` to `.env.local` and pass your mnemonic phrase and Rinkeby network URL
2. Deploy your contract with running `deploy:contract`
3. Add new address of deployed contract to `/contracts/factory.ts` instead of mock address
4. Run `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

