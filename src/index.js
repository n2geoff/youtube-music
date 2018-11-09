const electron = require("electron");
const path = require("path");
const image = electron.nativeImage;
const icon = image.createFromPath(path.join(__dirname, "/youtube.png"));

// app tray icon
const ico = (path.join(__dirname, "icon.ico"));

// destructure used api
const {app, BrowserWindow, Menu, Tray} = electron;

let main;

app.on("ready", function() {
    // create window
    main = new BrowserWindow({width: 480, height: 640, frame: true, icon: icon});

    //load view
    main.loadURL("https://music.youtube.com/");
    
    // quit app when closed (includes subwindows)
    main.on("closed", function() {
        app.quit();
    });
    
    main.on("minimize", function(event) {
        event.preventDefault();
        main.hide();
    });

    // create tray icon
    var tray = new Tray(ico);

    tray.setContextMenu(Menu.buildFromTemplate([{
            label: "Show YouTube Music",
            click: function () {
                main.show();
            }
        },
        {
            label: "Quit",
            click: function () {
                app.isQuiting = true
                app.quit()
            }
        }
    ]));

    tray.on("double-click", function() {
        main.show();
    });

    main.on("show", function () {
        tray.setHighlightMode("always");
    });

    main.setMenu(null);
});
