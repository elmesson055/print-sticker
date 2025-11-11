# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/63c4bf99-2a82-4b8a-87ee-a497ff2e68e1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/63c4bf99-2a82-4b8a-87ee-a497ff2e68e1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/63c4bf99-2a82-4b8a-87ee-a497ff2e68e1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Building Android APK

This project is configured to build Android APK files using Capacitor and GitHub Actions.

### Prerequisites

- Node.js 20 or higher
- Java JDK 17 (for local builds)
- Android Studio (optional, for local development)

### Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create required configuration files:**

   Create `capacitor.config.ts` in the project root:
   ```typescript
   import type { CapacitorConfig } from '@capacitor/cli';

   const config: CapacitorConfig = {
     appId: 'com.print.app',
     appName: 'Print App',
     webDir: 'dist',
     server: {
       androidScheme: 'https'
     },
     android: {
       buildOptions: {
         keystorePath: undefined,
         keystorePassword: undefined,
         keystoreAlias: undefined,
         keystoreAliasPassword: undefined,
         releaseType: 'APK'
       }
     }
   };

   export default config;
   ```

   Create `.github/workflows/android-build.yml` for automated builds (see below).

3. **Initialize Capacitor and add Android platform:**
   ```bash
   npm run build
   npx cap add android
   ```

4. **Sync web assets to Android:**
   ```bash
   npm run build:android
   ```

### Local Build

To build APK locally:

```bash
# Build the web app
npm run build

# Sync to Android
npm run cap:sync

# Build APK
cd android
./gradlew assembleDebug
```

The APK will be located at: `android/app/build/outputs/apk/debug/app-debug.apk`

### GitHub Actions Automated Build

The project includes a GitHub Actions workflow that automatically builds the APK when you push to the main/master branch.

**Workflow file:** `.github/workflows/android-build.yml`

The workflow:
- Triggers on push to main/master branches
- Can be manually triggered via workflow_dispatch
- Builds debug APK automatically
- Uploads APK as artifact (available for 30 days)
- Builds release APK when you create a git tag

**To download the built APK:**
1. Go to your GitHub repository
2. Click on "Actions" tab
3. Select the latest workflow run
4. Download the APK from "Artifacts" section

### Creating a Release Build

For production releases with a signed APK:

1. Generate a keystore:
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Add GitHub Secrets (Settings > Secrets and variables > Actions):
   - `KEYSTORE_FILE`: Base64 encoded keystore file
   - `KEYSTORE_PASSWORD`: Keystore password
   - `KEY_ALIAS`: Key alias
   - `KEY_PASSWORD`: Key password

3. Create a git tag and push:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

### Available Scripts

- `npm run build:android` - Build web app and sync to Android
- `npm run cap:sync` - Sync web assets to native platforms
- `npm run cap:open:android` - Open Android project in Android Studio

### Customization

**App Name and ID:**
Edit `capacitor.config.ts`:
- `appId`: Change to your package name (e.g., 'com.yourcompany.appname')
- `appName`: Change to your app display name

**App Icon and Splash Screen:**
Place your assets in:
- `android/app/src/main/res/` (after running `npx cap add android`)
- Use Android Studio's Image Asset Studio for easy icon generation

**Permissions:**
Edit `android/app/src/main/AndroidManifest.xml` to add required permissions.
