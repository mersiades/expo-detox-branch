import withCustomGradleProperties from './plugins/withCustomGradleProperties'

// If APP_VARIANT is undefined, it is a detox build
const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PROD = process.env.APP_VARIANT === 'production';

let scheme;
let bundleIdentifier
let androidPackage;

if (IS_DEV) {
    scheme = 'expodetoxbranch-dev'
    bundleIdentifier = "com.neonkingkong.expodetoxbranch.dev"
    androidPackage = "com.neonkingkong.expodetoxbranch.dev"
} else if (IS_PROD) {
    scheme = 'expodetoxbranch'
    bundleIdentifier = "com.neonkingkong.expodetoxbranch"
    androidPackage = "com.neonkingkong.expodetoxbranch"
} else {
    scheme = 'expodetoxbranch-dx'
    bundleIdentifier = "com.neonkingkong.expodetoxbranch.dx"
    androidPackage = "com.neonkingkong.expodetoxbranch.dx"
}

const appConfig = {
    "expo": {
        "name": "expo-detox-branch",
        "slug": "expo-detox-branch",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        scheme,
        "userInterfaceStyle": "automatic",
        "splash": {
            "image": "./assets/images/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "assetBundlePatterns": [
            "**/*"
        ],
        "ios": {
            "supportsTablet": true,
            bundleIdentifier
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./assets/images/adaptive-icon.png",
                "backgroundColor": "#ffffff"
            },
            "package": androidPackage
        },
        "web": {
            "bundler": "metro",
            "output": "static",
            "favicon": "./assets/images/favicon.png"
        },
        "plugins": [
            "expo-router",
            "@config-plugins/detox",
            ["./plugins/withCustomGradleProperties", [{ key: 'org.gradle.jvmargs', value: '-Xmx4096m -XX:MaxMetaspaceSize=512m' }]]
        ],
        "experiments": {
            "typedRoutes": true
        },
        "extra": {
            "eas": {
                "projectId": "9faffde7-7f14-4f6a-8b35-03954825d5a0"
            }
        }
    }
}

export default withCustomGradleProperties(appConfig)
