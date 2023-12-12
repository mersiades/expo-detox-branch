import {device} from 'detox';

const platform = device.getPlatform();

const sleep = (t: number) => new Promise((res) => setTimeout(res, t));

const getDeepLinkUrl = (url: string) =>
  `expodetoxbranch://expo-development-client/?url=${encodeURIComponent(url)}`;

const getDevLauncherPackagerUrl = (platform: 'ios' | 'android') =>
  `http://localhost:8081/index.bundle?platform=${platform}&dev=true&minify=false&disableOnboarding=1`;
async function openAppForDebugBuild(platform: 'ios' | 'android') {
  const deepLinkUrl = getDeepLinkUrl(getDevLauncherPackagerUrl(platform));
  console.log('deepLinkUrl', deepLinkUrl);

  if (platform === 'ios') {
    await device.launchApp({
      newInstance: true,
    });
    await sleep(3000);
    await device.openURL({
      url: deepLinkUrl,
    });
  } else {
    await device.launchApp({
      newInstance: true,
      url: deepLinkUrl,
    });
  }

  await sleep(3000);
}


const openApp = async () => {
  const launchArgs = device.appLaunchArgs.get() as { buildType: 'debug' | 'release' }
  if (launchArgs.buildType === "debug") {
    console.info("Launching app in debug mode")
    return await openAppForDebugBuild(platform);
  } else {
    console.info("Launching app in release mode")
    await device.launchApp({newInstance: true})
  }
}

export default openApp
