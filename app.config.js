import withCustomGradleProperties from './plugins/withCustomGradleProperties'

// If APP_VARIANT is undefined, it is a detox build
const IS_DEV = process.env.APP_VARIANT === 'development';

let scheme;
let bundleIdentifier
let androidPackage;
let apiKey;
let iosAppDomain
let associatedDomains
let iosUniversalLinkDomains

if (IS_DEV) {
    scheme = 'expodetoxbranch-dev'
    bundleIdentifier = "com.neonkingkong.expodetoxbranch.dev"
    androidPackage = "com.neonkingkong.expodetoxbranch.dev"
    apiKey = process.env.BRANCH_TEST_KEY ?? 'undefined';
    associatedDomains = ['applinks:17p1j.test-app.link', 'applinks:17p1j-alternate.test-app.link'];
    iosAppDomain = iosUniversalLinkDomains = ['17p1j.test-app.link', '17p1j-alternate.test-app.link'];
} else {
    scheme = 'expodetoxbranch'
    bundleIdentifier = "com.neonkingkong.expodetoxbranch"
    androidPackage = "com.neonkingkong.expodetoxbranch"
    apiKey = process.env.BRANCH_LIVE_KEY ?? 'undefined';
    associatedDomains = ['applinks:17p1j.app.link', 'applinks:17p1j-alternate.app.link'];
    iosAppDomain = iosUniversalLinkDomains = ['17p1j.app.link', '17p1j-alternate.app.link'];
}

const appConfig = {
    "expo": {
        name: process.env.EXPO_PUBLIC_APP_NAME ?? "EDB",
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
            bundleIdentifier,
            associatedDomains
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
            ["@config-plugins/detox", {subdomains: '*',}],
            ["./plugins/withCustomGradleProperties", [{
                key: 'org.gradle.jvmargs',
                value: '-Xmx4096m -XX:MaxMetaspaceSize=512m'
            }]],
            ["@config-plugins/react-native-branch",
                {
                    apiKey,
                    iosAppDomain,
                    iosUniversalLinkDomains
                }]
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
