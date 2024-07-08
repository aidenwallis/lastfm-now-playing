# lastfm-now-playing

> A hosted version of this widget is available at [lastfm.aiden.tv](https://lastfm.aiden.tv)!

A [last.fm](https://last.fm) equivalent to my existing [Spotify Now Playing](https://github.com/aidenwallis/nowplaying) widget.

- This widget is less prone to Spotify's strict API ratelimits, causing delays in updates to song changes.

- This widget is able to support other music providers, [such as YouTube Music](https://www.last.fm/about/trackmymusic)!

- This widget does not require any form of authentication, as it uses the public Last.FM API.

## Getting started

1. Visit [lastfm.aiden.tv](https://lastfm.aiden.tv).

1. Enter your [last.fm](https://last.fm) username in the prompt.

1. Follow the given instructions to add to your [OBS](https://obsproject.com/).

## Running locally

1. Clone the repository.

1. Run `npm i` to install dependencies.

1. Copy `.env.example` to `.env`, and add a [Last.FM API key](https://last.fm/api/accounts).

1. Run `npm run dev` to run the widget locally.

1. Run `npm run build` to build the widget.