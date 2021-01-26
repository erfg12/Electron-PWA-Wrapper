const Constants = {
  settings: {
    appName: 'NewAgeSoldier',
    appUrl: 'https://newagesoldier.com', // without trailing slash!
    nodeIntegrationEnabled: false, // keep disabled unless you run into ipcRenderer-specific troubles
    enableDevMenu: false, // enable for dev-builds only!
    userAgentPostfixWindows: 'WindowsApp', // custom user agent postfixes to distinguish traffic in Analytics
    userAgentPostfixOSX: 'MacOSXApp',
    userAgentPostfixLinux: 'LinuxApp',
    showLoader: false, // show src/loader.html window until your app is fully loaded - may increase loading time
    themeColor: '#F44336',
    windowBackgroundColor: '#FFFFFF', // set to false to disable
    titleBarStyle: 'default', // use 'hidden' or 'hiddenInset' for Frameless windows
    frame: true, // set to false for Frameless windows
    useTouchBar: false, // edit in app/touch_bar.js
    usePhotonKitShell: false, // macOS: loads src/shellMacOS.html with PhotonKit instead of the appUrl.
    useWindowsShell: false,   // Win: use custom shell from src/shellWIndows.html
    useLinuxShell: false,     // all 3 require 'nodeIntegrationEnabled: true'.
  },
  mainWindow: {
    width: 1400,
    height: 860,
    largeWidth: 1220,
    largeHeight: 860,
  },
  strings: {
    open: 'Open',
  },
  menu: {
    app: {
      about: 'About',
      quit: 'Quit',
      hide: 'Hide',
      hideothers: 'Hide Others',
      unhide: 'Un-Hide',
    },
    file: {
      label: 'File',
    },
    edit: {
      label: 'Edit',
      undo: 'Undo',
      redo: 'Redo',
      cut: 'Cut',
      copy: 'Copy',
      paste: 'Paste',
      selectall: 'Select All'
    },
    view: {
      label: 'View',
      fullscreen: 'Fullscreen'
    },
    window: {
      label: 'Window',
      minimize: 'Minimize',
      close: 'Close',
      front: 'Front',
    },
    help: {
      label: 'Help',
      contact: 'Contact'
    },
    categories: {
      label: 'Categories',
      home: 'Home',
      tutorials: 'Tutorials',
      hacks: 'Hacks',
    },
  },
  touchBar: {
    label: 'Categories',
    home: 'Home',
    tutorials: 'Tutorials',
    hacks: 'Hacks',
  }
};

module.exports = Constants;
