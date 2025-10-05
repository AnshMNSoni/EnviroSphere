# Smart Urban Planner - Design Guidelines

## Design Approach

**Selected Approach**: Design System-Inspired with Futuristic Data Visualization Aesthetic

**Rationale**: This is a data-intensive urban planning platform requiring exceptional usability and clarity. We'll draw inspiration from modern data platforms like Linear, Notion, and Figma's analytical tools, while incorporating a space-tech aesthetic that makes environmental data feel cutting-edge and actionable.

**Key Design Principles**:
- Data-First Clarity: Information hierarchy optimized for quick scanning and decision-making
- Progressive Disclosure: Complex data revealed gradually to prevent overwhelm
- Actionable Insights: Every visualization leads to clear next steps
- Trust Through Precision: Professional, credible design befitting governmental/institutional use

---

## Core Design Elements

### A. Color Palette

**Dark Mode Primary** (Default Theme):
- Background Base: 220 25% 8% (deep charcoal with blue undertone)
- Surface Elevated: 220 20% 12% (cards, panels)
- Surface Highest: 220 15% 16% (modals, dropdowns)
- Border Subtle: 220 15% 20%
- Border Interactive: 220 30% 30%

**Light Mode Primary**:
- Background Base: 0 0% 100%
- Surface Elevated: 220 20% 98%
- Surface Highest: 220 15% 96%
- Border Subtle: 220 10% 90%
- Border Interactive: 220 15% 80%

**Brand & Accent Colors**:
- Primary (NASA Blue): 217 91% 60% - Used for CTAs, interactive elements, primary data points
- Success (Vegetation/Green): 142 76% 36% - Positive metrics, vegetation health
- Warning (Heat/Alert): 38 92% 50% - Moderate concern indicators
- Danger (Critical): 0 84% 60% - High pollution, critical alerts
- Info (Water/Cool): 199 89% 48% - Water quality, informational states
- Neutral Gray Scale: 220 10% variants from 30% to 90%

**Data Visualization Palette** (Consistent across charts):
- 6-color sequential scale from Primary to lighter tints for heatmaps
- Diverging scale: Green (good) → Yellow → Red (poor) for quality metrics
- Categorical: Use primary, info, success, and purple (270 70% 60%) for distinct data series

### B. Typography

**Font Families**:
- Primary: Inter (Google Fonts) - Headings, UI text, data labels
- Monospace: JetBrains Mono (Google Fonts) - Numerical data, coordinates, code-like elements

**Type Scale**:
- Display (Hero): text-5xl to text-7xl, font-bold, tracking-tight
- H1 (Page Titles): text-4xl, font-bold
- H2 (Section Headers): text-3xl, font-semibold
- H3 (Card Titles): text-xl, font-semibold
- Body Large: text-lg, font-normal
- Body: text-base, font-normal
- Small/Caption: text-sm, font-medium
- Data Labels: text-xs, font-mono, uppercase tracking-wide

### C. Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 consistently

**Grid Structure**:
- Dashboard: 12-column grid with 24px gutters
- Sidebar: Fixed 280px width (collapsible to 64px icon-only)
- Main Content: max-w-7xl with responsive padding (px-4 md:px-6 lg:px-8)
- Map Container: Full viewport height minus header (h-[calc(100vh-64px)])

**Responsive Breakpoints**:
- Mobile: base (< 768px) - Single column, stacked cards
- Tablet: md (768px+) - 2-column grids, side-by-side panels
- Desktop: lg (1024px+) - 3-4 column grids, full dashboard layout
- Wide: xl (1280px+) - Maximum layout with side panels

### D. Component Library

**Navigation**:
- Top Bar (64px height): Logo left, search center, user/settings right, glass-morphism effect (backdrop-blur-xl bg-surface/80)
- Side Navigation: Icon + text, active state with primary color left border (border-l-4), hover with subtle bg-primary/10
- Breadcrumbs: Small text with chevron separators, last item in primary color

**Map Interface**:
- Full-screen Leaflet/Mapbox container with custom dark theme tileset
- Layer Control Panel: Floating top-right, glass-morphism card with toggle switches for each data layer
- Legend: Bottom-left floating card, color-coded scales with labels
- Drawing Tools: Top-left toolbar (polygon, marker, circle tools) with icon buttons
- Zoom Controls: Custom styled +/- buttons, bottom-right position

**Data Cards**:
- Metric Summary Cards: Gradient border-top (3px), icon top-left, large number center, trend indicator (arrow + %) bottom-right
- Dimensions: min-h-32, rounded-lg, shadow-lg, hover:shadow-xl transition
- Layout: Grid of 3-4 cards for key metrics (AQI, NDVI, Temperature, Water Quality)

**Charts & Graphs**:
- Temporal Line Charts: Chart.js with custom dark theme, gradient fills beneath lines, interactive tooltips
- Heatmaps: Grid-based color intensity maps with smooth transitions
- Bar Charts: Rounded corners, hover highlights, comparative overlays
- Container: White/dark card with title, time range selector, download button

**AI Insights Panel**:
- Collapsible right sidebar (400px wide) or modal overlay on mobile
- Header: "AI Recommendations" with sparkle icon
- Content: Numbered list of insights with severity badges, expandable details
- Action Buttons: "Apply Intervention" primary button per recommendation

**What-If Simulator**:
- Split view: Controls left (sliders, toggles for interventions), Preview right (map showing predicted changes)
- Intervention Cards: Icon, title, slider/toggle control, impact preview (+/- indicators)
- Compare Mode: Side-by-side before/after maps with difference highlighting

**Community Hub**:
- Issue Markers: Custom map pins color-coded by category, cluster on zoom out
- Report Form: Modal with location auto-filled, category dropdown, text area, photo upload (drag-drop zone)
- Issue Cards: Photo thumbnail left, title + description, location + timestamp, upvote button
- Leaderboard: Avatar + username, contribution count, badge icons

**Forms & Inputs**:
- Text Inputs: Rounded borders, focus:ring-2 ring-primary, dark bg-surface with light text
- Search: Icon left, clear button right, autocomplete dropdown with recent searches
- Dropdowns: Custom styled select with chevron, smooth open animation
- Sliders: Accent track, large thumb with value tooltip on drag
- Toggles: iOS-style switches with smooth transition

**Buttons**:
- Primary: bg-primary hover:bg-primary/90, rounded-lg, px-6 py-3, font-semibold
- Secondary: bg-surface border border-border hover:bg-surface-elevated
- Outline on Images: backdrop-blur-lg bg-white/10 border border-white/20
- Icon Buttons: p-2 rounded-full hover:bg-primary/10

**Modals & Overlays**:
- Backdrop: backdrop-blur-sm bg-black/50
- Modal Container: max-w-2xl, rounded-xl, shadow-2xl, slide-up animation
- Header: border-b with close button
- Footer: border-t with action buttons right-aligned

**Reports & Downloads**:
- PDF Preview: Card with document icon, title, generation date, download button
- Scenario Cards: Side-by-side comparison layout, key metrics diff highlighted

### E. Animations & Interactions

**Page Transitions**:
- Fade + slight slide-up (20px) on route change
- Duration: 300ms ease-out

**Map Interactions**:
- Smooth zoom with 500ms easing
- Layer toggle: Fade in/out with opacity transition (400ms)
- Marker click: Scale up (1.1x) with shadow expansion

**Data Loading**:
- Skeleton screens for charts (pulsing gradient animation)
- Spinner: Rotating NASA-style orbital rings for full-page loads

**Hover States**:
- Cards: Lift with shadow (translateY(-4px), shadow-xl)
- Buttons: Subtle scale (1.02x) and brightness increase
- Map layers: Opacity increase on hover

**Minimal Use**: Avoid excessive motion - prioritize performance and clarity over flashy effects

---

## Images

**Hero Section** (Home Page):
- Large hero image: Satellite view of Earth at night showing city lights, with data overlay visualization
- Treatment: Gradient overlay (from transparent to bg-base) for text readability
- Position: Full-width, 70vh height
- Alternative: Abstract data visualization with particle network connecting city nodes

**Dashboard**:
- No hero image - immediate map interface
- Optional background: Subtle grid pattern or topographic lines at 5% opacity

**About/Team Page**:
- Team photos in rounded cards with gradient borders
- Optional: Satellite imagery or NASA facility photos as section backgrounds

**Community Hub**:
- User-uploaded issue photos displayed in issue cards and map tooltips
- Placeholder: Generic urban landscape icons for reports without photos

---

## Page-Specific Layouts

**Home Page**:
- Hero: Full-width with centered headline, subheadline, dual CTAs (Start Planning / View Demo), floating cards showing live data samples
- Features Grid: 3-column on desktop, highlighting NASA data sources with icons
- Interactive Demo: Embedded mini-map showing layer toggle
- Stats Banner: 4-column metrics (Cities using platform, Data points analyzed, etc.)
- CTA Section: Bold call-to-action with gradient background

**Dashboard**:
- Header: 64px with logo, location search, time range picker, layer controls
- Sidebar: 280px navigation + quick metrics
- Main: Full-height map with floating control panels
- Bottom Panel: Collapsible charts section (300px height) showing temporal trends

**AI Planner**:
- Two-column layout: Simulation controls (40%) | Results visualization (60%)
- Top Section: Scenario selector with saved simulations
- Results: Split map view (current vs predicted) with difference metrics cards below

**Community Hub**:
- Map View: Full-width with issue markers clustered
- Side Panel: Scrollable list of reported issues, filterable by category/date
- Report Button: Fixed bottom-right FAB (Floating Action Button)

**Policy Insights**:
- Dashboard-style: Multiple cards in masonry grid
- Sustainability Index: Large circular gauge visualization
- Scenario Comparison: Side-by-side before/after with key metrics
- Report Generation: Form section with customization options

---

This design framework creates a professional, data-forward platform with a distinctive space-tech aesthetic that makes urban planning feel innovative and accessible while maintaining the clarity and precision required for institutional use.