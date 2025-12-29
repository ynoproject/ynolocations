# ynobadges

Repository to host the location configurations for the games present on [YNOproject](https://ynoproject.net).


## How Does It Work?

While playing on YNOproject, a configuration file lists the name for each world in a game, based on their map ID (can be found in RPG Maker 2003 by right-clicking on a map file; meanwhile, coordinates can be found by looking at the bottom-right corner of the app after selecting a tile). When a player is on a map whose ID matches with the one present in the config, the name of said location will be displayed on their screen: if the configuration is set to link to a wiki, the name of the world will be appended to the wiki link, which will allow users to directly access the wiki page of the world by clicking on the location name, and maps of the world from the wiki page will be able to be checked directly from the site.

To see the syntax that can be used for configuration files, you can check the example config file that can be found [here](/config.json.example), [including a version if a translated version exists for a language](/ja.json.example).

If a map not present in the configuration is visited, the current location will be displayed as `Unknown Location`. Each valid location should be listed to avoid this.

The config.json file of a game is used automatically while playing in English, and other languages will also use it unless a location file specific to said language exists (e.g. ja.json for Japanese, zh.json for Chinese; languages and their abbreviation correspondances must match those present on [forest-orb](https://github.com/ynoproject/forest-orb/tree/master/lang)). Having translated location configurations is usually done when a wiki equivalent exists for a game in said language as to make things easier for players (having a translated location configuration not able to link to a wiki while the English version can can be a bit troublesome, so it is rarely done).

When a configuration is updated, each language must be kept up to date, as it can create issues otherwise.

Ideally, unused maps and worlds should not be listed, as to not encourage players to visit them by using exploits.

Lastly, the expedition and world progress systems of YNOproject is able to know if you visited a world based on if you visited a location with the **EXACT SAME NAME**. Therefore, for a world, at least one of its locations that can be visited must have the exact same name, otherwise it will not be able to complete expeditions there (e.g. in `Plaza World`, you cannot have the world defined solely by two locations named `Plaza World: South` and `Plaza World: North`: you need at least one `Plaza World`, as visiting `Plaza World: South` or `Plaza World: North` would not be able to trigger expedition and world progress due to not having the exact same name than `Plaza World`).


## The Yume 2kki Case

Unlike the other games, as Yume 2kki is constantly growing, and to make things simpler, the location configuration is not complete: instead, YNOproject parses the map IDs present on the [Map IDs page of Yume Wiki](https://yume.wiki/2kki/Map_IDs), and uses them if the entry selected is listed as `Accessible`, has a proper name and links to a proper world page. On said linked world page, the `Japanese Name` property is used as the name to use for the Japanese, Korean and Chinese location configurations.

As such, outside of defining the wiki link and the ignored map IDs, the configuration present here is only used to define specific cases that cannot be defined solely by the Map IDs pages:
- Define coordinates to delimit worlds (e.g. aediorugap's maps, such as map 1730, tend to include several worlds on them)
- Define a previous map ID (avoid unless absolutely needed, as using the Bat effect will define the previous map as being the current map, breaking the intended use)
- Define the name of a world for the Japanese language if the Japanese name of the English wiki page doesn't match the one of said map (e.g. Map 0561, room of the menu type 15 in Depths, is specifically named `すいそう` and is its own world on the Japanese wiki, whereas it is just another part of Depths on the English wiki: not having it listed would result in it being displayed as `みなぞこ` as it would have been directly taken from the Depths page)
- Have a different name for the world than its wiki link (e.g. map 0004 displays `Urotsuki's Dream Room`, but links to Urotsuki's Room; map 0206 displays `Star Ocean: Sea Sponge Path` and links to the Sea Sponge Path section of the Star Ocean page)
- Define a location that is not a world, and would not be taken automatically from the Map IDs pages (e.g. minigame maps, ending maps)
- Define a location as being excluded from the Yume 2kki Explorer/Navigator (for locations that should not be part of the world tree, such as Urotsuki's Room, minigames or endings)
- If the world is used as part of a Time Trial badge, it needs to be listed, as it will be used as the name of the category in the Rankings

The Korean and Chinese location configurations are duplicate of the Japanese one (no difference at all, as the Japanese names and Japanese wiki are used), and must be updated each time the Japanese configuration needs to be edited.


## Related Links

* [YNOproject](https://ynoproject.net/)
* [YNOproject Discord](https://ynoproject.net/discord)
* [YNOproject Tumblr](https://tumblr.com/ynoproject)
* [YNOproject X (previously Twitter)](https://twitter.com/ynoproject)
* [Yume Wiki](https://yume.wiki/Main_Page)
* [Yume Nikki Fangames Wiki](https://ynfg.yume.wiki/Yume_Nikki_Fangames_Wiki)
* [EasyRPG.org](https://easyrpg.org/)
* [EasyRPG Wiki](https://wiki.easyrpg.org/)