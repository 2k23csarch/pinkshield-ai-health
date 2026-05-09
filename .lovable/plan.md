# PinkShield v2 — Expansion Plan

Keep the existing pink/glassmorphism theme, framer-motion animations, and responsive layout. Build on top of current files (`src/lib/auth.tsx`, `Navbar`, routes) rather than replacing them.

## 1. Auth Gating (site-wide)

- Convert `src/lib/auth.tsx` to richer demo auth: stores `{ id, name, email, phone, dob, gender, bloodGroup, address, avatarDataUrl, medicalHistory[], diagnoses[], scans[], reports[] }` in `localStorage`.
- Add `_authenticated.tsx` pathless layout route. `beforeLoad` checks auth from a context provider; if missing → `redirect({ to: "/login", search: { redirect } })`.
- Public routes only: `/`, `/login`, `/signup`, `/forgot-password`, `/verify-otp`.
- Move all feature routes under `_authenticated/`: dashboard, ai-detection, prevention, treatment, about-cancer, doctors, reports, community, research, awareness, survivor-stories, live-support, appointments, health-tracker, faq, emergency, profile, diet, mental-health, technology, campaigns.
- Landing `/` stays public but every nav click to a protected tab routes through guard.

## 2. Auth Pages

- `login.tsx` (exists) — keep, wire to new auth.
- `signup.tsx` (exists) — extend with phone, DOB, gender, blood group fields; on submit go to `/verify-otp`.
- `forgot-password.tsx` — email input → success state.
- `verify-otp.tsx` — 6-digit OTP UI (any code accepted in demo), animated input boxes, resend timer.

## 3. Profile System

- `Navbar`: when logged-in show Google-style circular avatar (initials or uploaded image) top-right with animated dropdown: View Profile, Reports, Settings, Logout.
- `_authenticated/profile.tsx`: editable form (avatar upload via FileReader → dataURL stored in localStorage), tabs for Personal Info / Medical History / Scan History / Saved Reports / Health Status cards.

## 4. Greeting + Dashboard

- `getGreeting()` util using IST (`Asia/Kolkata` via `toLocaleString`) → Good Morning/Afternoon/Evening.
- `_authenticated/dashboard.tsx`: hero greeting `Good Evening, {name} 👋`, animated stat tiles (Health Score, Scans, Reports, Streak), recent scans list, AI diagnosis history timeline, appointment cards, reminders, recharts area+pie+radial, downloadable report buttons, glowing cards, sidebar widgets.

## 5. Navbar Expansion

Restructure into grouped mega-menu (Home, Learn ▾ [About Cancer, Prevention, Treatment, Diet, Myths, Research, Technology], Care ▾ [Doctors, Appointments, Live Support, Emergency], AI ▾ [AI Scan, Reports, Health Tracker], Community ▾ [Forum, Survivor Stories, Awareness, Campaigns], FAQ). Animated dropdowns, mobile drawer, avatar menu.

## 6. Doctors Section

`_authenticated/doctors.tsx`: 12+ cards across oncologists, radiologists, surgeons, therapists, nutritionists. Card = image, name, specialization, hospital, experience, rating stars, fee, availability badge, advice paragraph, "Book Appointment" → `/appointments?doctor=id`.

Add 3–4 new generated doctor portraits (reuse existing 3, add 4 more via `imagegen` fast tier).

## 7. Educational Content

Heavily expand `about-cancer`, `prevention`, `treatment` and add new long-form pages: `mental-health`, `technology`, `research`, `awareness`, `survivor-stories`, `diet`, `myths-vs-facts`, `global-statistics`. Each page: hero, multi-section long paragraphs, accordions, stat callouts, CTAs, table of contents sidebar.

## 8. New Feature Routes

- `appointments.tsx` — booking form + upcoming list.
- `community.tsx` — forum threads UI (mock data, like/comment counts).
- `live-support.tsx` — chat UI (canned bot replies).
- `health-tracker.tsx` — log mood, weight, symptoms; recharts trends.
- `reports.tsx` — archive of generated AI reports with filters + download (jsPDF or printable HTML).
- `emergency.tsx` — hotline cards, nearest-center mock list.
- `faq.tsx` — accordion FAQ.
- `campaigns.tsx` — awareness events list.

## 9. AI Detection Upgrade

`_authenticated/ai-detection.tsx`:

- Drag-and-drop file zone (image preview).
- Multi-stage scan animation: upload → preprocessing → thermal overlay (CSS gradient mask + scan-line) → AI analyzing progress bar → result reveal.
- Risk meter (semi-circular gauge), confidence %, 5-tier verdict.
- Auto-saves scan to user's `scans[]`; shows scan history list and comparison cards.
- "Download Report" generates printable report card (patient name, scan date, scan ID, confidence, summary, recommendations, doctor suggestions).

## 10. UI Polish

- Add `ParticlesBackground` (lightweight canvas), `AnimatedGradient`, page transition wrapper using framer-motion `AnimatePresence` in `__root.tsx`.
- Skeleton loaders on data sections.
- Scroll-triggered reveals via `whileInView`.
- Glow shadows on cards, hover-lift micro-interactions.

## 11. Files to Add/Edit

**New routes** (~20): `_authenticated.tsx`, plus all routes above moved/created under `_authenticated/`.
**New components**: `AvatarMenu.tsx`, `MegaMenu.tsx`, `Greeting.tsx`, `ParticlesBackground.tsx`, `PageTransition.tsx`, `RiskMeter.tsx`, `ReportCard.tsx`, `DoctorCard.tsx`, `StatTile.tsx`, `Timeline.tsx`, `ChatPanel.tsx`, `OtpInput.tsx`, `DropZone.tsx`.
**New utils**: `src/lib/greeting.ts`, `src/lib/storage.ts` (typed localStorage helpers), `src/lib/report.ts` (printable report generator).
**Edited**: `auth.tsx` (extended schema), `Navbar.tsx` (mega-menu + avatar dropdown), `__root.tsx` (page transitions, providers), `styles.css` (more animation keyframes, gauge styles), existing educational routes (expanded content).
**New images**: 4 additional doctor portraits via imagegen (fast).

## Technical Notes

- All persistence is `localStorage` only — no backend required for the demo.
- Avatar upload: `URL.createObjectURL` not used; convert to dataURL so it survives reloads.
- Auth context provided into router context so `beforeLoad` can read `context.auth.isAuthenticated` (per tanstack-auth-guards pattern).
- IST greeting: `new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false })`.
- Keep all existing pink design tokens; only add new ones (e.g. `--shadow-card-glow`, gauge gradients).
- No new heavy deps; reuse framer-motion, recharts, lucide-react already installed.

Approve to start implementation. ADDITIONAL ADVANCED IMPROVEMENTS FOR PINKSHIELD v2

IMPORTANT:  
Keep the same pink healthcare branding, premium UI/UX, glassmorphism, responsive layout, animations, and dynamic effects.

The project should now feel like:

- a real SaaS healthcare platform
- an AI-powered medical dashboard
- a futuristic patient management ecosystem
- a modern startup-level healthcare application

ADVANCED SIDEBAR SYSTEM:  
After login, create a fully animated collapsible sidebar dashboard navigation.

Sidebar should include:

- Dashboard
- AI Scan
- Reports
- Doctors
- Appointments
- Prevention
- Treatments
- Diet & Nutrition
- Community
- Awareness
- Survivor Stories
- Research
- FAQ
- Emergency
- Profile
- Settings
- Logout

Features:

- animated active states
- glowing icons
- hover animations
- mobile responsive drawer
- collapsible sidebar
- smooth transitions

NOTIFICATION SYSTEM:  
Add a notification bell icon in navbar.

Features:

- unread notification badge
- appointment reminders
- AI report notifications
- awareness campaign notifications
- doctor recommendations
- health alerts

Use realistic mock notifications.

SETTINGS PAGE:  
Create advanced settings page with:

- theme settings
- dark/light mode
- notification preferences
- account settings
- password change UI
- privacy settings
- language selector
- accessibility options

ADVANCED PROFILE EXPERIENCE:  
Enhance profile page further with:

- animated health overview cards
- BMI calculator
- age calculator
- profile completion percentage
- recent activity timeline
- uploaded reports gallery
- profile verification badge
- editable emergency contacts

ADVANCED REPORT EXPERIENCE:  
Create realistic downloadable medical report viewer.

Features:

- printable reports
- report preview modal
- scan timeline
- PDF-style layout
- report comparison
- AI analysis summary
- recommendations section
- doctor notes section
- health trend graphs

ADVANCED AI VISUAL EFFECTS:  
Improve AI scan experience with:

- animated scan beams
- thermal overlay effects
- fake neural network animations
- futuristic loading screens
- pulsing AI indicators
- holographic scan UI
- radar-like scan effects
- scan completion animation

ADVANCED DASHBOARD WIDGETS:  
Add:

- daily health tips
- awareness quote widget
- motivational cards
- AI assistant widget
- recent activities
- upcoming appointments
- wellness tracker
- hydration tracker
- sleep tracker (demo)
- heart rate card (demo)
- step counter (demo)

COMMUNITY FEATURES:  
Expand community section with:

- discussion cards
- support groups
- awareness posts
- likes/comments UI
- trending discussions
- patient stories
- community badges
- top contributors

LIVE SUPPORT EXPERIENCE:  
Create realistic support center UI:

- live support cards
- online/offline indicators
- support ticket UI
- AI chatbot interface
- canned replies
- animated chat bubbles

ADVANCED APPOINTMENT SYSTEM:  
Improve appointments page:

- calendar UI
- doctor availability slots
- appointment timeline
- upcoming/past appointments
- animated booking confirmation
- consultation cards
- virtual consultation buttons

LOADING EXPERIENCE:  
Add:

- skeleton loaders
- shimmer effects
- animated page loaders
- route transition animations
- loading overlays

ADVANCED VISUALS:  
Add more:

- floating glowing particles
- animated mesh gradients
- animated blobs
- cursor glow effects
- parallax scrolling
- smooth reveal animations
- animated charts
- hover micro-interactions

HEALTH TRACKER IMPROVEMENTS:  
Add:

- symptom logging
- mood tracking
- daily wellness journal
- weight tracker
- water intake tracker
- medication reminders
- health progress charts

AWARENESS CAMPAIGN SECTION:  
Create campaign cards for:

- Breast Cancer Awareness Month
- Pink Ribbon Campaign
- Rural Awareness Programs
- Women Health Workshops
- AI Healthcare Research Events

Each card should include:

- banner image
- event description
- registration button
- date/time
- awareness statistics

ADVANCED FOOTER:  
Enhance footer with:

- animated social icons
- newsletter subscription
- emergency contact
- quick navigation
- awareness slogans
- medical disclaimer
- copyright
- developer credits

PERFORMANCE & EXPERIENCE:

- Keep animations smooth
- Avoid laggy heavy effects
- Maintain responsive design
- Ensure all buttons work properly
- Maintain modern enterprise-quality UI

FINAL GOAL:  
The project should look so polished and feature-rich that it feels like:

- a funded startup platform
- a premium healthcare SaaS
- a futuristic AI medical ecosystem

Make the experience:

- immersive
- cinematic
- dynamic
- professional
- highly interactive
- visually stunning
- content-rich
- presentation-ready