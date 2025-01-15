This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Puck

`/...` is the default route and `/edit/...` is the edit route. Check `src/app/...` folder.

The database is just a local json file (`database.json`) in the root of the project. The `src/services/database.ts` loads and store data. The `/api/edit` endpoint saves the data in the json file.

All blocks available for the Editor are inside the `src/blocks/` folder. The *puck* configuration lives in `src/services/puck.ts` and all blocks are imported there.



# TODO
* Page fields hidden (dont display on sidebar)
* Page field dynamic (dont save to page props)