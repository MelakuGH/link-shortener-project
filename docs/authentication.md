# Authentication Guidelines

All authentication in this project is handled by Clerk. No other auth methods may be used.

## Key requirements

- Use Clerk for sign in and sign up only.
- Sign in and sign up must open as Clerk modal flows.
- Protect the `/dashboard` page so only authenticated users can access it.
- If an authenticated user opens the homepage, redirect them to `/dashboard`.
- Do not add custom auth providers, token logic, or alternate auth middleware.

## Route behavior

- `/dashboard` is a protected route.
- On server-rendered pages, call `auth()` from `@clerk/nextjs/server` before any protected data access.
- If the request has no `userId`, redirect to Clerk sign in or return `401` from APIs.
- If an authenticated user lands on `/`, redirect to `/dashboard`.

## API and data access

- In API routes, verify `userId` from `auth()`.
- Return `401` for missing authentication.
- Use `try/catch` around all async operations and log errors.

## Implementation notes

- Keep auth logic in server-side components or Next.js route handlers.
- Use Clerk modal helpers rather than hardcoded sign-in pages.
- Keep auth flows consistent across the app and avoid duplicate auth checks.
