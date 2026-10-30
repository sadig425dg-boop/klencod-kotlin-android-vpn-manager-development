# VPN Manager — V2Ray & Xray (Android Engineering Edition)

This is the complete source code for a professional Android VPN application integrating Xray-core and Shizuku for rootless hotspot sharing.

## Tech Stack
- **Language**: Kotlin 1.9.10
- **UI**: Jetpack Compose with Material 3
- **Network**: Android VpnService + Xray-Core (Go/Native)
- **Privilege**: Shizuku API for Tethering Bypass
- **Database**: Room Persistence Library
- **Architecture**: Clean Architecture (Presentation, Domain, Data)

## Key Features
- **V2Ray Support**: VLESS, VMess, Trojan, Shadowsocks, Reality.
- **Hotspot Sharing**: Integrated Shizzi logic for passing tethered traffic through the VPN tunnel.
- **RTL Support**: Full Arabic localization and RTL UI design.
- **Premium UI**: Dark mode with neon accents and glassmorphism.

## Build Instructions
1. Open the `android-source` directory in Android Studio.
2. Ensure you have the NDK and Go installed if rebuilding native binaries.
3. Sync Gradle and run the `app` module.

## Project Structure
- `app/src/main/kotlin/.../service/`: VPN and Foreground services.
- `app/src/main/kotlin/.../shizuku/`: Shizuku integration for hotspot.
- `app/src/main/kotlin/.../core/`: Xray engine management.
- `app/src/main/kotlin/.../ui/`: Jetpack Compose screens.
