This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Puck

`/...` is the default route and `/edit/...` is the edit route. Check `src/app/...` folder.

The database is just a local json file in `src/data/pages.json`. The `src/services/data/pages.ts` loads and store the data. The `POST /api/pages` endpoint saves the data in the json file.

All blocks available for the Editor are inside the `src/blocks/` folder. The [puck](https://puckeditor.com/docs) configuration lives in `src/services/puck` and all blocks are imported there.
