import withCustomGradleProperties from './plugins/withCustomGradleProperties'

const appConfig = {
    "expo": {
        "name": "expo-detox-branch",
        "slug": "expo-detox-branch",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        "scheme": "expodetoxbranch",
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
            "bundleIdentifier": "com.neonkingkong.expodetoxbranch"
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./assets/images/adaptive-icon.png",
                "backgroundColor": "#ffffff"
            },
            "package": "com.neonkingkong.expodetoxbranch"
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
