# GitHub Copilot Instructions for am.pm Restaurant Ordering System

## Project Overview

This is a Next.js-based Indonesian restaurant online ordering system called "am.pm". The application allows customers to browse menu items by category, add items to cart, and place orders. It includes an admin panel for managing menu items and categories.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Drizzle ORM
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: Jotai (for cart state)
- **Package Manager**: Bun
- **Icons**: React Icons (FontAwesome 6)
- **Image Handling**: Next.js Image component
- **Deployment**: Vercel

## Project Structure

### Core Directories

- `/app` - Next.js app router pages and components
- `/components` - Reusable UI components (shadcn/ui based)
- `/database` - Database schema, migrations, and query functions
- `/lib` - Utility functions and authentication
- `/atoms` - Jotai state atoms
- `/public` - Static assets including menu item images

### Key App Routes

- `/` - Landing page with branding and navigation
- `/order` - Main menu browsing and ordering interface
- `/cart` - Order confirmation and customer details
- `/admin` - Admin authentication and dashboard
- `/admin/menu` - Menu item management (CRUD)
- `/admin/categories` - Category management (CRUD)

## Database Schema

### Tables

1. **menu** - Menu items with name, description, price, image, category, and order
2. **categories** - Menu categories with name and display order
3. **orders** - Customer orders with name, address, and transaction date
4. **order_lines** - Individual items within an order

### Key Relationships

- Menu items belong to categories (categoryId foreign key)
- Order lines belong to orders (orderId foreign key)
- Both menu items and categories have an "order" field for display sorting

## Coding Guidelines

### Language and Localization

- All user-facing text should be in **Indonesian (Bahasa Indonesia)**
- Admin interface uses Indonesian labels and messages
- Currency formatting uses Indonesian Rupiah (IDR)

### Component Patterns

- Use Server Components by default for data fetching
- Use "use client" directive only when client-side interactivity is needed
- Prefer server actions for form submissions and mutations
- Use TypeScript interfaces from `/types.ts` for type safety

### Styling Conventions

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use shadcn/ui components for consistency
- Brand color: `#EDA94C` for the am.pm logo and accents
- Use stone/neutral color palette for backgrounds and text

### State Management

- Use Jotai atoms for client-side state (cart, contact info)
- Cart state persists across page navigation
- Server state is managed through Next.js caching and server components

### Image Handling

- Menu item images stored in `/public/images/menu/`
- Use Next.js Image component with proper width/height
- Fallback to gray placeholder when image is missing
- Images should be optimized and properly named

### Form Handling

- Use server actions for form submissions
- Implement proper validation and error handling
- Use useFormState hook for form state management
- Redirect after successful mutations

### Database Operations

- Use unstable_cache for read operations with proper tags
- Implement revalidateTag after mutations
- Use transactions for multi-table operations
- Follow the existing pattern for CRUD operations in `/database/index.ts`

## Authentication

- Simple admin authentication using environment variables
- Use `isLoggedIn()` helper function to protect admin routes
- Redirect unauthorized users appropriately

## Environment Variables

- `DATABASE_URL` - SQLite database connection string
- `DATABASE_AUTH_TOKEN` - Database authentication token
- `NEXT_PUBLIC_INSTAGRAM` - Instagram handle for social links
- `NEXT_PUBLIC_PHONE_NUMBER` - WhatsApp phone number for contact
- `ADMIN_USERNAME` - Admin login username
- `ADMIN_PASSWORD` - Admin login password

## Common Patterns

### Menu Item Display

```tsx
// Always include fallback for missing images
{
  item.image ? (
    <Image src={item.image} width={120} height={120} alt={item.name} />
  ) : (
    <div className="h-[120px] w-[120px] rounded bg-stone-200"></div>
  );
}
```

### Currency Formatting

```tsx
import { formatCurrency } from "@/lib/utils";
// Use for all price displays
{
  formatCurrency(item.price);
}
```

### Server Actions Pattern

```tsx
// Always check authentication for admin actions
export async function adminAction(formData: FormData) {
  "use server";

  if (!(await isLoggedIn())) {
    return { error: "Unauthorized" };
  }

  // Validation and processing
  // Redirect after success
}
```

### Cart Operations

```tsx
// Use cart atom for state management
import { useAtom } from "jotai";
import { cartAtom } from "@/atoms/cart";

const [cart, setCart] = useAtom(cartAtom);
```

## Development Commands

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun db:migrate` - Generate database migrations
- `bun db:push` - Push schema changes to database
- `bun db:studio` - Open Drizzle Studio for database management

## Performance Considerations

- Use Next.js Image optimization for menu photos
- Implement proper caching strategies with unstable_cache
- Use server components to reduce client-side JavaScript
- Optimize database queries and use proper indexing

## Testing and Quality

- Maintain TypeScript strict mode compliance
- Use proper error boundaries and error handling
- Implement loading states for better UX
- Follow accessibility best practices with proper alt text and semantic HTML

When working on this project, prioritize user experience, maintain consistency with existing patterns, and ensure all text remains in Indonesian for the target audience.
