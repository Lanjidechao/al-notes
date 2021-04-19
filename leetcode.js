/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
	// S[i] means s[0]-s[i] is OK
	// S[i]'s value means the index of p's substr is OK for s[0-i]
	for(var i = 1; i < s.length; i++) {
		S[i] = S[i-1] + findNextIndex(sn,pn)
	}
};

var findNextIndex(sn, pn) {
	var deleted = 0
	while (pn.length >= 3) {
		if (pn[0] === '.' || sn[0] === pn[0]) {
			return deleted * 2
		} else {
			if pn[1] != '*' {
				return false
			}
			pn = pn.substr(2)
			deleted++
		}
	}
	if (pn[0] === '.' || sn[0] === pn[0]) {
		return deleted * 2
	}
	if (pn.length === 2) {
		return false
	}
	if (pn.length === 3) {
		if (pn[1] == '*' && (pn[2] === '.' || sn[0] === pn[2])) {
			return 2 + deleted * 2
		}
	}
	
}
