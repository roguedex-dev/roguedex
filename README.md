# Rogue Dex Browser Extension

## Description
Rogue Dex is a browser extension that connects to Pokerogue and uses PokeAPI to show information about Pokemon weaknesses, immunities, and resistances for each round.

## Features
- Displays Pokemon weaknesses, immunities, and resistances in real-time during gameplay.
- Enhances the Pokerogue experience by providing valuable Pokemon information.

## Installation
- Clone this repository to your local machine.
- Load the extension in developer mode in your browser.
- Launch Pokerogue and start playing to see Pokemon data in action.

## Usage
- Start a new game or load a saved game in Pokerogue.
- The extension will display Pokemon information for each round.
- Use the data to strategize your gameplay effectively.

## TODO
- **Chrome Support:** Ensure the extension works seamlessly on Chrome (currently supports Firefox only).
- **Continue Button Functionality:** Make sure the extension works with the continue button in addition to new game and load game.
- **Rework Extension Logic:** Refactor the extension to hook into the game script instead of relying on GET requests for fetching sprites. This will improve stability and avoid flakiness in the extension.
- **Add IV information** This can be done by snooping into the .json file received from the server at each round, without the need of IV scanner

## Contribution
Feel free to contribute to this project by forking the repository, making changes, and submitting pull requests.
