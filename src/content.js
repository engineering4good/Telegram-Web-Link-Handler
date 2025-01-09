function handleClick(event) {
  console.log("click event")
  const target = event.target.closest('a');
  if (target && target.href) {
    const telegramLinkPattern = /^(https?:\/\/)?(t\.me|telegram\.me|telegram\.dog)\/.+/;
    if (telegramLinkPattern.test(target.href)) {
      console.log("click: " + target.href)
      // Prevent the default action
      event.preventDefault();
      // Send a message to the background script to handle the link
      browser.runtime.sendMessage({ url: target.href });
    }
  }
}

document.addEventListener('click', handleClick);
document.addEventListener('auxclick', handleClick);
