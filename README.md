# 02

## Development

### Supabase

```bash
supabase link --project-ref xhsxihanqtfbnzeuksjx
```

#### Update database types

```bash
supabase gen types typescript --linked > src/types/database.types.ts
```

## Deploy

Add variables into `.env`

Install dependencies

```bash
npm i
```

Start project

```bash
npm start
```
