

//check is it prime 

function is_prime (nb) {
	for (let i = 2; i <= Math.sqrt (nb); i ++) { 
		if (nb% i == 0) { 
			return false; 
		} 
	} 
	return true; 
}
//nth prime 
function nth_prime (n) { 
	let current = 1 
	for (let i = 0; i <n; i ++) {
		do { 
            current ++; 
        } while (! is_prime (current)); 
        postMessage({
            prog : `width:${((i+1) * 100) / n}%;`
        })
    } 
    postMessage({
        end :  true
    })
	return current; 
}

onmessage = n => {
    postMessage(nth_prime(n.data))
}