This is a boilerplate that I use while creating Next.js apps with Supabase. Auth is fully functional and is based on email/password. You can use it for free. I also added custom i18n based on cookies and simple objects with translations. Feel free to remove it if not needed.

To convert svgs to components just put them in directory /icons in the root of the project and then run
```bash
npm run svgr
```

To check eslint and typescript errors run these commands

```bash
npm run tsc
npm run lint
```

To generate types from supabase run

```bash
npm run gen-types
```

Make sure to link your supabase account beforehand. For this check [Supabase Docs](https://supabase.com/docs/reference/cli/supabase-link).

To launch project

```bash
npm run dev
```