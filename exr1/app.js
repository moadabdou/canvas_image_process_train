//inputs 

const  input  = document.getElementById('input'),
       output = document.getElementById('output'), 
       test   = document.getElementById('test')
let    progress = document.getElementById('prog')

//get input value 

test.addEventListener('click' ,  ()=>{
    output.value = nth_prime(input.value)
})

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
        progress.style = `width:${((i+1) * 100) / n}%;`
    } 
    progress.style = ""
	return current; 
}

