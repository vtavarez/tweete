![GitHub package.json version](https://img.shields.io/github/package-json/v/vtavarez/Tweete?color=28a745)

# Tweete

Twitter application for Linux. Built on Electron and React.

## Preview

| Login                                        | App                                        |
| -------------------------------------------- | ------------------------------------------ |
| ![Tweete Login](./preview/login-preview.png) | ![Tweete Login](./preview/app-preview.png) |

## Installation

```
git clone
yarn install
```

## Setup

1. Head to [developer.twitter.com](https://developer.twitter.com/en/apply-for-access) and apply for twitter api access.
2. Create a `.env` file in the app root directory with your twitter api key and secret.

```
.env

KEY=KEY
SECRET=SECRET

```

3. Create a folder named `data` in the app root directory.
4. In `data` create a file named `users.db`.

## Run

Once you've done the installation and setup steps above, you can run the app with `yarn electron-dev`.

## Build

When your ready to deploy, run the scripts below.

```
yarn pre-electron-pack
yarn electron-pack
```

`pre-electron-pack` will run the CRA (Create React App) build process.

`electron-pack` will package the CRA build files, the assets and data folders, and app dependencies for distribution via Snapcraft.

## Inspiration & Thanks

Twitter,
TweetBot,
[Tweete Icon by Pixel Buddah](https://www.flaticon.com/authors/pixel-buddha")
