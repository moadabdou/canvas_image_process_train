//inputs 

const  input  = document.getElementById('input'),
       output = document.getElementById('output'), 
       test   = document.getElementById('test')
let    progress = document.getElementById('prog')

//worker 
let w

function listen_toworker(){
	w.addEventListener('message' ,r=> {
		if (r.data.prog){
			progress.style = r.data.prog
		}else if(r.data.end){
			progress.style = ''
		}else{
			output.value = r.data
		}
	})
}

//get input value 

test.addEventListener('click' ,  ()=>{
	//worker
	if (w) w.terminate()
	w = new Worker('worker_prime.js')
	listen_toworker()
	w.postMessage(input.value)
})


