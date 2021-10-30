#/usr/bin/bash
echo "CREANDO BUILD...";
npx jetify;
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/;
cd android;
rm -rf app/src/main/res/raw;
rm -rf app/src/main/res/drawable-*;
rm -rf app/src/main/res/drawable-mdpi/;
rm -rf app/src/main/res/raw/;
./gradlew clean;
./gradlew assembleRelease;
cd ../;
# adb install -r ./android/app/build/outputs/apk/release/app-armeabi-v7a-release.apk;
# app-armeabi-v7a-release.apk
# app-arm64-v8a-release.apk
# app-x86-release.apk
# app-x86_64-release.apk

#https://blog.rocketseat.com.br/reduzindo-o-tamanho-das-builds-para-android-no-react-native/