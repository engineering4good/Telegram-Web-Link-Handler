const telegramLinkPattern = /^(https?:\/\/)?(t\.me|telegram\.me|telegram\.dog)\/.+/;
// currently supported only K version
const telegramWebClientUrl = "https://web.telegram.org/k/";

function handle_tg_link(message) {
  if (telegramLinkPattern.test(message.url)) {
    browser.tabs.query({ url: telegramWebClientUrl + "*" })
    .then((tabs) => {
      if (tabs.length > 0) {
        // If the Telegram web client is open, forward the link
        let tab = tabs[0];
        const newUrl = new URL(tab.url);
        newUrl.hash="?tgaddr=" + message.url;

        // navigate by updating URL hash
        browser.tabs.update(
          tab.id, 
          { url: newUrl.toString(),
            active: true }
          );

        // PROBABLY THERE IS NO SAFE WAY TO ACCESS window.im()
        // browser.tabs.executeScript(tab.id, {
        //   code: `
        //     console.log("BEFORE LINK CREATION")
        //     let a = document.createElement('a');
        //     a.href = "${details.url}";
        //     console.log("WINDOW: ", window)
        //     console.log("WINDOW.im: ", window.im)
        //     window.im(a);
        //     console.log("AFTER LINK CALL")
        //   `
        // });
      } else {
        // Optionally, you can open the Telegram web client if it's not open
        browser.tabs.create({ url: telegramWebClientUrl });
      }
    });
    return { cancel: true }; // Cancel the original request
  }
}

function handle_tg_link_msg(event) {
  return handle_tg_link(event)
}

function handle_tg_link_request(request) {
  if(request.type == "main_frame") {
    browser.tabs.get(request.tabId).then((t) => {
      if (t.url == "about:blank") {
        browser.tabs.remove(t.id);
      }
    })    
    return handle_tg_link(request)
  }
}


browser.runtime.onMessage.addListener(handle_tg_link_msg);

browser.webRequest.onBeforeRequest.addListener(
  handle_tg_link_request,
  { urls: ["*://t.me/*", "*://telegram.me/*", "*://telegram.dog/*"] },
  ["blocking"]
);