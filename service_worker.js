try {
      importScripts("background.js", "libs/pokeapi.js", "libs/pokerogueutils.js", "libs/utils.js", "libs/enums/Nature.js", "libs/enums/Stat.js", "libs/enums/WeatherType.js")
} catch (e) {
      console.error("Error while importing script:", e)
}