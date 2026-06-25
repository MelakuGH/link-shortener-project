<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Agent Instructions for Link Shortener Project

**Critical**: All LLM agents MUST follow the coding standards defined in this repository. Violations of these standards will result in code rejection.

## 📋 Quick Start for Agents

### Before Writing Any Code
1. Read this entire document
2. Identify the type of work you're doing
3. Check the relevant documentation in `/docs` - ALWAYS read the exact relevant `.md` file before generating any code
4. Follow the patterns and conventions exactly
5. Run `npm run lint` before submitting

### Project Stack
- **Framework**: Next.js 16.2.9 (breaking changes from 13/14/15)
- **Language**: TypeScript 5 (Strict Mode Required)
- **Database**: Drizzle ORM + Neon (Serverless PostgreSQL)
- **Auth**: Clerk
- **Styling**: Tailwind CSS 4 + PostCSS
- **UI**: shadcn/ui + Base UI

## 🗂️ Documentation Structure

All detailed standards are in the `/docs` directory. ALWAYS refer to the relevant .md file BEFORE generating any code:


## ⚡ How to Approach Different Tasks

### Creating a New Page/Component
```
1. Read: docs/nextjs-patterns.md (architecture)
2. Read: docs/component-patterns.md (component structure)
3. Read: docs/styling-conventions.md (styling)
4. Read: docs/code-quality.md (quality checks)
5. Implement following patterns exactly
6. Run: npm run lint
```

### Creating an API Route
```
1. Read: docs/api-patterns.md (route structure)
2. Read: docs/authentication.md (auth checks)
3. Read: docs/typescript-conventions.md (type safety)
4. Implement with exact error handling patterns
5. Run: npm run lint
```

### Working with Database
```
1. Read: docs/database-patterns.md (Drizzle patterns)
2. Read: docs/typescript-conventions.md (type inference)
3. Create migration if needed: npm run db:generate
4. Follow query patterns exactly
5. Export inferred types for use in components/APIs
```

### Styling Components
```
1. Read: docs/styling-conventions.md (Tailwind approach)
2. Read: docs/shadcn-ui.md (shadcn component usage)
3. Use utility-first approach only
4. Support responsive design (mobile/tablet/desktop)
5. Support dark mode
```

## 🔒 Mandatory Requirements

### TypeScript (STRICT)
- ❌ NO `any` types (use `unknown` and narrow if needed)
- ✅ All functions have return type annotations
- ✅ All component props defined as interfaces
- ✅ All async functions typed explicitly
- ✅ No implicit `any` errors

### Authentication (REQUIRED)
- ✅ Check `auth()` in Server Components before data access
- ✅ Verify `userId` in API routes (return 401 if missing)
- ✅ Protect private routes with redirects
- ✅ Handle auth errors gracefully

### Error Handling (REQUIRED)
- ✅ Try/catch around all async operations
- ✅ Meaningful error messages
- ✅ Proper HTTP status codes in APIs
- ✅ Error logging for debugging
- ❌ Never silent failures

### Code Quality (REQUIRED)
- ✅ `npm run lint` must pass with no errors
- ✅ No console.log statements (except errors)
- ✅ No commented-out code
- ✅ Functions under 30 lines where possible
- ✅ Clear, descriptive naming (camelCase, PascalCase, UPPER_SNAKE_CASE)

### Accessibility & Responsive (REQUIRED)
- ✅ Mobile-first responsive design
- ✅ Dark mode support
- ✅ Semantic HTML (proper heading hierarchy, etc.)
- ✅ ARIA labels for interactive elements
- ✅ Form validation and error messages

## 🚫 Common Violations (DO NOT DO)

| Violation | Reason | Correct Approach |
|-----------|--------|------------------|
| `const x: any = data` | Defeats TypeScript | `const x: unknown = data; if (typeof x === '...') { }` |
| Fetch data in Client Component | Slow, no SSR benefit | Fetch in Server Component, pass as props |
| No auth check before data access | Security vulnerability | Check `auth()` and throw/redirect if not authenticated |
| No error handling | App crashes silently | Always use try/catch for async |
| `className="w-[400px]"` arbitrary values | Bloated CSS | Use Tailwind predefined sizes: `w-96` |
| Hardcoded strings/numbers | Not maintainable | Use constants/environment variables |
| Component with 100+ lines | Too complex | Extract into smaller focused components |
| Form without validation | Poor UX, security risk | Validate on client and server |
| No dark mode support | Incomplete design | Add dark: prefixes to critical elements |
| Mixed import order | Inconsistent | Follow: built-in → external → internal |

## 📊 File Organization

```
app/                        # Pages & API routes (Next.js App Router)
├── (auth)/                # Auth route group
│   ├── login/page.tsx
│   └── signup/page.tsx
├── api/                    # API endpoints
│   └── [resource]/route.ts
├── dashboard/              # Protected pages
├── layout.tsx              # Root layout with providers
└── page.tsx                # Home page

components/                 # Reusable React components
├── ui/                    # Shadcn/ui components
└── [features]/            # Feature components

db/                        # Database layer
├── index.ts               # Drizzle client
└── schema.ts              # Table schemas with types

lib/                       # Utilities & helpers
├── db.ts                  # Common DB queries
└── utils.ts               # Common utilities

docs/                      # Agent instructions (READ THESE!)


public/                    # Static assets
.instructions.md           # Main instructions (also read this)
AGENTS.md                  # This file
```

## 🔍 Pre-Submission Checklist

Before submitting ANY code:

- [ ] **Type Safety**: `npm run lint` passes, no `any` types
- [ ] **Authentication**: Protected resources verify user identity
- [ ] **Error Handling**: All async operations have try/catch
- [ ] **Documentation**: Comments explain WHY (not WHAT) for complex logic
- [ ] **Naming**: Variables/functions follow conventions (camelCase, PascalCase, UPPER_SNAKE_CASE)
- [ ] **Responsive**: Tested on mobile, tablet, desktop
- [ ] **Dark Mode**: Implemented where applicable (use `dark:` prefix)
- [ ] **Accessibility**: Semantic HTML, ARIA labels present
- [ ] **Performance**: No unnecessary re-renders, optimized queries
- [ ] **Security**: No exposed secrets, proper validation
- [ ] **Code Style**: Functions under 30 lines, focused responsibility
- [ ] **No Debug Code**: No console.log, commented code, or test values
- [ ] **Database**: Migrations created if needed, types exported

## 💡 Key Patterns to Follow

### Server Component Fetching Data
```typescript
import { auth } from "@clerk/nextjs/server";
import { fetchUserData } from "@/lib/db";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) redirect("/login");
  
  const data = await fetchUserData(userId);
  return <ClientComponent data={data} />;
}
```

### Protected API Route
```typescript
import { auth } from "@clerk/nextjs/server";
import type { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
    
    // Your logic here
    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

### Client Component with State
```typescript
"use client";

import { useState } from "react";

interface ComponentProps {
  data: DataType;
  onAction: (id: string) => Promise<void>;
}

export function Component({ data, onAction }: ComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (id: string) => {
    setIsLoading(true);
    try {
      await onAction(id);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return <div>{/* render here */}</div>;
}
```

### Styled Component
```typescript
import { clsx } from "clsx";

interface CardProps {
  title: string;
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
}

export function Card({ title, variant = "primary", className, children }: CardProps) {
  return (
    <div
      className={clsx(
        "p-4 bg-white dark:bg-gray-900 rounded-lg border",
        {
          "border-blue-200 dark:border-blue-800": variant === "primary",
          "border-gray-200 dark:border-gray-800": variant === "secondary",
        },
        className
      )}
    >
      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      <div className="mt-4 text-gray-600 dark:text-gray-300">{children}</div>
    </div>
  );
}
```

## 🎓 Learning Resources

### Internal Documentation (Read These First!)
- [`.instructions.md`](./.instructions.md) - Main agent instructions overview
- [`docs/README.md`](./docs/README.md) - Documentation navigation guide
- See table above for specific topic docs

### External Resources
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Clerk Documentation](https://clerk.com/docs)

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start dev server at localhost:3000

# Building
npm run build            # Production build
npm start                # Production server

# Code Quality
npm run lint             # Run ESLint (MUST PASS)

# Database
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:push          # Push schema (dev only)
```

## ⚠️ Critical Warnings

1. **Next.js 16 is Different**: Check `node_modules/next/dist/docs/` for official docs
2. **Strict TypeScript**: Compile options enforce strict mode - no exceptions
3. **Server Components Default**: Everything is a Server Component unless `"use client"` is added
4. **Async Params**: Route parameters are now async in Next.js 16 - see docs
5. **Breaking Changes**: Many APIs changed - don't rely on training data

## 🚨 If You Get Stuck

1. Check relevant doc in `/docs` directory
2. Search codebase for similar implementations
3. Check external documentation links above
4. Never guess or use workarounds
5. Ask clarifying questions before implementing

## 📞 Submission Requirements

All code submissions must:
1. ✅ Pass `npm run lint` with no errors
2. ✅ Have zero TypeScript errors
3. ✅ Follow all patterns in `/docs` exactly
4. ✅ Include error handling for all async operations
5. ✅ Verify authentication on protected resources
6. ✅ Support responsive design and dark mode
7. ✅ Pass the checklist above
8. ✅ Reference relevant docs in comments if non-obvious

---

**Last Updated**: 2026-06-24  
**Framework**: Next.js 16.2.9 | **Language**: TypeScript 5  
**Status**: Active Project - Standards Enforcement Required
