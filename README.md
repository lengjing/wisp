# 🌬️ Wisp

**Wisp** is a lightweight AI desktop assistant that lets you ask questions to browser-based AI tools instantly via a global shortcut. No API key required — fully automated with Puppeteer.

![Wisp Screenshot](./assets/screenshot.png)

## ✨ Features

- Trigger AI prompt input with a single global hotkey
- Supports ChatGPT, Claude, Gemini, and more
- Displays the AI's response in a clean popup
- Works 100% locally, no API keys or cloud dependencies
- Cross-platform (Windows, macOS, Linux) via Tauri

## 🔧 Tech Stack

- **UI**: Tauri + TypeScript + React
- **Automation**: Node.js + Puppeteer Core
- **Optional (Future)**: Rust-based proxy for VMess / SOCKS5

## 📦 How it works

1. Press global hotkey (e.g. `Ctrl+Shift+A`)
2. A small input box appears
3. You type a question and hit Enter
4. Wisp opens the target AI site (e.g. chat.openai.com)
5. Puppeteer automates the input and submits the query
6. AI’s answer is extracted and shown to you

## 🚧 MVP Limitations

- Requires Chromium or Chrome installed
- Only one tab/AI source at a time
- No conversation history
- No proxy support (yet)

## 📥 Installation

```bash
git clone https://github.com/yourname/wisp
cd wisp
pnpm install
pnpm tauri dev
