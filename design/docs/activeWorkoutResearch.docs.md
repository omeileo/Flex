# Active Workout — Competitive Research (Mobbin)

Sources: Mobbin iOS deep search (May 2026). Apps: **Hevy**, **Fitbod**, **Runna**, **Gymshark Training**, **Peloton Strength+**, **Fitplan**, **WHOOP**, **Strava**, **Tonal**, **Ladder**, **Bevel**.

## Set logging & active session UI

| App | Pattern | Flex takeaway |
|-----|---------|---------------|
| **Hevy** | Table: set #, previous ghost, reps, kg; checkmark logs set; green “Log Set” on active row | Primary reference for strength logging |
| **Hevy** | iOS Live Activity during rest: countdown, ±15s, Skip, next set preview | Phase 2: lock-screen rest control |
| **Fitbod** | Vertical timeline: hexagon set markers, `REPS / POUNDS` on completed rows | Strong visual “timeline” alternative |
| **Fitplan** | Video hero + set/rep columns; mint highlight on active set | Good for demo / video-led exercises |
| **Gymshark** | Dark UI; rest bottom sheet with SKIP + EDIT REST ±10S | Rest overlay reference |
| **Runna** | Segmented workout progress bar; CURRENT / UP NEXT labels | Borrow for mixed strength + cardio blocks |

## Rest timers

| App | Pattern | Flex takeaway |
|-----|---------|---------------|
| **Fitbod** | Full rest sheet: large timer, ±10, pause icon, X to dismiss | Default rest UX |
| **Fitplan** | Sticky bottom bar “Rest Now” + Skip on active screen | Lighter-weight variant |
| **Gymshark** | Circular progress ring on rest sheet | Optional visual polish |
| **Hevy** | Per-exercise rest “ON” in header; rest duration on timeline between sets | Show rest config per exercise |
| **Fitbod** | Exercise menu: Rest timer ON/OFF toggle | Per-exercise override |

## Pause / resume / end

| App | Pattern | Flex takeaway |
|-----|---------|---------------|
| **Runna** | Large Pause + Next Lap on interval screen | Clear pause affordance |
| **WHOOP** | Header: Discard vs End & Save; modal confirms save | Separate destructive vs complete paths |
| **Tonal** | Video overlay REST 0:00 + END WORKOUT button | Video-session variant |
| **AllTrails** | Paused: Resume + Finish; delete → confirm modal | Pause menu + delete confirm |

## Exercise swap / delete / add

| App | Pattern | Flex takeaway |
|-----|---------|---------------|
| **Fitbod** | Exercise sheet: Replace, Delete, Exclude, Warm-up sets, Units | Full ⋯ menu inventory |
| **Fitbod** | Swipe left → Replace or Delete + first-run coach tip | Onboarding tooltip for edits |
| **Peloton Strength+** | ⋯ on row: Swap, Circuit with below, Delete (red) | Superset grouping phase 2 |
| **Hevy** | Swap flow: search, filters, “Create” custom exercise | Search-first picker |
| **Fitbod** | “Add an exercise” at top of list with + hexagon | Prominent add entry |

## Complete / save / discard

| App | Pattern | Flex takeaway |
|-----|---------|---------------|
| **Runna** | Save Workout: stats, description, private notes, Strava/Health toggles, Discard + Save | End-state template |
| **Hevy** | Save Workout: duration/volume/sets, photos, visibility, Discard link | Rich metadata optional |
| **Fitbod** | “Finish and log?” sheet with Resume vs Log Workout + sync toggles | Pre-save confirmation |
| **Strava** | Perceived exertion slider + Resume in header + Discard | RPE on save (phase 2) |

## Easy-to-miss patterns (included in Flex spec)

1. **Undo set log** — Snackbar undo (Strong/Hevy convention; not always visible in Mobbin crops)  
2. **Previous column** — Ghost last-session performance for progressive overload  
3. **Finish ≠ Save** — Fitbod two-step prevents accidental end  
4. **Resume on save screen** — Strava/Hevy allow return to session if not saved yet  
5. **Perceived exertion / RPE** — Fitbod post-set rating; Strava slider on save  
6. **Exclude exercise** — Fitbod “don’t recommend again” vs one-time delete  
7. **Warm-up sets** — Separate rows, not mixed with working sets  
8. **Circuit / superset** — Peloton “Circuit with below”; Runna superset tags on save  
9. **Live Activity / widget** — Hevy rest on lock screen  
10. **Offline / local draft** — Implied by WHOOP/Strava; explicit in Flex spec  
11. **Minimize session** — Fitplan chevron to mini-player (phase 2)  
12. **Coach audio / video** — Ladder, Tonal immersive modes for guided blocks  

## Mobbin screen links (sample)

- Hevy set table: [mobbin.com/screens/b7c6155c-8453-4230-9c28-a12218a415d8](https://mobbin.com/screens/b7c6155c-8453-4230-9c28-a12218a415d8)  
- Hevy swap: [mobbin.com/screens/7e32b889-148a-4a79-b39a-0e19713b8174](https://mobbin.com/screens/7e32b889-148a-4a79-b39a-0e19713b8174)  
- Fitbod exercise menu: [mobbin.com/screens/d1e2dbe0-a19a-4e10-9bf1-70dfce60ff00](https://mobbin.com/screens/d1e2dbe0-a19a-4e10-9bf1-70dfce60ff00)  
- Gymshark rest timer: [mobbin.com/screens/f4cdbd47-9666-4c67-ae63-c75f2094254d](https://mobbin.com/screens/f4cdbd47-9666-4c67-ae63-c75f2094254d)  
- Runna save workout: [mobbin.com/screens/8c7c9862-12ed-47e1-a5f9-9ae4283dc5c8](https://mobbin.com/screens/8c7c9862-12ed-47e1-a5f9-9ae4283dc5c8)  
- Fitbod finish sheet: [mobbin.com/screens/6c627df7-c5e5-4344-aa62-4d0b88f52ccc](https://mobbin.com/screens/6c627df7-c5e5-4344-aa62-4d0b88f52ccc)  

## Phase 2 recommendations

- Apple Live Activity for rest + elapsed time  
- RPE capture (per set or per exercise)  
- PR detection + celebration  
- Superset / circuit editor  
- Apple Watch companion  
- AI swap suggestions from injury profile  
- Social share / workout photos (Hevy-style)  
