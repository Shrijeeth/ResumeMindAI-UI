# ResumeMindAI-UI - AI Coding Rules & Conventions

## Project Overview

**Stack:** Next.js 14+ (App Router) | TypeScript 5.x | Tailwind CSS v4 | React 19.x

**Purpose:** Landing page for ResumeMindAI - A modern, dark-themed web application featuring AI-powered career intelligence mapping.

**Architecture:** Component-based with feature-driven folder organization, utility-first styling, and strict TypeScript.

---

## 🎨 Design System - Color Palette (CRITICAL: DO NOT MODIFY)

### Core CSS Variables (app/globals.css)

**NEVER change these values:**

```css
--background-dark: #0f172a    /* Main page background */
--surface-dark: #1e293b       /* Cards, elevated surfaces */
--primary: #8b5cf6            /* Purple - primary brand color */
--primary-glow: rgba(139, 92, 246, 0.4)  /* Purple glow for shadows */
--accent-blue: #3b82f6        /* Secondary blue accent */
```

### Complete Color Catalog

#### Primary Brand Colors

**Purple (Primary Brand Color)**
- CSS Variable: `var(--primary)` or `#8b5cf6`
- Tailwind: `bg-primary`, `text-primary`, `border-primary`
- **Usage:** Primary CTA buttons, logo containers, accent text, highlights, status badges
- **Examples:**
  - Navigation logo background: `bg-primary`
  - Main CTA button: `bg-primary hover:bg-violet-600`
  - Feature section headings: `text-primary`
  - Status badge background: `bg-primary/5`, border: `border-primary/20`

**Violet (Purple Hover State)**
- Hex: `#7c3aed`
- Tailwind: `violet-600`
- **Usage:** Hover states for primary purple buttons
- **Example:** `bg-primary hover:bg-violet-600`

#### Accent Colors

**Emerald Green (Success/Live State)**
- Hex: `#34d399` (emerald-400), `#6ee7b7` (emerald-300)
- Tailwind: `emerald-400`, `emerald-300`
- **Usage:** "Live" status indicators, success states, positive actions, accent borders
- **Examples:**
  - Live badge dot: `bg-emerald-400` with `animate-ping`
  - CTA button accent border: `border-emerald-300/70`
  - Success indicators, green accents

**Blue (Interactive Elements)**
- Hex: `#60a5fa` (blue-400), `#3b82f6` (blue-500)
- Tailwind: `blue-400`, `blue-500`
- CSS Variable: `var(--accent-blue)`
- **Usage:** Interactive graph icons, secondary features, tech indicators
- **Examples:**
  - Feature card icon: `text-blue-400` with `bg-blue-500/10`
  - Interactive elements, links

**Orange (Warning/Highlight)**
- Hex: `#fb923c` (orange-400), `#f97316` (orange-500)
- Tailwind: `orange-400`, `orange-500`
- **Usage:** Warning states, insights icons, attention-grabbing elements
- **Examples:**
  - Feature card icon: `text-orange-400` with `bg-orange-500/10`
  - Highlight indicators

#### Background Colors

**Dark Backgrounds**
- `--background-dark` (#0f172a): Main page background
  - Use as: `bg-background-dark` or `body` default
- `--surface-dark` (#1e293b): Card surfaces, elevated elements
  - Use as: part of `.glass-card` effect
- Semi-transparent: `bg-background-dark/80` (navbar), `bg-slate-800` (card hovers)

**Opacity Variations for Effects**
- `bg-primary/10` - Light purple tint (10% opacity) for glow effects
- `bg-primary/5` - Very light tint (5% opacity) for status badge backgrounds
- `bg-primary/80` - Slightly transparent purple
- `bg-blue-500/10`, `bg-emerald-500/10`, `bg-orange-500/10` - Feature icon backgrounds

#### Text Colors

**Primary Text**
- `text-white` (#ffffff): Primary headings, navigation text, prominent content
  - H1, H2, H3 headings
  - Navigation links (on hover)
  - Button labels

**Secondary Text**
- `text-slate-400` (#94a3b8): Body text, descriptions, subtext
  - Paragraphs, descriptions
  - Navigation links (default state)
  - Secondary information

**Accent Text**
- `text-primary`: Purple accent text, section labels, highlights
- `text-blue-400`: Blue icon text
- `text-emerald-400`: Green icon text
- `text-orange-400`: Orange icon text

#### Border Colors

- `border-primary/20` - Subtle purple borders (status badges)
- `border-slate-800/50` - Dark borders with transparency (navbar)
- `border-slate-700/50` - Slightly lighter dark borders (glass cards)
- `border-emerald-300/70` - Green accent borders (CTA buttons)
- `border-white/10` - Very subtle white borders (glass effect)

#### Shadow Colors

- `shadow-primary/30` - Purple glow shadow (30% opacity) on CTAs
- `shadow-primary/25` - Purple glow shadow (25% opacity) on nav CTAs
- `shadow-primary/20` - Purple glow shadow (20% opacity) on logos
- `shadow-xl` - Standard extra-large shadow with purple tint

### Custom CSS Classes (DO NOT MODIFY)

#### .text-gradient
```css
.text-gradient {
  background: linear-gradient(135deg, #c084fc 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
**Usage:** Hero headings, special emphasis text
**Example:** `<span className="text-gradient">Knowledge Graph</span>`

#### .dashboard-mockup-shadow
```css
.dashboard-mockup-shadow {
  box-shadow: 0 0 50px -12px var(--primary-glow);
}
```
**Usage:** Purple glow effect on dashboard mockup, elevated components
**Example:** `<div className="dashboard-mockup-shadow">`

#### .glass-card
```css
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```
**Usage:** Feature cards, overlay panels, frosted glass aesthetic
**Example:** `<div className="glass-card p-6 rounded-xl">`

---

## 🎨 Color Preservation Guide

### How to Maintain Color Consistency

**When adding new components:**

1. **Always reference existing color patterns** from the catalog above
2. **Use Tailwind color classes**, not hardcoded hex values
3. **Follow the color usage patterns**:
   - Purple (`primary`) for brand elements and CTAs
   - Emerald for success/live states
   - Blue for interactive elements
   - Orange for warnings/highlights
   - Slate grays for text hierarchy

**Example: Adding a new feature card**

✅ **CORRECT:**
```tsx
<div className="glass-card p-6">
  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
    <span className="material-symbols-outlined text-emerald-400">check_circle</span>
  </div>
  <h3 className="text-xl font-semibold text-white">New Feature</h3>
  <p className="text-slate-400">Description text</p>
</div>
```

❌ **WRONG:**
```tsx
<div className="bg-gray-900 p-6">
  <div className="w-12 h-12 bg-green-200 rounded-lg">
    <span style={{color: '#00ff00'}}>✓</span>
  </div>
  <h3 className="text-xl font-semibold" style={{color: '#ffffff'}}>New Feature</h3>
  <p style={{color: '#999999'}}>Description text</p>
</div>
```

**Why the first is correct:**
- Uses `glass-card` class for consistency
- Uses opacity-based backgrounds (`bg-emerald-500/10`)
- Uses Tailwind color classes (`text-emerald-400`, `text-white`, `text-slate-400`)
- Maintains existing color patterns

**Why the second is wrong:**
- Uses generic `bg-gray-900` instead of `glass-card`
- Wrong green shade (`bg-green-200` instead of emerald)
- Inline styles with hardcoded hex values
- Wrong gray shades

### Color Decision Tree

**When choosing colors for new elements, ask:**

1. **Is this a primary action/CTA?** → Use `bg-primary` with `hover:bg-violet-600`
2. **Is this a success/live indicator?** → Use `emerald-400` or `emerald-300`
3. **Is this an interactive icon?** → Use `blue-400` or `blue-500`
4. **Is this a warning/highlight?** → Use `orange-400` or `orange-500`
5. **Is this body text?** → Use `text-slate-400`
6. **Is this a heading?** → Use `text-white` or `text-primary`
7. **Is this a card/panel?** → Use `glass-card` class
8. **Is this a border?** → Use `border-slate-700/50` or `border-white/10`

### Common Color Combinations

**Primary CTA Button:**
```tsx
className="bg-primary hover:bg-violet-600 text-white px-6 py-3 rounded-lg
           font-semibold shadow-lg shadow-primary/30 transition-colors"
```

**Secondary Glass Button:**
```tsx
className="glass-card text-white px-6 py-3 rounded-lg font-semibold
           hover:bg-slate-800 transition-all border border-slate-700/50"
```

**Feature Card Icon Container:**
```tsx
// Purple theme
className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"
// With icon: className="text-primary"

// Blue theme
className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center"
// With icon: className="text-blue-400"

// Emerald theme
className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center"
// With icon: className="text-emerald-400"
```

**Status Badge:**
```tsx
className="inline-flex items-center px-4 py-1.5 rounded-full
           border border-primary/20 bg-primary/5 text-primary"
```

---

## 📁 Component Architecture

### Folder Structure (MANDATORY)

```
app/
├── components/
│   ├── layout/          # Global layout (Navbar, Footer)
│   ├── hero/            # Hero sections, banners
│   ├── features/        # Feature cards, grids
│   ├── process/         # Process steps, timelines
│   ├── trust/           # Trust indicators, tech banners
│   └── cta/             # Call-to-action sections
├── page.tsx             # Home page (imports components)
├── layout.tsx           # Root layout
└── globals.css          # Global styles, CSS variables
```

**Naming Conventions:**
- **Files:** PascalCase (e.g., `HeroSection.tsx`, `FeatureCard.tsx`)
- **Folders:** kebab-case (e.g., `call-to-action/`, `pricing-section/`)
- **One component per file**
- **Default exports** for components

**Organizational Rules:**
1. **Group by feature/domain**, NOT by type
   - ✅ `features/FeatureCard.tsx`
   - ❌ `cards/FeatureCard.tsx`

2. **Keep related components together**
   - `hero/HeroSection.tsx` + `hero/DashboardMockup.tsx`

3. **Never create generic folders**
   - ❌ `/common`, `/shared`, `/ui`, `/buttons`

---

## ✅ Component Patterns (MUST FOLLOW)

### 1. Data-Driven Components with Mapping

**PREFERRED PATTERN:**

```tsx
// FeaturesSection.tsx
import FeatureCard from './FeatureCard';

export default function FeaturesSection() {
  const features = [
    {
      icon: 'auto_awesome',
      iconColor: 'bg-primary/10',
      iconTextColor: 'text-primary',
      title: 'AI-Powered Analysis',
      description: 'Advanced AI extraction...'
    },
    {
      icon: 'hub',
      iconColor: 'bg-blue-500/10',
      iconTextColor: 'text-blue-400',
      title: 'Interactive Explorer',
      description: 'Navigate your career...'
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Why this is good:**
- Data array separates content from presentation
- Easy to add/remove/reorder features
- Maps to reusable component
- Clean, maintainable code

### 2. Typed Props with TypeScript Interfaces

**ALWAYS define prop interfaces:**

```tsx
// FeatureCard.tsx
interface FeatureCardProps {
  icon: string;
  iconColor: string;
  iconTextColor: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  iconColor,
  iconTextColor,
  title,
  description
}: FeatureCardProps) {
  return (
    <div className="glass-card p-6 rounded-xl group hover:scale-105 transition-transform">
      <div className={`w-12 h-12 rounded-lg ${iconColor} flex items-center justify-center mb-4`}>
        <span className={`material-symbols-outlined text-2xl ${iconTextColor}`}>
          {icon}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}
```

### 3. Composition Over Large Components

**Break down large components into smaller, focused sub-components:**

✅ **CORRECT:**
```tsx
// hero/HeroSection.tsx
import DashboardMockup from './DashboardMockup';

export default function HeroSection() {
  return (
    <header className="relative pt-16 pb-32">
      {/* Hero content */}
      <DashboardMockup />
    </header>
  );
}

// hero/DashboardMockup.tsx
export default function DashboardMockup() {
  return (
    <div className="dashboard-mockup-shadow">
      {/* Complex mockup visualization */}
    </div>
  );
}
```

❌ **WRONG:**
```tsx
// hero/HeroSection.tsx (500 lines)
export default function HeroSection() {
  return (
    <header>
      {/* 100 lines of hero content */}
      <div className="dashboard-mockup">
        {/* 400 lines of mockup visualization */}
      </div>
    </header>
  );
}
```

**Rule:** Keep components under 200 lines. If larger, refactor into sub-components.

### 4. No Hardcoding in Page Files

❌ **ANTI-PATTERN: Hardcoding in page.tsx**
```tsx
// app/page.tsx - DON'T DO THIS
export default function Home() {
  return (
    <main>
      <section className="py-20">
        <h1 className="text-5xl font-bold">Welcome</h1>
        <button className="bg-primary px-6 py-3">Get Started</button>
        {/* 100 lines of hardcoded JSX */}
      </section>
    </main>
  );
}
```

✅ **CORRECT PATTERN: Extract to components**
```tsx
// app/page.tsx
import HeroSection from './components/hero/HeroSection';
import FeaturesSection from './components/features/FeaturesSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}

// app/components/hero/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="py-20">
      <h1 className="text-5xl font-bold">Welcome</h1>
      <button className="bg-primary px-6 py-3">Get Started</button>
      {/* Component-specific JSX */}
    </section>
  );
}
```

---

## 🛠️ Code Standards

### TypeScript

**Strict mode enabled - follow these rules:**

✅ **DO:**
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ variant, children, onClick }: ButtonProps) {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold";
  const variantClasses = variant === 'primary'
    ? "bg-primary hover:bg-violet-600 text-white"
    : "glass-card hover:bg-slate-800 text-white";

  return (
    <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

❌ **DON'T:**
```tsx
function Button(props: any) {  // ❌ Using 'any'
  return (
    <button onClick={props.onClick}>  {/* ❌ Unsafe access */}
      {props.children}
    </button>
  );
}
```

**Path Aliases:**
```tsx
// ✅ Use @/ for imports from root
import { FeatureCard } from '@/app/components/features/FeatureCard';

// ❌ Don't use relative paths for distant files
import { FeatureCard } from '../../../components/features/FeatureCard';
```

### React Best Practices

1. **Functional components only** - No class components
2. **Use built-in hooks:** `useState`, `useEffect`, `useMemo`, `useCallback`
3. **Stable keys in lists:** Prefer unique IDs over indices
   ```tsx
   // ✅ Good (if no unique ID available)
   {items.map((item, index) => <Item key={index} {...item} />)}

   // ✅ Better (when items have IDs)
   {items.map((item) => <Item key={item.id} {...item} />)}
   ```
4. **Event handler naming:** Use `handle` prefix
   ```tsx
   const handleClick = () => { /* ... */ };
   const handleSubmit = (e: React.FormEvent) => { /* ... */ };
   ```

### Tailwind CSS Standards

#### Class Organization Order
```tsx
className="
  flex items-center justify-center    // Layout
  gap-4 p-6 mb-8                      // Spacing
  text-lg font-semibold               // Typography
  text-white bg-primary               // Colors
  rounded-lg shadow-lg                // Effects
  hover:scale-105 transition-transform // Interactions
"
```

#### Responsive Design (MANDATORY)
```tsx
// ✅ Always add responsive breakpoints
className="text-4xl lg:text-5xl"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
className="py-20 lg:py-32"
className="hidden md:flex"

// ❌ Don't skip mobile considerations
className="text-5xl"  // Too large on mobile
className="grid grid-cols-4"  // Breaks on mobile
```

#### Component-Specific Classes

**Buttons:**
```tsx
// Primary CTA
className="bg-primary hover:bg-violet-600 text-white px-6 py-3 rounded-lg
           font-semibold shadow-lg shadow-primary/30 transition-colors"

// Secondary
className="glass-card text-white px-6 py-3 rounded-lg font-semibold
           hover:bg-slate-800 transition-all border border-slate-700/50"
```

**Cards:**
```tsx
className="glass-card p-6 rounded-xl group hover:scale-105 transition-transform"
```

**Sections:**
```tsx
className="py-20 lg:py-32"
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

#### Spacing Standards
- **Container max-width:** `max-w-7xl`
- **Container padding:** `px-4 sm:px-6 lg:px-8`
- **Section vertical spacing:** `py-20 lg:py-32`
- **Card padding:** `p-6` or `p-8`
- **Grid gaps:** `gap-6` (small), `gap-8` (medium), `gap-12` (large)

---

## 🎭 Icons & Assets

### Icons: Material Symbols Only

**System:** Google Material Symbols Outlined (loaded via CDN in layout.tsx)

✅ **CORRECT:**
```tsx
<span className="material-symbols-outlined text-2xl text-primary">
  auto_awesome
</span>
```

❌ **WRONG - Don't install these:**
```tsx
import { SparklesIcon } from '@heroicons/react/24/outline';  // ❌
import { FaStar } from 'react-icons/fa';  // ❌
```

**Icon Reference:** [Google Material Symbols](https://fonts.google.com/icons)

**Common icons used:**
- `auto_awesome` - AI/magic features
- `hub` - Graph/network
- `neurology` - Intelligence/brain
- `insights` - Analytics
- `play_circle` - Video/demo

### Images

```tsx
// ✅ Use Next.js Image component
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={200}
  className="rounded-lg"
/>

// ❌ Don't use plain img tags
<img src="/logo.png" />  // Missing optimization
```

---

## 🚫 Prohibited Actions

### DO NOT:

1. **❌ Change color variables** in `globals.css` without explicit approval
2. **❌ Install UI libraries** (Material-UI, Ant Design, Chakra, etc.)
3. **❌ Install icon libraries** (Heroicons, React Icons, Font Awesome) - use Material Symbols
4. **❌ Use CSS modules or styled-components** - stick to Tailwind
5. **❌ Create class components** - functional components only
6. **❌ Hardcode content in page.tsx** - extract to components
7. **❌ Skip TypeScript types** - always type props and state
8. **❌ Use `any` type** - use proper types or `unknown`
9. **❌ Create generic folders** like `/common`, `/shared`, `/ui`
10. **❌ Add inline styles** when Tailwind classes exist
11. **❌ Remove hover/focus states** - maintain interactivity
12. **❌ Skip responsive breakpoints** - always test mobile + desktop
13. **❌ Use pixel values directly** - use Tailwind spacing scale
14. **❌ Mix styling approaches** - Tailwind only
15. **❌ Create duplicate components** - reuse via props
16. **❌ Add animations without checking transitions** - maintain consistent motion
17. **❌ Change font families** - use existing Geist Sans/Mono/Inter
18. **❌ Use different purple shades** - stick to `--primary` (#8b5cf6)

---

## ✅ Pre-Commit Checklist

Before submitting code, verify:

- [ ] Component created in appropriate feature folder
- [ ] TypeScript interfaces defined for all props
- [ ] Uses existing color variables from the catalog
- [ ] Follows Tailwind utility-first approach
- [ ] Responsive breakpoints added (`sm:`, `md:`, `lg:`)
- [ ] Material Symbols icons used (if icons needed)
- [ ] No hardcoded content in page files
- [ ] Component is reusable and composable
- [ ] Hover/focus states added where appropriate
- [ ] Consistent spacing with existing components (py-20, gap-8, etc.)
- [ ] No TypeScript errors or warnings (`npm run build`)
- [ ] ESLint rules passing (`npm run lint`)
- [ ] Colors match existing palette (purple, emerald, blue, orange, slate)
- [ ] Glass-card class used for cards/panels
- [ ] No inline styles with hardcoded colors

---

## 📚 Reference Components

**Study these for approved patterns:**

### Feature Mapping Pattern
[app/components/features/FeaturesSection.tsx](resume-mind-ai/app/components/features/FeaturesSection.tsx)
- Data array with feature objects
- Maps to `<FeatureCard>` component
- Clean separation of data and presentation

### Reusable Card Component
[app/components/features/FeatureCard.tsx](resume-mind-ai/app/components/features/FeatureCard.tsx)
- Typed props interface
- Dynamic icon colors via props
- Glass-card styling with hover effects

### Process/Steps Pattern
[app/components/process/HowItWorksSection.tsx](resume-mind-ai/app/components/process/HowItWorksSection.tsx)
- Numbered step indicators
- Data-driven approach
- Responsive layout

### Hero Composition
[app/components/hero/HeroSection.tsx](resume-mind-ai/app/components/hero/HeroSection.tsx)
- Component composition (uses DashboardMockup)
- Background glow effects
- Status badge with animation
- Text gradient usage
- Primary CTA button styling

### Navigation Patterns
[app/components/layout/Navbar.tsx](resume-mind-ai/app/components/layout/Navbar.tsx)
- Sticky positioning with backdrop blur
- Responsive design (hidden on mobile)
- Purple shadow on CTA buttons

---

## 🎯 Quick Reference

### Common Patterns

```tsx
// Section wrapper
<section className="py-20 lg:py-32">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>

// Glass card
<div className="glass-card p-6 rounded-xl hover:scale-105 transition-transform">
  {/* Card content */}
</div>

// Primary CTA button
<button className="bg-primary hover:bg-violet-600 text-white px-6 py-3
                   rounded-lg font-semibold shadow-lg shadow-primary/30
                   transition-colors">
  Get Started
</button>

// Gradient text
<h1 className="text-5xl font-bold">
  Build Your <span className="text-gradient">Knowledge Graph</span>
</h1>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Grid items */}
</div>

// Feature icon container
<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
  <span className="material-symbols-outlined text-primary">auto_awesome</span>
</div>
```

---

## 🔥 Golden Rules

1. **Maintain the purple/dark theme** - DO NOT change color variables
2. **Component-based architecture** - Extract UI to reusable components, no hardcoding in pages
3. **Tailwind-first styling** - Avoid custom CSS unless absolutely necessary
4. **TypeScript strict mode** - Type everything properly, no `any`
5. **Feature-based folders** - Group related components together by domain
6. **Data-driven patterns** - Use arrays + map for repeated elements
7. **Responsive by default** - Always add mobile breakpoints (md:, lg:)
8. **Material Symbols only** - Don't add new icon libraries
9. **Glass morphism aesthetic** - Use `glass-card` for cards/panels
10. **Consistent spacing** - Follow existing padding/margin patterns (py-20, gap-8)

---

## 📋 File Structure Template

```tsx
// 1. Imports (React, Next.js, third-party, local)
import React from 'react';
import Link from 'next/link';
import { ComponentName } from '@/app/components/...';

// 2. Type definitions
interface ComponentProps {
  title: string;
  description: string;
}

// 3. Data constants (if any)
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

// 4. Component definition
export default function ComponentName({ title, description }: ComponentProps) {
  // 5. Hooks (if any)
  const [state, setState] = React.useState<string>('');

  // 6. Event handlers
  const handleClick = () => {
    // Handle click
  };

  // 7. JSX return
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white">{title}</h2>
        <p className="text-slate-400">{description}</p>
      </div>
    </section>
  );
}
```

---

## 🔧 Development Commands

```bash
# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# TypeScript type check
npx tsc --noEmit
```

---

## 📚 Key Dependencies

- **Next.js:** 16.1.1 (App Router)
- **React:** 19.2.3
- **TypeScript:** 5.x
- **Tailwind CSS:** 4.x (via @tailwindcss/postcss)
- **Fonts:** Geist Sans, Geist Mono, Inter (Google Fonts)
- **Icons:** Google Material Symbols Outlined (CDN)

---

**When in doubt:** Reference existing components in `app/components/` for approved patterns. This codebase values consistency, maintainability, and strict adherence to the established design system.
