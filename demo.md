# Cars24 Chat Mode — Demo Script

**Primary hub:** Cars24 Sector 18, Noida  
**Prototype URL:** [Set after Vercel deploy]  
**API:** Claude Sonnet 4.6 via `/api/chat` · Inventory: 20 cars · Prompt caching enabled

---

## Before you demo

1. Open the URL on a laptop — iPhone frame appears centered. Open on your phone for the full-screen feel.
2. Make sure you have a working internet connection (calls Anthropic API).
3. Use the **small ⚙️ Demo Controls button** (bottom-left of the phone frame) to reset, change hub, or re-fire the arrival notification between scenarios.
4. Use the **Browse/Chat toggle** in the home screen header to switch modes.

---

## Scenario 0: Arrival at the Hub (the opening narrative)
> **What this shows:** The geofence detection moment — the user is browsing home, arrives at the hub, and the app tells them to try Chat mode for a DIY test drive.

**1.** App opens → **Cars24 home screen** (blue header, search, Browse | Chat toggle, category tabs, recommended cars, quick actions).

**2.** Wait 3 seconds → **notification banner** slides down from the top of the phone:
> *"📍 You're at Cars24 Sector 18 hub. Try Chat mode for a DIY test drive experience."*

**3.** Tap the notification → **welcome overlay** animates in (large sparkle mark, "I see you're at Sector 18") → auto-fades into Chat mode with **Sector 18 hub pre-selected** (hub pill visible in header).

**What to point out:**
- App already knows which hub the user is at (simulating GPS geofence detection)
- No friction — tapping notification directly enters Chat mode with context already set
- Browse → Chat transition is seamless, not a new screen

**Demo reset:** Tap ⚙️ → "🔄 Reset demo" to return to home. Then "📍 Simulate arrival at Sector 18" to re-fire the notification.

---

## Scenario 1: Walk-in Explorer
> **Persona:** Amit, 28, first-time buyer. At the hub, no specific car in mind. Budget ≈ ₹8 lakh, wants automatic, city driving.

### Step-by-step tap path

**1.** From home, tap **Chat** in the mode toggle → HubPicker slides up → select "Sector 18, Noida" → Continue → Chat welcome screen. Or use Scenario 0 arrival flow.

**2.** Tap the **"₹5–8L"** chip.
> Thinking pill appears → Claude streams: *"Got it — under ₹8 lakh. Any preference on body type or transmission?"* + chips.

**3.** Tap **"Hatchback"** suggestion chip.
> Claude returns top 4 hatchbacks (i20, Baleno, Altroz, Polo) + 1 metric card: *"Automatic hatchbacks are the most test-driven segment here."*

**4.** Tap **"Show only 1st owner cars"** suggestion chip (appears after response).
> Claude filters to 1st-owner only and re-ranks.

**5.** On the **Hyundai i20 card**, tap **"Locate"**.
> LocateCard appears: Bay A-12 · ~3 min walk · Open in Maps button.

**6.** On the same card, tap **"Book Drive"**.
> PINCard appears with PIN **4821** · "Show this to staff at the key counter."

**What to point out:**
- Zero staff interaction needed for steps 1–6
- Neutral metrics ("12 test drives in 14 days") — no fake urgency
- One-screen experience: no page navigations
- Streaming text feels AI-native, not pre-canned

---

## Scenario 2: Scan-First Walk-up
> **Persona:** Priya, 34. Walks past a red Maruti Swift in the lot and wants to know more.

### Step-by-step tap path

**1.** Welcome screen — tap **"📷 Scan a car"** shortcut button.
> ScanCard appears: dark camera viewport with scan-line animation.

**2.** Wait ~1.8 seconds.
> Plate auto-reads as **UP-16-XX-1234** with a green checkmark.

**3.** Claude then gets the scanned result and responds with the Maruti Swift VXi profile card + "Book Drive" / "Locate" / "Details" CTAs.

**4.** Tap **"Details"**.
> Claude gives deeper info: inspection score, ownership, KMs, estimated EMI breakdown.

**What to point out:**
- OCR simulation shows the intended UX before real camera integration
- Everything stays in-chat, no camera app handoff
- Car card has full specs, inspection confidence, and 3 quick CTAs

---

## Scenario 3: Shortlisted Buyer
> **Persona:** Vikram, 41. Has been browsing the app for a week and shortlisted the Maruti Baleno. Wants to confirm it's available and book a test drive.

### Step-by-step tap path

**1.** Welcome screen — type in the input bar:  
> *"I saw a Maruti Baleno online, is it available here?"*

**2.** Claude streams: *"Yes — we have two Balenos at Sector 18 right now."* + 2 Baleno cards (Alpha Automatic, Zeta Manual).

**3.** Tap **"Compare Maruti Baleno and Hyundai i20"** suggestion chip.
> Claude gives a side-by-side comparison in prose + shows both cars.

**4.** Tap **"Book Drive"** on the Baleno Alpha.
> PINCard with a new PIN appears.

**What to point out:**
- Free-form natural language works — not just chips
- Claude knows which cars are at the hub and which aren't
- Multi-turn conversation maintains context (knows user asked about Baleno earlier)

---

## Scenario 4: Existing Booking
> **Persona:** Rahul, 36. Booked a Tata Nexon test drive yesterday. Arrives at the hub and wants to locate the car and get his start PIN.

### Step-by-step tap path

**1.** Welcome screen — tap **"🅿️ Already booked"** shortcut button.

**2.** Claude responds: *"Found your booking."* + BookingCard (Booking ID BK-2026-052801 · Status: Booked · 11:00 AM slot) + PINCard (PIN: **4821**).

**3.** On BookingCard, tap **"Locate Car"**.
> LocateCard: Bay D-02 · Tata Nexon XZA+ · Open in Maps.

**4.** Type: *"End my test drive"*
> Claude generates end PIN **7394** with instructions to show to staff.

**What to point out:**
- Existing booking detected from session context
- Full PIN flow (start + end) shown in chat
- Locate + GPS integration all inline

---

## Common Q&A for stakeholder sessions

| Question | Answer |
|---|---|
| Is the AI making up car data? | No — it only references the 20 cars in `data/cars.json`. Hallucinations are blocked by system prompt. |
| Is this using real Cars24 inventory? | No — hand-authored realistic demo data for Sector 18 Noida. Easily swappable with real API. |
| What AI model is this? | Claude Sonnet 4.6 (Anthropic). The same model family used in Orbit. |
| Will OCR work on a real phone? | This demo simulates OCR. Real integration uses a camera API + ML plate reader, same UX. |
| What about GPS accuracy? | The "Locate" cards use static coordinates per car. Real integration pulls live GPS from the hub backend. |
| Can this work offline? | No — requires Anthropic API call. Could be extended with cached responses for common queries. |
| What's the latency? | First token typically in ~800ms. Full response + cards in 3–5s. Streaming makes it feel instant. |

---

## Architecture in 30 seconds

```
User tap / type
  → OnsiteAssistant.sendMessage()
  → POST /api/chat (Next.js serverless)
  → Anthropic Claude Sonnet 4.6 (system prompt has 20 cars + hub metrics)
  → Streaming text → client renders token by token
  → ---STRUCTURED--- JSON block → parsed into CarCard / MetricCard / LocateCard / PINCard / BookingCard
  → Suggestion chips for follow-up turns
```

All in one screen. No page transitions. No backend DB. API key stays server-side.
