# Ni Ni Digital Media

A modern, responsive digital media company website built with Next.js 16, React 19, and TypeScript. Features a professional landing page, admin dashboard, contact management system, and comprehensive UI component library.

## Features

- **Modern UI Components** - Pre-built, customizable Radix UI-based component library
- **Responsive Design** - Fully responsive layout with Tailwind CSS
- **Admin Dashboard** - Dedicated admin section for managing company content
- **Contact Management** - Integrated contact/inquiry system with Zod validation
- **Theme Support** - Light/dark mode with next-themes
- **Form Handling** - Robust form management with React Hook Form
- **Analytics** - Vercel Analytics integration
- **Particle Effects** - Interactive particle field animations
- **Charts & Data Visualization** - Recharts integration for data display

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with SSR and static generation
- **Runtime**: [React 19](https://react.dev/) - UI library
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible component primitives
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) - Toast notifications
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## Project Structure

```
.
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   └── admin/                   # Admin section
│       └── page.tsx             # Admin dashboard
├── components/                  # React components
│   ├── navbar.tsx              # Navigation bar
│   ├── footer.tsx              # Footer
│   ├── particle-field.tsx       # Particle effects
│   ├── theme-provider.tsx       # Theme provider wrapper
│   ├── sections/                # Page sections
│   │   ├── hero.tsx            # Hero/landing section
│   │   ├── about.tsx           # About section
│   │   ├── services.tsx        # Services section
│   │   ├── why-us.tsx          # Why choose us section
│   │   ├── contact.tsx         # Contact section
│   │   ├── login.tsx           # Login section
│   │   └── admin.tsx           # Admin content
│   └── ui/                      # UI component library
│       └── [50+ reusable components]
├── hooks/                       # Custom React hooks
│   ├── use-mobile.ts           # Mobile detection hook
│   └── use-toast.ts            # Toast notifications hook
├── lib/                         # Utility functions
│   └── utils.ts                # Helper functions
├── data/                        # Static data
│   └── inquiries.json          # Contact inquiries data
├── public/                      # Static assets
├── styles/                      # Global styles
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
└── package.json                # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Nini_Digital_Media
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## UI Components

The project includes a comprehensive library of 50+ UI components built with Radix UI and Tailwind CSS:

**Layout & Structure**: Accordion, AlertDialog, Breadcrumb, Card, Drawer, Sheet, Sidebar, Tabs, Resizable

**Input & Forms**: Button, Checkbox, Input, InputOTP, RadioGroup, Select, Slider, Switch, Textarea, Toggle, Form, Field, InputGroup

**Interaction**: ContextMenu, DropdownMenu, Menubar, NavigationMenu, Popover, CommandPalette

**Display**: Alert, Avatar, Badge, Calendar, Carousel, Chart, Empty, Hover-card, Kbd, Label, Pagination, Progress, Skeleton, Table, Tooltip

**Feedback**: Toast, Toaster, Spinner

## Development

### Project Structure Notes

- **Page sections** are located in `components/sections/` for easy management
- **UI components** are reusable and located in `components/ui/`
- **Hooks** for mobile detection and toast notifications are in the `hooks/` directory
- **Inquiries** data is stored in `data/inquiries.json`

### Theme System

The project uses `next-themes` for light/dark mode support. The theme provider is set up in `components/theme-provider.tsx`.

### Form Validation

Forms use React Hook Form with Zod for schema validation. See `components/sections/contact.tsx` for examples.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will auto-detect Next.js configuration
4. Deploy!

### Other Platforms

Build and start the production server:
```bash
npm run build
npm start
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is private and proprietary.

## Support

For issues and questions, please contact the development team.
