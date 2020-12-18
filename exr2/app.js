//important to use  a local server 

const cn = document.querySelector('canvas'),
    ctx = cn.getContext('2d'), 
    input =  document.getElementById('file'),
    W = cn.width , 
    H = cn.height,
    inv = document.getElementById('inv'), 
    reset = document.getElementById('reset') 

let rgb = [0,0,0]

rgb[0] = document.getElementById('r'),
rgb[1] = document.getElementById('g'),
rgb[2] = document.getElementById('b')

// SET image
let  Img 
const url = window.URL || window.webkitURL
input.addEventListener("change" , ()=> {
    Img = new Image()
    Img.src = url.createObjectURL(input.files[0])
    Img.addEventListener('load' , drawImg)
})
reset.addEventListener('click' ,drawImg)

let data ;
function drawImg(){
    ctx.drawImage(Img , 0 ,0 , W , H)
    data = ctx.getImageData(0 ,0 , W , H)
}

function createPx(pxs){
    for (let i = 0; i < pxs.length ; i ++){
        let px = pxs[i]
        ctx.fillStyle = `rgba(${px.clrs[0]} , ${px.clrs[1]} , ${px.clrs[2]})`
        ctx.fillRect(px.x , px.y , 1 ,1)
    }
    spin.style = 'display : none'
}

let w ,
    spin = document.querySelector('.cov span')
function effect(rf){
    spin.style = 'display : inline'
    if (w) {w.terminate() ; drawImg()}
    w = new Worker('worker_img.js')
    w.postMessage({
        rf,
        data : {
            data:data.data ,
            width : data.width ,
            height : data.height
        },
        rgb : rgb.map(c=> c.value)
    })
    w.onmessage = r=> {
        createPx(r.data)
    }
}

inv.addEventListener('click' , ()=>effect())
rgb.forEach(c=>{
    c.addEventListener("input" , ()=> effect(true) )
})