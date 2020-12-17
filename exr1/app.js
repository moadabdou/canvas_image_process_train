//inputs 

const  input  = document.getElementById('input'),
       output = document.getElementById('output'), 
       test   = document.getElementById('test')
let    progress = document.getElementById('prog')

//worker

const w = new Worker('worker_prime.js')

w.addEventListener('message' ,r=> {
	if (r.data.prog){
		progress.style = r.data.prog
	}else if(r.data.end){
		progress.style = ''
	}else{
		output.value = r.data
	}
})

//get input value 

test.addEventListener('click' ,  ()=>{
	w.terminate()
	w.postMessage(input.value)
})


