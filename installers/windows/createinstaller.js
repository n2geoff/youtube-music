const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path');

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error);
        process.exit(1);
    });

function getInstallerConfig() {
    console.log('creating windows installer...');
    const rootPath = path.join('./');
    const outPath = path.join(rootPath, '.build');

    return Promise.resolve({
        appDirectory: path.join(outPath, 'YouTube Music-win32-x64/'),
        authors: 'Geoff Doty',
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        exe: 'YouTube Music.exe',
        setupExe: 'youtube-music-setup.exe',
        setupIcon: path.join(rootPath, 'src', 'icon.ico'),
        iconUrl: path.join(rootPath, 'src', 'icon.ico'),
    });
}