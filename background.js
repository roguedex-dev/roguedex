const browserApi = typeof browser !== "undefined" ? browser : chrome;
let Abilities;
(function (Abilities) {
    Abilities[Abilities["NONE"] = 0] = "NONE";
    Abilities[Abilities["STENCH"] = 1] = "STENCH";
    Abilities[Abilities["DRIZZLE"] = 2] = "DRIZZLE";
    Abilities[Abilities["SPEED_BOOST"] = 3] = "SPEED_BOOST";
    Abilities[Abilities["BATTLE_ARMOR"] = 4] = "BATTLE_ARMOR";
    Abilities[Abilities["STURDY"] = 5] = "STURDY";
    Abilities[Abilities["DAMP"] = 6] = "DAMP";
    Abilities[Abilities["LIMBER"] = 7] = "LIMBER";
    Abilities[Abilities["SAND_VEIL"] = 8] = "SAND_VEIL";
    Abilities[Abilities["STATIC"] = 9] = "STATIC";
    Abilities[Abilities["VOLT_ABSORB"] = 10] = "VOLT_ABSORB";
    Abilities[Abilities["WATER_ABSORB"] = 11] = "WATER_ABSORB";
    Abilities[Abilities["OBLIVIOUS"] = 12] = "OBLIVIOUS";
    Abilities[Abilities["CLOUD_NINE"] = 13] = "CLOUD_NINE";
    Abilities[Abilities["COMPOUND_EYES"] = 14] = "COMPOUND_EYES";
    Abilities[Abilities["INSOMNIA"] = 15] = "INSOMNIA";
    Abilities[Abilities["COLOR_CHANGE"] = 16] = "COLOR_CHANGE";
    Abilities[Abilities["IMMUNITY"] = 17] = "IMMUNITY";
    Abilities[Abilities["FLASH_FIRE"] = 18] = "FLASH_FIRE";
    Abilities[Abilities["SHIELD_DUST"] = 19] = "SHIELD_DUST";
    Abilities[Abilities["OWN_TEMPO"] = 20] = "OWN_TEMPO";
    Abilities[Abilities["SUCTION_CUPS"] = 21] = "SUCTION_CUPS";
    Abilities[Abilities["INTIMIDATE"] = 22] = "INTIMIDATE";
    Abilities[Abilities["SHADOW_TAG"] = 23] = "SHADOW_TAG";
    Abilities[Abilities["ROUGH_SKIN"] = 24] = "ROUGH_SKIN";
    Abilities[Abilities["WONDER_GUARD"] = 25] = "WONDER_GUARD";
    Abilities[Abilities["LEVITATE"] = 26] = "LEVITATE";
    Abilities[Abilities["EFFECT_SPORE"] = 27] = "EFFECT_SPORE";
    Abilities[Abilities["SYNCHRONIZE"] = 28] = "SYNCHRONIZE";
    Abilities[Abilities["CLEAR_BODY"] = 29] = "CLEAR_BODY";
    Abilities[Abilities["NATURAL_CURE"] = 30] = "NATURAL_CURE";
    Abilities[Abilities["LIGHTNING_ROD"] = 31] = "LIGHTNING_ROD";
    Abilities[Abilities["SERENE_GRACE"] = 32] = "SERENE_GRACE";
    Abilities[Abilities["SWIFT_SWIM"] = 33] = "SWIFT_SWIM";
    Abilities[Abilities["CHLOROPHYLL"] = 34] = "CHLOROPHYLL";
    Abilities[Abilities["ILLUMINATE"] = 35] = "ILLUMINATE";
    Abilities[Abilities["TRACE"] = 36] = "TRACE";
    Abilities[Abilities["HUGE_POWER"] = 37] = "HUGE_POWER";
    Abilities[Abilities["POISON_POINT"] = 38] = "POISON_POINT";
    Abilities[Abilities["INNER_FOCUS"] = 39] = "INNER_FOCUS";
    Abilities[Abilities["MAGMA_ARMOR"] = 40] = "MAGMA_ARMOR";
    Abilities[Abilities["WATER_VEIL"] = 41] = "WATER_VEIL";
    Abilities[Abilities["MAGNET_PULL"] = 42] = "MAGNET_PULL";
    Abilities[Abilities["SOUNDPROOF"] = 43] = "SOUNDPROOF";
    Abilities[Abilities["RAIN_DISH"] = 44] = "RAIN_DISH";
    Abilities[Abilities["SAND_STREAM"] = 45] = "SAND_STREAM";
    Abilities[Abilities["PRESSURE"] = 46] = "PRESSURE";
    Abilities[Abilities["THICK_FAT"] = 47] = "THICK_FAT";
    Abilities[Abilities["EARLY_BIRD"] = 48] = "EARLY_BIRD";
    Abilities[Abilities["FLAME_BODY"] = 49] = "FLAME_BODY";
    Abilities[Abilities["RUN_AWAY"] = 50] = "RUN_AWAY";
    Abilities[Abilities["KEEN_EYE"] = 51] = "KEEN_EYE";
    Abilities[Abilities["HYPER_CUTTER"] = 52] = "HYPER_CUTTER";
    Abilities[Abilities["PICKUP"] = 53] = "PICKUP";
    Abilities[Abilities["TRUANT"] = 54] = "TRUANT";
    Abilities[Abilities["HUSTLE"] = 55] = "HUSTLE";
    Abilities[Abilities["CUTE_CHARM"] = 56] = "CUTE_CHARM";
    Abilities[Abilities["PLUS"] = 57] = "PLUS";
    Abilities[Abilities["MINUS"] = 58] = "MINUS";
    Abilities[Abilities["FORECAST"] = 59] = "FORECAST";
    Abilities[Abilities["STICKY_HOLD"] = 60] = "STICKY_HOLD";
    Abilities[Abilities["SHED_SKIN"] = 61] = "SHED_SKIN";
    Abilities[Abilities["GUTS"] = 62] = "GUTS";
    Abilities[Abilities["MARVEL_SCALE"] = 63] = "MARVEL_SCALE";
    Abilities[Abilities["LIQUID_OOZE"] = 64] = "LIQUID_OOZE";
    Abilities[Abilities["OVERGROW"] = 65] = "OVERGROW";
    Abilities[Abilities["BLAZE"] = 66] = "BLAZE";
    Abilities[Abilities["TORRENT"] = 67] = "TORRENT";
    Abilities[Abilities["SWARM"] = 68] = "SWARM";
    Abilities[Abilities["ROCK_HEAD"] = 69] = "ROCK_HEAD";
    Abilities[Abilities["DROUGHT"] = 70] = "DROUGHT";
    Abilities[Abilities["ARENA_TRAP"] = 71] = "ARENA_TRAP";
    Abilities[Abilities["VITAL_SPIRIT"] = 72] = "VITAL_SPIRIT";
    Abilities[Abilities["WHITE_SMOKE"] = 73] = "WHITE_SMOKE";
    Abilities[Abilities["PURE_POWER"] = 74] = "PURE_POWER";
    Abilities[Abilities["SHELL_ARMOR"] = 75] = "SHELL_ARMOR";
    Abilities[Abilities["AIR_LOCK"] = 76] = "AIR_LOCK";
    Abilities[Abilities["TANGLED_FEET"] = 77] = "TANGLED_FEET";
    Abilities[Abilities["MOTOR_DRIVE"] = 78] = "MOTOR_DRIVE";
    Abilities[Abilities["RIVALRY"] = 79] = "RIVALRY";
    Abilities[Abilities["STEADFAST"] = 80] = "STEADFAST";
    Abilities[Abilities["SNOW_CLOAK"] = 81] = "SNOW_CLOAK";
    Abilities[Abilities["GLUTTONY"] = 82] = "GLUTTONY";
    Abilities[Abilities["ANGER_POINT"] = 83] = "ANGER_POINT";
    Abilities[Abilities["UNBURDEN"] = 84] = "UNBURDEN";
    Abilities[Abilities["HEATPROOF"] = 85] = "HEATPROOF";
    Abilities[Abilities["SIMPLE"] = 86] = "SIMPLE";
    Abilities[Abilities["DRY_SKIN"] = 87] = "DRY_SKIN";
    Abilities[Abilities["DOWNLOAD"] = 88] = "DOWNLOAD";
    Abilities[Abilities["IRON_FIST"] = 89] = "IRON_FIST";
    Abilities[Abilities["POISON_HEAL"] = 90] = "POISON_HEAL";
    Abilities[Abilities["ADAPTABILITY"] = 91] = "ADAPTABILITY";
    Abilities[Abilities["SKILL_LINK"] = 92] = "SKILL_LINK";
    Abilities[Abilities["HYDRATION"] = 93] = "HYDRATION";
    Abilities[Abilities["SOLAR_POWER"] = 94] = "SOLAR_POWER";
    Abilities[Abilities["QUICK_FEET"] = 95] = "QUICK_FEET";
    Abilities[Abilities["NORMALIZE"] = 96] = "NORMALIZE";
    Abilities[Abilities["SNIPER"] = 97] = "SNIPER";
    Abilities[Abilities["MAGIC_GUARD"] = 98] = "MAGIC_GUARD";
    Abilities[Abilities["NO_GUARD"] = 99] = "NO_GUARD";
    Abilities[Abilities["STALL"] = 100] = "STALL";
    Abilities[Abilities["TECHNICIAN"] = 101] = "TECHNICIAN";
    Abilities[Abilities["LEAF_GUARD"] = 102] = "LEAF_GUARD";
    Abilities[Abilities["KLUTZ"] = 103] = "KLUTZ";
    Abilities[Abilities["MOLD_BREAKER"] = 104] = "MOLD_BREAKER";
    Abilities[Abilities["SUPER_LUCK"] = 105] = "SUPER_LUCK";
    Abilities[Abilities["AFTERMATH"] = 106] = "AFTERMATH";
    Abilities[Abilities["ANTICIPATION"] = 107] = "ANTICIPATION";
    Abilities[Abilities["FOREWARN"] = 108] = "FOREWARN";
    Abilities[Abilities["UNAWARE"] = 109] = "UNAWARE";
    Abilities[Abilities["TINTED_LENS"] = 110] = "TINTED_LENS";
    Abilities[Abilities["FILTER"] = 111] = "FILTER";
    Abilities[Abilities["SLOW_START"] = 112] = "SLOW_START";
    Abilities[Abilities["SCRAPPY"] = 113] = "SCRAPPY";
    Abilities[Abilities["STORM_DRAIN"] = 114] = "STORM_DRAIN";
    Abilities[Abilities["ICE_BODY"] = 115] = "ICE_BODY";
    Abilities[Abilities["SOLID_ROCK"] = 116] = "SOLID_ROCK";
    Abilities[Abilities["SNOW_WARNING"] = 117] = "SNOW_WARNING";
    Abilities[Abilities["HONEY_GATHER"] = 118] = "HONEY_GATHER";
    Abilities[Abilities["FRISK"] = 119] = "FRISK";
    Abilities[Abilities["RECKLESS"] = 120] = "RECKLESS";
    Abilities[Abilities["MULTITYPE"] = 121] = "MULTITYPE";
    Abilities[Abilities["FLOWER_GIFT"] = 122] = "FLOWER_GIFT";
    Abilities[Abilities["BAD_DREAMS"] = 123] = "BAD_DREAMS";
    Abilities[Abilities["PICKPOCKET"] = 124] = "PICKPOCKET";
    Abilities[Abilities["SHEER_FORCE"] = 125] = "SHEER_FORCE";
    Abilities[Abilities["CONTRARY"] = 126] = "CONTRARY";
    Abilities[Abilities["UNNERVE"] = 127] = "UNNERVE";
    Abilities[Abilities["DEFIANT"] = 128] = "DEFIANT";
    Abilities[Abilities["DEFEATIST"] = 129] = "DEFEATIST";
    Abilities[Abilities["CURSED_BODY"] = 130] = "CURSED_BODY";
    Abilities[Abilities["HEALER"] = 131] = "HEALER";
    Abilities[Abilities["FRIEND_GUARD"] = 132] = "FRIEND_GUARD";
    Abilities[Abilities["WEAK_ARMOR"] = 133] = "WEAK_ARMOR";
    Abilities[Abilities["HEAVY_METAL"] = 134] = "HEAVY_METAL";
    Abilities[Abilities["LIGHT_METAL"] = 135] = "LIGHT_METAL";
    Abilities[Abilities["MULTISCALE"] = 136] = "MULTISCALE";
    Abilities[Abilities["TOXIC_BOOST"] = 137] = "TOXIC_BOOST";
    Abilities[Abilities["FLARE_BOOST"] = 138] = "FLARE_BOOST";
    Abilities[Abilities["HARVEST"] = 139] = "HARVEST";
    Abilities[Abilities["TELEPATHY"] = 140] = "TELEPATHY";
    Abilities[Abilities["MOODY"] = 141] = "MOODY";
    Abilities[Abilities["OVERCOAT"] = 142] = "OVERCOAT";
    Abilities[Abilities["POISON_TOUCH"] = 143] = "POISON_TOUCH";
    Abilities[Abilities["REGENERATOR"] = 144] = "REGENERATOR";
    Abilities[Abilities["BIG_PECKS"] = 145] = "BIG_PECKS";
    Abilities[Abilities["SAND_RUSH"] = 146] = "SAND_RUSH";
    Abilities[Abilities["WONDER_SKIN"] = 147] = "WONDER_SKIN";
    Abilities[Abilities["ANALYTIC"] = 148] = "ANALYTIC";
    Abilities[Abilities["ILLUSION"] = 149] = "ILLUSION";
    Abilities[Abilities["IMPOSTER"] = 150] = "IMPOSTER";
    Abilities[Abilities["INFILTRATOR"] = 151] = "INFILTRATOR";
    Abilities[Abilities["MUMMY"] = 152] = "MUMMY";
    Abilities[Abilities["MOXIE"] = 153] = "MOXIE";
    Abilities[Abilities["JUSTIFIED"] = 154] = "JUSTIFIED";
    Abilities[Abilities["RATTLED"] = 155] = "RATTLED";
    Abilities[Abilities["MAGIC_BOUNCE"] = 156] = "MAGIC_BOUNCE";
    Abilities[Abilities["SAP_SIPPER"] = 157] = "SAP_SIPPER";
    Abilities[Abilities["PRANKSTER"] = 158] = "PRANKSTER";
    Abilities[Abilities["SAND_FORCE"] = 159] = "SAND_FORCE";
    Abilities[Abilities["IRON_BARBS"] = 160] = "IRON_BARBS";
    Abilities[Abilities["ZEN_MODE"] = 161] = "ZEN_MODE";
    Abilities[Abilities["VICTORY_STAR"] = 162] = "VICTORY_STAR";
    Abilities[Abilities["TURBOBLAZE"] = 163] = "TURBOBLAZE";
    Abilities[Abilities["TERAVOLT"] = 164] = "TERAVOLT";
    Abilities[Abilities["AROMA_VEIL"] = 165] = "AROMA_VEIL";
    Abilities[Abilities["FLOWER_VEIL"] = 166] = "FLOWER_VEIL";
    Abilities[Abilities["CHEEK_POUCH"] = 167] = "CHEEK_POUCH";
    Abilities[Abilities["PROTEAN"] = 168] = "PROTEAN";
    Abilities[Abilities["FUR_COAT"] = 169] = "FUR_COAT";
    Abilities[Abilities["MAGICIAN"] = 170] = "MAGICIAN";
    Abilities[Abilities["BULLETPROOF"] = 171] = "BULLETPROOF";
    Abilities[Abilities["COMPETITIVE"] = 172] = "COMPETITIVE";
    Abilities[Abilities["STRONG_JAW"] = 173] = "STRONG_JAW";
    Abilities[Abilities["REFRIGERATE"] = 174] = "REFRIGERATE";
    Abilities[Abilities["SWEET_VEIL"] = 175] = "SWEET_VEIL";
    Abilities[Abilities["STANCE_CHANGE"] = 176] = "STANCE_CHANGE";
    Abilities[Abilities["GALE_WINGS"] = 177] = "GALE_WINGS";
    Abilities[Abilities["MEGA_LAUNCHER"] = 178] = "MEGA_LAUNCHER";
    Abilities[Abilities["GRASS_PELT"] = 179] = "GRASS_PELT";
    Abilities[Abilities["SYMBIOSIS"] = 180] = "SYMBIOSIS";
    Abilities[Abilities["TOUGH_CLAWS"] = 181] = "TOUGH_CLAWS";
    Abilities[Abilities["PIXILATE"] = 182] = "PIXILATE";
    Abilities[Abilities["GOOEY"] = 183] = "GOOEY";
    Abilities[Abilities["AERILATE"] = 184] = "AERILATE";
    Abilities[Abilities["PARENTAL_BOND"] = 185] = "PARENTAL_BOND";
    Abilities[Abilities["DARK_AURA"] = 186] = "DARK_AURA";
    Abilities[Abilities["FAIRY_AURA"] = 187] = "FAIRY_AURA";
    Abilities[Abilities["AURA_BREAK"] = 188] = "AURA_BREAK";
    Abilities[Abilities["PRIMORDIAL_SEA"] = 189] = "PRIMORDIAL_SEA";
    Abilities[Abilities["DESOLATE_LAND"] = 190] = "DESOLATE_LAND";
    Abilities[Abilities["DELTA_STREAM"] = 191] = "DELTA_STREAM";
    Abilities[Abilities["STAMINA"] = 192] = "STAMINA";
    Abilities[Abilities["WIMP_OUT"] = 193] = "WIMP_OUT";
    Abilities[Abilities["EMERGENCY_EXIT"] = 194] = "EMERGENCY_EXIT";
    Abilities[Abilities["WATER_COMPACTION"] = 195] = "WATER_COMPACTION";
    Abilities[Abilities["MERCILESS"] = 196] = "MERCILESS";
    Abilities[Abilities["SHIELDS_DOWN"] = 197] = "SHIELDS_DOWN";
    Abilities[Abilities["STAKEOUT"] = 198] = "STAKEOUT";
    Abilities[Abilities["WATER_BUBBLE"] = 199] = "WATER_BUBBLE";
    Abilities[Abilities["STEELWORKER"] = 200] = "STEELWORKER";
    Abilities[Abilities["BERSERK"] = 201] = "BERSERK";
    Abilities[Abilities["SLUSH_RUSH"] = 202] = "SLUSH_RUSH";
    Abilities[Abilities["LONG_REACH"] = 203] = "LONG_REACH";
    Abilities[Abilities["LIQUID_VOICE"] = 204] = "LIQUID_VOICE";
    Abilities[Abilities["TRIAGE"] = 205] = "TRIAGE";
    Abilities[Abilities["GALVANIZE"] = 206] = "GALVANIZE";
    Abilities[Abilities["SURGE_SURFER"] = 207] = "SURGE_SURFER";
    Abilities[Abilities["SCHOOLING"] = 208] = "SCHOOLING";
    Abilities[Abilities["DISGUISE"] = 209] = "DISGUISE";
    Abilities[Abilities["BATTLE_BOND"] = 210] = "BATTLE_BOND";
    Abilities[Abilities["POWER_CONSTRUCT"] = 211] = "POWER_CONSTRUCT";
    Abilities[Abilities["CORROSION"] = 212] = "CORROSION";
    Abilities[Abilities["COMATOSE"] = 213] = "COMATOSE";
    Abilities[Abilities["QUEENLY_MAJESTY"] = 214] = "QUEENLY_MAJESTY";
    Abilities[Abilities["INNARDS_OUT"] = 215] = "INNARDS_OUT";
    Abilities[Abilities["DANCER"] = 216] = "DANCER";
    Abilities[Abilities["BATTERY"] = 217] = "BATTERY";
    Abilities[Abilities["FLUFFY"] = 218] = "FLUFFY";
    Abilities[Abilities["DAZZLING"] = 219] = "DAZZLING";
    Abilities[Abilities["SOUL_HEART"] = 220] = "SOUL_HEART";
    Abilities[Abilities["TANGLING_HAIR"] = 221] = "TANGLING_HAIR";
    Abilities[Abilities["RECEIVER"] = 222] = "RECEIVER";
    Abilities[Abilities["POWER_OF_ALCHEMY"] = 223] = "POWER_OF_ALCHEMY";
    Abilities[Abilities["BEAST_BOOST"] = 224] = "BEAST_BOOST";
    Abilities[Abilities["RKS_SYSTEM"] = 225] = "RKS_SYSTEM";
    Abilities[Abilities["ELECTRIC_SURGE"] = 226] = "ELECTRIC_SURGE";
    Abilities[Abilities["PSYCHIC_SURGE"] = 227] = "PSYCHIC_SURGE";
    Abilities[Abilities["MISTY_SURGE"] = 228] = "MISTY_SURGE";
    Abilities[Abilities["GRASSY_SURGE"] = 229] = "GRASSY_SURGE";
    Abilities[Abilities["FULL_METAL_BODY"] = 230] = "FULL_METAL_BODY";
    Abilities[Abilities["SHADOW_SHIELD"] = 231] = "SHADOW_SHIELD";
    Abilities[Abilities["PRISM_ARMOR"] = 232] = "PRISM_ARMOR";
    Abilities[Abilities["NEUROFORCE"] = 233] = "NEUROFORCE";
    Abilities[Abilities["INTREPID_SWORD"] = 234] = "INTREPID_SWORD";
    Abilities[Abilities["DAUNTLESS_SHIELD"] = 235] = "DAUNTLESS_SHIELD";
    Abilities[Abilities["LIBERO"] = 236] = "LIBERO";
    Abilities[Abilities["BALL_FETCH"] = 237] = "BALL_FETCH";
    Abilities[Abilities["COTTON_DOWN"] = 238] = "COTTON_DOWN";
    Abilities[Abilities["PROPELLER_TAIL"] = 239] = "PROPELLER_TAIL";
    Abilities[Abilities["MIRROR_ARMOR"] = 240] = "MIRROR_ARMOR";
    Abilities[Abilities["GULP_MISSILE"] = 241] = "GULP_MISSILE";
    Abilities[Abilities["STALWART"] = 242] = "STALWART";
    Abilities[Abilities["STEAM_ENGINE"] = 243] = "STEAM_ENGINE";
    Abilities[Abilities["PUNK_ROCK"] = 244] = "PUNK_ROCK";
    Abilities[Abilities["SAND_SPIT"] = 245] = "SAND_SPIT";
    Abilities[Abilities["ICE_SCALES"] = 246] = "ICE_SCALES";
    Abilities[Abilities["RIPEN"] = 247] = "RIPEN";
    Abilities[Abilities["ICE_FACE"] = 248] = "ICE_FACE";
    Abilities[Abilities["POWER_SPOT"] = 249] = "POWER_SPOT";
    Abilities[Abilities["MIMICRY"] = 250] = "MIMICRY";
    Abilities[Abilities["SCREEN_CLEANER"] = 251] = "SCREEN_CLEANER";
    Abilities[Abilities["STEELY_SPIRIT"] = 252] = "STEELY_SPIRIT";
    Abilities[Abilities["PERISH_BODY"] = 253] = "PERISH_BODY";
    Abilities[Abilities["WANDERING_SPIRIT"] = 254] = "WANDERING_SPIRIT";
    Abilities[Abilities["GORILLA_TACTICS"] = 255] = "GORILLA_TACTICS";
    Abilities[Abilities["NEUTRALIZING_GAS"] = 256] = "NEUTRALIZING_GAS";
    Abilities[Abilities["PASTEL_VEIL"] = 257] = "PASTEL_VEIL";
    Abilities[Abilities["HUNGER_SWITCH"] = 258] = "HUNGER_SWITCH";
    Abilities[Abilities["QUICK_DRAW"] = 259] = "QUICK_DRAW";
    Abilities[Abilities["UNSEEN_FIST"] = 260] = "UNSEEN_FIST";
    Abilities[Abilities["CURIOUS_MEDICINE"] = 261] = "CURIOUS_MEDICINE";
    Abilities[Abilities["TRANSISTOR"] = 262] = "TRANSISTOR";
    Abilities[Abilities["DRAGONS_MAW"] = 263] = "DRAGONS_MAW";
    Abilities[Abilities["CHILLING_NEIGH"] = 264] = "CHILLING_NEIGH";
    Abilities[Abilities["GRIM_NEIGH"] = 265] = "GRIM_NEIGH";
    Abilities[Abilities["AS_ONE_GLASTRIER"] = 266] = "AS_ONE_GLASTRIER";
    Abilities[Abilities["AS_ONE_SPECTRIER"] = 267] = "AS_ONE_SPECTRIER";
    Abilities[Abilities["LINGERING_AROMA"] = 268] = "LINGERING_AROMA";
    Abilities[Abilities["SEED_SOWER"] = 269] = "SEED_SOWER";
    Abilities[Abilities["THERMAL_EXCHANGE"] = 270] = "THERMAL_EXCHANGE";
    Abilities[Abilities["ANGER_SHELL"] = 271] = "ANGER_SHELL";
    Abilities[Abilities["PURIFYING_SALT"] = 272] = "PURIFYING_SALT";
    Abilities[Abilities["WELL_BAKED_BODY"] = 273] = "WELL_BAKED_BODY";
    Abilities[Abilities["WIND_RIDER"] = 274] = "WIND_RIDER";
    Abilities[Abilities["GUARD_DOG"] = 275] = "GUARD_DOG";
    Abilities[Abilities["ROCKY_PAYLOAD"] = 276] = "ROCKY_PAYLOAD";
    Abilities[Abilities["WIND_POWER"] = 277] = "WIND_POWER";
    Abilities[Abilities["ZERO_TO_HERO"] = 278] = "ZERO_TO_HERO";
    Abilities[Abilities["COMMANDER"] = 279] = "COMMANDER";
    Abilities[Abilities["ELECTROMORPHOSIS"] = 280] = "ELECTROMORPHOSIS";
    Abilities[Abilities["PROTOSYNTHESIS"] = 281] = "PROTOSYNTHESIS";
    Abilities[Abilities["QUARK_DRIVE"] = 282] = "QUARK_DRIVE";
    Abilities[Abilities["GOOD_AS_GOLD"] = 283] = "GOOD_AS_GOLD";
    Abilities[Abilities["VESSEL_OF_RUIN"] = 284] = "VESSEL_OF_RUIN";
    Abilities[Abilities["SWORD_OF_RUIN"] = 285] = "SWORD_OF_RUIN";
    Abilities[Abilities["TABLETS_OF_RUIN"] = 286] = "TABLETS_OF_RUIN";
    Abilities[Abilities["BEADS_OF_RUIN"] = 287] = "BEADS_OF_RUIN";
    Abilities[Abilities["ORICHALCUM_PULSE"] = 288] = "ORICHALCUM_PULSE";
    Abilities[Abilities["HADRON_ENGINE"] = 289] = "HADRON_ENGINE";
    Abilities[Abilities["OPPORTUNIST"] = 290] = "OPPORTUNIST";
    Abilities[Abilities["CUD_CHEW"] = 291] = "CUD_CHEW";
    Abilities[Abilities["SHARPNESS"] = 292] = "SHARPNESS";
    Abilities[Abilities["SUPREME_OVERLORD"] = 293] = "SUPREME_OVERLORD";
    Abilities[Abilities["COSTAR"] = 294] = "COSTAR";
    Abilities[Abilities["TOXIC_DEBRIS"] = 295] = "TOXIC_DEBRIS";
    Abilities[Abilities["ARMOR_TAIL"] = 296] = "ARMOR_TAIL";
    Abilities[Abilities["EARTH_EATER"] = 297] = "EARTH_EATER";
    Abilities[Abilities["MYCELIUM_MIGHT"] = 298] = "MYCELIUM_MIGHT";
    Abilities[Abilities["MINDS_EYE"] = 299] = "MINDS_EYE";
    Abilities[Abilities["SUPERSWEET_SYRUP"] = 300] = "SUPERSWEET_SYRUP";
    Abilities[Abilities["HOSPITALITY"] = 301] = "HOSPITALITY";
    Abilities[Abilities["TOXIC_CHAIN"] = 302] = "TOXIC_CHAIN";
    Abilities[Abilities["EMBODY_ASPECT_TEAL"] = 303] = "EMBODY_ASPECT_TEAL";
    Abilities[Abilities["EMBODY_ASPECT_WELLSPRING"] = 304] = "EMBODY_ASPECT_WELLSPRING";
    Abilities[Abilities["EMBODY_ASPECT_HEARTHFLAME"] = 305] = "EMBODY_ASPECT_HEARTHFLAME";
    Abilities[Abilities["EMBODY_ASPECT_CORNERSTONE"] = 306] = "EMBODY_ASPECT_CORNERSTONE";
    Abilities[Abilities["TERA_SHIFT"] = 307] = "TERA_SHIFT";
    Abilities[Abilities["TERA_SHELL"] = 308] = "TERA_SHELL";
    Abilities[Abilities["TERAFORM_ZERO"] = 309] = "TERAFORM_ZERO";
    Abilities[Abilities["POISON_PUPPETEER"] = 310] = "POISON_PUPPETEER";
})(Abilities || (Abilities = {}));

let Nature;
(function (Nature) {
    Nature[Nature["HARDY"] = 0] = "HARDY";
    Nature[Nature["LONELY"] = 1] = "LONELY";
    Nature[Nature["BRAVE"] = 2] = "BRAVE";
    Nature[Nature["ADAMANT"] = 3] = "ADAMANT";
    Nature[Nature["NAUGHTY"] = 4] = "NAUGHTY";
    Nature[Nature["BOLD"] = 5] = "BOLD";
    Nature[Nature["DOCILE"] = 6] = "DOCILE";
    Nature[Nature["RELAXED"] = 7] = "RELAXED";
    Nature[Nature["IMPISH"] = 8] = "IMPISH";
    Nature[Nature["LAX"] = 9] = "LAX";
    Nature[Nature["TIMID"] = 10] = "TIMID";
    Nature[Nature["HASTY"] = 11] = "HASTY";
    Nature[Nature["SERIOUS"] = 12] = "SERIOUS";
    Nature[Nature["JOLLY"] = 13] = "JOLLY";
    Nature[Nature["NAIVE"] = 14] = "NAIVE";
    Nature[Nature["MODEST"] = 15] = "MODEST";
    Nature[Nature["MILD"] = 16] = "MILD";
    Nature[Nature["QUIET"] = 17] = "QUIET";
    Nature[Nature["BASHFUL"] = 18] = "BASHFUL";
    Nature[Nature["RASH"] = 19] = "RASH";
    Nature[Nature["CALM"] = 20] = "CALM";
    Nature[Nature["GENTLE"] = 21] = "GENTLE";
    Nature[Nature["SASSY"] = 22] = "SASSY";
    Nature[Nature["CAREFUL"] = 23] = "CAREFUL";
    Nature[Nature["QUIRKY"] = 24] = "QUIRKY";
})(Nature || (Nature = {}));

let WeatherType;
(function (WeatherType) {
    WeatherType[WeatherType["NONE"] = 0] = "NONE";
    WeatherType[WeatherType["SUNNY"] = 1] = "SUNNY";
    WeatherType[WeatherType["RAIN"] = 2] = "RAIN";
    WeatherType[WeatherType["SANDSTORM"] = 3] = "SANDSTORM";
    WeatherType[WeatherType["HAIL"] = 4] = "HAIL";
    WeatherType[WeatherType["SNOW"] = 5] = "SNOW";
    WeatherType[WeatherType["FOG"] = 6] = "FOG";
    WeatherType[WeatherType["HEAVY_RAIN"] = 7] = "HEAVY_RAIN";
    WeatherType[WeatherType["HARSH_SUN"] = 8] = "HARSH_SUN";
    WeatherType[WeatherType["STRONG_WINDS"] = 9] = "STRONG_WINDS";
})(WeatherType || (WeatherType = {}));

function getPokemonSpriteURL(id) {
  // Construct the sprite URL based on the Pokemon ID
  const spriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return spriteURL;
}

// Function to get Pokémon type
async function getPokeType(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const types = data.types.map(type => type.type.name);
    return types;
  } catch (error) {
    console.error('Error fetching Pokémon type:', error);
    return null;
  }
}

// Function to get type effectiveness
async function getTypeEffectiveness(type) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    return data.damage_relations;
  } catch (error) {
    console.error(`Error fetching type effectiveness for ${type}:`, error);
    return null;
  }
}
// i don't know how to do javascript please fix this if it's broken
// gets ability from pokeapi using the pokemon's ability index
async function getAbility(pokeID, abilityIndex)
{
    try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
    const data = await response.json();
    return data.abilities[abilityIndex].ability.name;
  } catch (error) {
    console.error('Error fetching Pokémons ability:', error);
    return null;
  }
}
// Function to calculate weaknesses, resistances, and immunities
async function calculateTypeEffectiveness(types) {
  const typeEffectiveness = await Promise.all(types.map(getTypeEffectiveness));
  if (typeEffectiveness.some(data => data === null)) {
    return null;
  }

  const weaknesses = new Set();
  const resistances = new Set();
  const immunities = new Set();

  if (types.length === 1) {
    const data = typeEffectiveness[0];
    data.double_damage_from.forEach(t => weaknesses.add(t.name));
    data.half_damage_from.forEach(t => resistances.add(t.name));
    data.no_damage_from.forEach(t => immunities.add(t.name));
  } else if (types.length === 2) {
    const [type1, type2] = types;
    const type1Effectiveness = typeEffectiveness[0];
    const type2Effectiveness = typeEffectiveness[1];

    // Calculate weaknesses
    type1Effectiveness.double_damage_from.forEach(t => {
      if (!type2Effectiveness.half_damage_from.some(r => r.name === t.name)) {
        weaknesses.add(t.name)
      }
    });
    type2Effectiveness.double_damage_from.forEach(t => {
      if (!type1Effectiveness.half_damage_from.some(r => r.name === t.name)) {
        weaknesses.add(t.name)
      }
    });

    // Calculate resistances
    type1Effectiveness.half_damage_from.forEach(t => {
      if (!type2Effectiveness.double_damage_from.some(r => r.name === t.name)) {
        resistances.add(t.name)
      }
    });

    type2Effectiveness.half_damage_from.forEach(t => {
      if (!type1Effectiveness.double_damage_from.some(r => r.name === t.name)) {
        resistances.add(t.name)
      }
    });

    // Calculate immunities
    type1Effectiveness.no_damage_from.forEach(t => immunities.add(t.name))
    type2Effectiveness.no_damage_from.forEach(t => immunities.add(t.name))

    immunities.forEach(immunity => {
        weaknesses.delete(immunity);
        resistances.delete(immunity);
    })
  }

  return { weaknesses, resistances, immunities };
}


// Example usage
async function getPokemonTypeEffectiveness(id) {
  const types = await getPokeType(id);
  if (types) {
    const { weaknesses, resistances, immunities } = await calculateTypeEffectiveness(types);
    return { 
      'weaknesses': weaknesses, 
      'resistances': resistances, 
      'immunities': immunities 
    }
  }
  return {}
}

function updateDiv(pokemon, weather, message) {
  browserApi.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    browserApi.tabs.sendMessage(tabs[0].id, { type: message, pokemon: pokemon, weather: weather }, (response) => {
      if (response && response.success) {
          console.log('Div updated successfully');
      } else {
        console.error('Failed to update div');
      }
    });
  });
}


function convertPokemonId(pokemonId) {
  const conversionList = {
    2019: 10091,
    2020: 10092,
    2026: 10100,
    2027: 10101,
    2028: 10102,
    2037: 10103,
    2038: 10104,
    2050: 10105,
    2051: 10106,
    2052: 10107,
    2053: 10108,
    2074: 10109,
    2075: 10110,
    2076: 10111,
    2088: 10112,
    2089: 10113,
    2103: 10114,
    2105: 10115,
    2670: 10061,
    4052: 10162,
    4077: 10163,
    4078: 10164,
    4079: 10165,
    4080: 10166,
    4083: 10167,
    4110: 10168,
    4122: 10169,
    4144: 10170,
    4145: 10171,
    4146: 10172,
    4199: 10173,
    4222: 10174,
    4263: 10175,
    4264: 10176,
    4554: 10177,
    4555: 10178,
    4562: 10179,
    4618: 10180,
    6058: 10229,
    6059: 10230,
    6100: 10231,
    6101: 10232,
    6157: 10233,
    6211: 10234,
    6215: 10235,
    6503: 10236,
    6549: 10237,
    6570: 10238,
    6571: 10239,
    6628: 10240,
    6705: 10241,
    6706: 10242,
    6713: 10243,
    6724: 10244,
    8128: 10252,
    8194: 10253,
    8901: 10272
  }
  if (pokemonId in conversionList) {
    return conversionList[pokemonId]
  } else {
    return pokemonId
  }
}

function mapPartyToPokemonArray(party) {
  return party.map(({ species, abilityIndex, nature, ivs }) => ({ species, abilityIndex, nature, ivs }))
}

// message can be either "UPDATE_ALLIES_DIV" or "UPDATE_ENEMIES_DIV"
function appendPokemonArrayToDiv(pokemonArray, arena, message) {
  let frontendPokemonArray = []
  pokemonArray.forEach((pokemon) => {
    const pokemonId = convertPokemonId(pokemon.species)
    let ability = getAbility(pokemonId, pokemon.abilityIndex).then((value) => {
 	ability = value
})
    let weather = {}
    if (arena.weather && arena.weather.weatherType) {
        weather = {
            'type': WeatherType[arena.weather.weatherType],
            'turnsLeft': arena.weather.turnsLeft || 0
        }
    }
    getPokemonTypeEffectiveness(pokemonId).then((typeEffectiveness) => {
      
      console.log("Got pokemon", pokemonId, "ability", ability, "type effectiveness", typeEffectiveness)
      frontendPokemonArray.push({
        'id': pokemon.species,
        'typeEffectiveness': {
          'weaknesses': Array.from(typeEffectiveness.weaknesses), 
          'resistances': Array.from(typeEffectiveness.resistances), 
          'immunities': Array.from(typeEffectiveness.immunities)
        },
        'ivs': pokemon.ivs,
        'ability': ability,
        'nature': Nature[pokemon.nature]
      })
      updateDiv(frontendPokemonArray, weather, message)
    })
  })
}

browserApi.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Happens when loading a savegame or continuing an old run
  if (request.type == 'GET_SAVEDATA') {
    const savedata = request.data
    console.log("Received save data", savedata)
    appendPokemonArrayToDiv(mapPartyToPokemonArray(savedata.enemyParty), savedata.arena, "UPDATE_ENEMIES_DIV")
    appendPokemonArrayToDiv(mapPartyToPokemonArray(savedata.party), savedata.arena, "UPDATE_ALLIES_DIV")
  }
});

browserApi.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.method === 'POST') {
        try {
          let sessionData = JSON.parse(new TextDecoder().decode(details.requestBody.raw[0].bytes))
          console.log("POST Session data:", sessionData)
          if (details.url.includes("updateall")) sessionData = sessionData.session
          appendPokemonArrayToDiv(mapPartyToPokemonArray(sessionData.enemyParty), sessionData.arena, "UPDATE_ENEMIES_DIV")
          appendPokemonArrayToDiv(mapPartyToPokemonArray(sessionData.party), sessionData.arena, "UPDATE_ALLIES_DIV")
        } catch (e) {
            console.error("Error while intercepting web request: ", e)
        }
    }
  },
  {
    urls: ['https://api.pokerogue.net/savedata/update?datatype=1*', 'https://api.pokerogue.net/savedata/updateall']
  },
  ["requestBody"]
)
