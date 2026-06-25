# shadcn UI Guidelines

This project uses `shadcn/ui` for all UI components. Do not create custom UI components unless a new shadcn component is explicitly added to the repo.

## Rules

- Use `shadcn/ui` components for buttons, forms, cards, inputs, modals, dropdowns, and layout elements.
- Do not implement custom styled components for UI primitives.
- Keep the component tree small by composing existing shadcn components rather than recreating them.
- Use the repository `components/ui/` folder when importing shadcn components.

## When building pages

- Prefer shadcn form components for validated inputs.
- Use shadcn buttons, alerts, and dialogs for interactions.
- For layout and spacing, use Tailwind utility classes together with shadcn wrappers.

## Best practice

- Follow the existing shadcn usage patterns in the repository.
- If an interface needs a new component, add it through the shadcn workflow and keep it consistent with the current design system.
- Avoid duplicated UI logic by reusing shadcn primitives.
