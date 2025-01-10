# Telegram Web Link Handler

<p align="center"><a rel="noreferrer noopener" href="https://addons.mozilla.org/en-US/firefox/addon/telegram-web-link-handler/">
<img src="src/icons/icon.svg" alt="extension icon" height="100px"/>
</a>
</p>
<p align="center">
Firefox extension that <b>redirects Telegram links to the web client</b> for easy access.
</p>

## Latest Version

<a rel="noreferrer noopener" href="https://addons.mozilla.org/en-US/firefox/addon/telegram-web-link-handler/"><img alt="Firefox Add-ons" src="https://img.shields.io/badge/Firefox-141e24.svg?&style=for-the-badge&logo=firefox-browser&logoColor=white"></a>

## Overview

The **Telegram Web Link Handler** is a Firefox extension designed to enhance the user experience when interacting with Telegram links. This extension automatically redirects `t.me`, `telegram.me`, and `telegram.dog` links to the Telegram web client, allowing users to seamlessly access their Telegram chats and groups.

## Features

- Support for deep links
- Supports only the K version of the Telegram web client.
- Cancels the default action of opening the link.

## Installation

1. Download the extension files.
2. Open Firefox and navigate to `about:debugging`.
3. Click on "This Firefox" in the sidebar.
4. Click on "Load Temporary Add-on" and select the `src/manifest.json` file from the downloaded extension files.

## Packaging
To pack the extension into a zip archive, run the command:
```bash
python3 package.py 
```

## How It Works

### Background Script (`background.js`)

- Listens for web requests to Telegram links.
- If a Telegram link is detected, it checks if the Telegram web client is already open.
- If the web client is open, it updates the URL with the Telegram link.
- If the web client is not open, it creates a new tab for the Telegram web client.

### Content Script (`content.js`)

- Listens for click events on the page.
- If a clicked link matches the Telegram link pattern, it prevents the default action and sends a message to the background script to handle the link.

### Manifest File (`manifest.json`)

- Defines the extension's metadata, permissions, and scripts.
- Specifies that the content script should run on all URLs except the Telegram web client.

## Permissions

The extension requires the following permissions:

- `tabs`: To interact with browser tabs.
- `activeTab`: To access the currently active tab.
- `webRequest`: To listen for web requests.
- `webRequestBlocking`: To block requests and modify them.
- `<all_urls>`: To match all URLs for link handling.

## Limitations

- Currently supports only the K version of the Telegram web client.
- No support for `tg://` links.

## Contributing

If you would like to contribute to the development of this extension, feel free to submit issues or pull requests on the repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for more details.
