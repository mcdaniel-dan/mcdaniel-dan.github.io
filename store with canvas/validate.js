function valAge(unchecked, element) {
	if (/^[0-9]$|^[1-9][0-9]$|^[1][0][0-9]$|^[1][1][0-8]$/.test(unchecked))
		element.className = "valid";
	else {
		element.className = "invalid";
	}

}

function valSSN(unchecked, element) {
	if (/^\s*[0-9]{3}\-[0-9]{2}\-[0-9]{4}\s*$/.test(unchecked))
		element.className = "valid";
	else {
		element.className = "invalid";
	}
}

function valPhone(unchecked, element) {
	if (/^(\d{10}|\d{7})|((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/.test(unchecked))
		element.className = "valid";
	else {
		element.className = "invalid";
	}
}

function valCCN(unchecked, element) {
	if (/^\s*[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}|\d{16}\s*$/.test(unchecked))
		element.className = "valid";
	else {
		element.className = "invalid";
	}
}

function valDate(unchecked, element) {
	if (/^\s*([1-9]|[1][0-2])\/([1-9]|[1-2][0-9]|[3][0-1])\/(175[3-9]|17[6-9][0-9]|1[89][0-9]{2}|20[0-9]{2}|2100)\s*$/.test(unchecked))
		element.className = "valid";
	else {
		element.className = "invalid";
	}
}

function valState(unchecked, element) {
	if (/^\s*((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))\s*$/.test(unchecked))
		element.className = "valid";
	else {
		element.className = "invalid";
	}
}

function valZIP(unchecked, element) {
	if (/^\d{5}$/.test(unchecked))
		element.className = "valid";
	else {
		element.className = "invalid";
	}
}

function valMoney(unchecked, element) {
	if (/^\s*\${0,1}((\d+)|(\d{1,3}(,\d{3})+))(\.\d{2})*\s*$/.test(unchecked))
		element.className = "valid";
	else {
		element.className = "invalid";
	}
}

function valName(unchecked, element) {
	if (/^$/.test(unchecked))
		element.className = "invalid";
	else {
		element.className = "valid";
	}
}
