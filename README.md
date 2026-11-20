# Lantern Circle — mobile prototype

*Help that finds you.* An anonymous support-request and volunteer-matching app for FGM survivors and girls at risk (USIU-Africa midterm project).

Built with **Expo (React Native)** in plain JavaScript, no navigation library, so it is easy to read.

## Run it
```bash
npm install
npx expo start
```
Scan the QR code with the **Expo Go** app on your phone, or press `w` to open it in a browser.

## Features
| Screen | What it does |
|---|---|
| Welcome | Explains privacy: no names, quick exit |
| Request support | Choose peer or professional help + language → anonymous case ID |
| Request status | Sent → matching → accepted; auto-escalates if nobody replies |
| Report a girl at risk | Goes to verified triage staff only, never auto-dispatches police |
| Peer circle | Group chat under a random pseudonym |
| Learn | Reviewed facts on FGM, types, rights, health |
| Volunteer dashboard | Demo helper view; the first helper to accept takes the case |
| Quick exit | Wipes data and shows a fake weather screen (long-press 24° to return) |

## Project layout
```
App.js              state + which screen to show
src/theme.js        colours, spacing, font sizes
src/components.js   Screen, Button, OptionCard, Chips…
src/data.js         content, demo helpers, case-ID generator
src/screens/        one file per screen
```
Data is in memory and the helpers are simulated with timers. The planned Django + Africa's Talking backend would replace them.

## Report
The project report (PDF) is in [docs/Lantern_Circle_Report.pdf](docs/Lantern_Circle_Report.pdf).
