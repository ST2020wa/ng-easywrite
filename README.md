# EasyWrite - Distraction-Free Writing App

For installation and development instructions, see `userguide.md` in the same folder.

A minimalist writing application designed to help you focus on writing without looking back. Built with Angular.

## Key Features

- **Forward-Only Writing**: Prevents editing of previous paragraphs to maintain flow and reduce self-editing
- **Focus Mode**: Cursor stays at the end of text, encouraging continuous writing
- **Word Count**: Real-time word count display
- **Timer**: Built-in countdown timer for timed writing sessions (up to 4 hours)
- **Dark Mode**: Eye-friendly dark theme for comfortable writing
- **Auto-Save**: Automatically saves your work to localStorage

## Design Philosophy

EasyWrite is built on the principle that good writing comes from continuous flow. By preventing backward editing and providing gentle reminders to "keep writing," it helps writers maintain momentum and avoid the common trap of excessive self-editing during the first draft.

## How to Use

1. Start writing in the main text area
2. Use the side panel to:
   - Toggle dark mode
   - Start a timed writing session
   - Export your work
   - View word count
3. Focus on moving forward - the app will help you avoid looking back

## Known Issues

- **Dark Theme Inconsistency**: The text area's dark theme occasionally displays inverted colors compared to the rest of the UI. This issue is currently under investigation and will be fixed within a week.

## Notice

This project is inspired by [JustWrite](https://www.justwrite.page/). It is intended for personal use only. If the JustWrite team finds this inappropriate, please let me know to take the necessary actions.

## Technical Details

- Built with Angular 17
- Standalone components
- Reactive state management
- Local storage persistence
