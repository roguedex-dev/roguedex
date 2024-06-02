function _getNatureStatMultiplier(nature, stat) {
	switch (stat) {
	    case Stat.ATK:
	        switch (nature) {
	            case Nature.LONELY:
	            case Nature.BRAVE:
	            case Nature.ADAMANT:
	            case Nature.NAUGHTY:
	                return 1.1;
	            case Nature.BOLD:
	            case Nature.TIMID:
	            case Nature.MODEST:
	            case Nature.CALM:
	                return 0.9;
	        }
	        break;
	    case Stat.DEF:
	        switch (nature) {
	            case Nature.BOLD:
	            case Nature.RELAXED:
	            case Nature.IMPISH:
	            case Nature.LAX:
	                return 1.1;
	            case Nature.LONELY:
	            case Nature.HASTY:
	            case Nature.MILD:
	            case Nature.GENTLE:
	                return 0.9;
	        }
	        break;
	    case Stat.SPATK:
	        switch (nature) {
	            case Nature.MODEST:
	            case Nature.MILD:
	            case Nature.QUIET:
	            case Nature.RASH:
	                return 1.1;
	            case Nature.ADAMANT:
	            case Nature.IMPISH:
	            case Nature.JOLLY:
	            case Nature.CAREFUL:
	                return 0.9;
	        }
	        break;
	    case Stat.SPDEF:
	        switch (nature) {
	            case Nature.CALM:
	            case Nature.GENTLE:
	            case Nature.SASSY:
	            case Nature.CAREFUL:
	                return 1.1;
	            case Nature.NAUGHTY:
	            case Nature.LAX:
	            case Nature.NAIVE:
	            case Nature.RASH:
	                return 0.9;
	        }
	        break;
	    case Stat.SPD:
	        switch (nature) {
	            case Nature.TIMID:
	            case Nature.HASTY:
	            case Nature.JOLLY:
	            case Nature.NAIVE:
	                return 1.1;
	            case Nature.BRAVE:
	            case Nature.RELAXED:
	            case Nature.QUIET:
	            case Nature.SASSY:
	                return 0.9;
	        }
	        break;
	}
	return 1;
}

class PokeRogueUtils {
	static getNatureDescription(natureIndex) {
	    let ret = "(-)";
	    let increasedStat = null;
	    let decreasedStat = null;
	    for (let stat of Object.values(Stat).filter(v => !isNaN(parseInt(v.toString()))).map(v => parseInt(v.toString()))) {
	        const multiplier = _getNatureStatMultiplier(natureIndex, stat);
	        if (multiplier > 1)
	            increasedStat = stat;
	        else if (multiplier < 1)
	            decreasedStat = stat;
	    }
	    if (increasedStat && decreasedStat)
	        ret = `(+${Stat[increasedStat]}/-${Stat[decreasedStat]})`;
	    else if (increasedStat)
	        ret = `(+${Stat[increasedStat]})`;
	    else if (decreasedStat)
	        ret = `(-${Stat[decreasedStat]})`;
	    return ret;
	}
}