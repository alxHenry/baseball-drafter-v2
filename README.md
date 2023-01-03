This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What's Next

- https://github.com/users/alxHenry/projects/1/views/1

## Learnings

- react-table can be kind of a pain to work with. There's a branch `react-table-library-switch` where I tested moving over to the react-table-library-switch library instead. The DX was much better, unfortunately perf took a huge hit due to the emotion css that was used internally. Renders were 4-5x slower and noticeably slower when throttling CPU. There's a chance that once I style my table with react-table I'll end up in the same situation, it's worth testing again at that point. On production mode, the experience, even when throttled, didn't feel bad. I'm going to stick with react-table-library in the meantime and keep in mind that switching back to react-table will be one way to claw performance back if I need to.

## Relevant Docs

- Zustand: https://github.com/pmndrs/zustand/blob/main/readme.md
  - Recipes: https://docs.pmnd.rs/zustand/recipes/recipes
- Next.js 13 Docs: https://beta.nextjs.org/docs/getting-started
  - Upgrade guide: https://beta.nextjs.org/docs/upgrade-guide
- React-table docs: https://tanstack.com/table/v8/docs/guide/introduction
- React-table-library docs: https://react-table-library.com/?path=/story/getting-started-installation--page
