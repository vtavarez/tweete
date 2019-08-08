## Tweete

Twitter application for Linux. Built on Electron and React.

## Preview

| Login                                | App                                |
| ------------------------------------ | ---------------------------------- |
| ![Tweete Login](./login-preview.png) | ![Tweete Login](./app-preview.png) |

## Installation

`
git clone
npm install

`

## Setup

1. Head to [developer.twitter.com](https://developer.twitter.com/en/apply-for-access) and apply for twitter api access.
2. Create a a data directory in the src folder and create a config.json file holding your api key and secret provided by twitter.

<code>

/src/data/config.json
<br>
{
"key": KEY,
"secret": SECRET
}

</code>

## Build

<code>

npm pre-electron-pack
<br>
npm electron-pack

</code>

- "pre-electron-pack" will build CRA.
- "electron-pack" packages the CRA build files, assets, and app dependencies for distribution via Snapcraft.

## Inspiration & Thanks

Twitter,
TweetBot,
[Tweete Icon by Pixel Buddah](https://www.flaticon.com/authors/pixel-buddha")
