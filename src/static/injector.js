var s = document.createElement('script');
s.src = chrome.runtime.getURL('index.js');
s.setAttribute('id', 'extension');
(document.head || document.documentElement).appendChild(s);