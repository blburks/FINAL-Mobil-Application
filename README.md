# 📘 FINAL Mobile Application – SOFT 210

This repository contains the final project for the Mobile Application Development course at Bates Technical College. The app is built using React Native and Expo, featuring SQLite database integration, file-based routing, and a full notes management system.

## 🚀 Features

- Full CRUD notes app (Create, Read, View notes)
- SQLite database integration via `expo-sqlite`
- File-based routing with Expo Router
- Tab-based navigation with four accessible screens
- Public REST API integration (`restful-api.dev`)
- TypeScript throughout — screens, database, and repositories
- Modular architecture with reusable components, hooks, and repositories
- Dark/light theme support

## 📂 Project Structure
```
app/                          # App entry and routing
  (tabs)/                     # Tab-based screens
    _layout.tsx               # Tab navigation layout
    index.tsx                 # Home screen
    explore.tsx               # Explore screen
    NotesListScreen.tsx       # List all notes
    AddNoteScreen.tsx         # Add a new note
    NoteDetailScreen.tsx      # View note details
components/                   # Reusable UI components
hooks/                        # Custom React hooks
repositories/
  notes.ts                    # Data access layer for notes
scripts/
  database.ts                 # SQLite initialization and migrations
constants/                    # Shared constants and theme
assets/                       # Images and icons
```

## 🛠️ Technologies Used

- React Native
- Expo / Expo Router
- TypeScript
- expo-sqlite
- REST API (`https://api.restful-api.dev/objects`)

## ▶️ Running the App

1. Install dependencies
```bash
npm install
```

2. Start the Expo development server
```bash
npx expo start
```

3. Run the app
   - Scan the QR code with Expo Go
   - Or launch on an iOS/Android emulator

## 📄 Assignment Notes

This project was created as the final assessment for SOFT 210 – Mobile Application Development. It demonstrates understanding of component-based architecture, file-based navigation, SQLite database integration, TypeScript type safety, REST API consumption, and mobile UI development.

## 👤 Author

Bradley Burks (blburks)
Bates Technical College – Software Development