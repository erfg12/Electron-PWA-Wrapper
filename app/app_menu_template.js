const electron = require('electron');
const { app } = electron;
const c = require('./constants');
const Helper = require('./helper');

// create menu template
const menuTemplate = function (mainWindow) {
  // Helper function for loading URLs
  const loadRelativeUrl = function (url) {
    if (Helper.isUsingShell()) {
      mainWindow.webContents.send(
        'shell:loadUrl',
        url
      );
    } else {
      mainWindow.loadRelativeUrl(url);
    }
  };

  const template = [
    {
      label: c.menu.categories.label,
      submenu: [
        {
          label: c.menu.categories.home,
          accelerator: 'CmdOrCtrl+B',
          click() {
            loadRelativeUrl('/');
          }
        },
        {
          label: c.menu.categories.tutorials,
          accelerator: 'CmdOrCtrl+N',
          click() {
            loadRelativeUrl('/tutorials');
          }
        },
        {
          label: c.menu.categories.hacks,
          accelerator: 'CmdOrCtrl+L',
          click() {
            loadRelativeUrl('/hacks');
          }
        },
      ],
    },
    {
      label: c.menu.edit.label,
      submenu: [
        {
          label: c.menu.edit.undo,
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: c.menu.edit.redo,
          accelerator: process.platform === 'darwin' ? 'Shift+CmdOrCtrl+Z' : 'Ctrl+Y',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: c.menu.edit.cut,
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: c.menu.edit.copy,
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: c.menu.edit.paste,
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: c.menu.edit.selectall,
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        },
      ]
    },
    {
      label: c.menu.view.label,
      submenu: [
        /*
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.reload();
          }
        },
        */
        {
          label: c.menu.view.fullscreen,
          accelerator: (function () {
            if (process.platform === 'darwin')
              return 'Ctrl+Command+F';
            else
              return 'F11';
          })(),
          click: function (item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        }/*,
        {
          label: 'Toggle Developer Tools',
          accelerator: (function() {
            if (process.platform === 'darwin')
              return 'Alt+Command+I';
            else
              return 'Ctrl+Shift+I';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.toggleDevTools();
          }
        }
        */
      ]
    },
    {
      label: c.menu.window.label,
      role: 'window',
      submenu: [
        {
          label: c.menu.window.minimize,
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: c.menu.window.close,
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    },
    {
      label: c.menu.help.label,
      role: 'help',
      submenu: [
        {
          label: c.menu.app.about + ' ' + c.settings.appName,
          click: function () {
            loadRelativeUrl('/ueber-uns');
          }
        },
        {
          label: c.menu.help.contact,
          click: function () {
            loadRelativeUrl('/kontakt');
          }
        },
      ]
    }
  ];

  if (process.platform === 'darwin') {
    const name = c.settings.appName;
    template.unshift({
      label: name,
      submenu: [
        {
          label: c.menu.app.about + ' ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        /*
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        */
        {
          label: name + ' ' + c.menu.app.hide,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: c.menu.app.hideothers,
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: c.menu.app.unhide,
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: c.menu.app.quit,
          accelerator: 'Command+Q',
          click: function () { app.quit(); }
        },
      ]
    });

    const windowMenu = template.find(function (menu) { return menu.role === 'window' });
    if (windowMenu) {
      windowMenu.submenu.push(
        {
          type: 'separator'
        },
        {
          label: c.menu.window.front,
          role: 'front'
        }
      );
    }
  } else {
    // not OSX
    template.unshift({
      label: c.menu.file.label,
      submenu: [
        {
          label: c.menu.app.quit,
          accelerator: 'Ctrl+Q',
          click: function () { app.quit(); }
        },
      ]
    });
  }

  // additional menu items for development
  // won't get hidden in Builds, so we're commenting them out.

  if (c.settings.enableDevMenu) {
    template.push({
      label: 'Development',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { type: 'separator' },
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
      ]
    });
  }

  return template;
}

module.exports = menuTemplate;
