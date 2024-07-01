const { app, BrowserWindow, session } = require('electron');
const puppeteer = require('puppeteer-core');

let mainWindow;

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: `${__dirname}/preload.js`, // Preload script for secure context
    },
    // Remove the menu bar
    autoHideMenuBar: true,
  });

  // Load the subpage after login
  await loginAndLoadSubpage();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

async function loginAndLoadSubpage() {
  try {
    // Launch Puppeteer with Chrome executable path
    const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
    const page = await browser.newPage();

    // Go to the login page and perform login (replace with actual login steps)
    await page.goto('https://web3.career', { waitUntil: 'networkidle2' });

    // Get cookies after login
    const cookies = await page.cookies();

    // Close Puppeteer browser
    await browser.close();

    // Set cookies in Electron session
    const ses = session.defaultSession;
    await Promise.all(
      cookies.map(cookie => ses.cookies.set({
        url: 'https://web3.career',
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expirationDate: cookie.expires ? Math.floor(cookie.expires / 1000) : null
      }))
    );

    // Load the subpage in Electron window
    mainWindow.loadURL('https://web3.career/learn-web3');

    // Prevent navigation to any other URL
    mainWindow.webContents.on('will-navigate', (event, url) => {
      if (!isAllowedURL(url)) {
        event.preventDefault();
      }
    });

    mainWindow.webContents.on('new-window', (event, url) => {
      if (!isAllowedURL(url)) {
        event.preventDefault();
      }
    });
  } catch (error) {
    console.error('Error during login and page load:', error);
  }
}

function isAllowedURL(url) {
  // List of allowed URLs
  const allowedURLs = [
    'https://web3.career/learn-web3'
    // Add more URLs as needed
  ];

  return allowedURLs.some(allowed => url.startsWith(allowed));
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
