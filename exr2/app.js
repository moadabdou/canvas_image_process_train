//important to use  a local server 

const cn = document.querySelector('canvas'),
    ctx = cn.getContext('2d'), 
    W = cn.width , 
    H = cn.height,
    inv = document.getElementById('inv'), 
    reset = document.getElementById('reset') 

let rgb = [0,0,0]
rgb[0] = document.getElementById('r'),
rgb[1] = document.getElementById('g'),
rgb[2] = document.getElementById('b')


const Img = new Image()
Img.src = "img.jpg"
Img.addEventListener('load' , drawImg)

let data ;
function drawImg(){
    ctx.drawImage(Img , 0 ,0 , W , H)
    data = ctx.getImageData(0 ,0 , W , H)
}


function createPx(x , y, clrs){
    ctx.fillStyle = `rgba(${clrs[0]} , ${clrs[1]} , ${clrs[2]})`
    ctx.fillRect(x , y , 1 ,1)
}


function setEffects(clrs){
    let r = [] 
    for(let i = 0 ; i < 3 ;i++ ){
        if (clrs[i] >= rgb[i].value ){
            r.push(clrs[i] - rgb[i].value)
        }else {
            r.push(clrs[i])
        }
    }
    return r
}

function invert(reg){
    for(let y = 0 ; y <= data.width ; y ++){
        for(let x = 0 ; x <= data.height ; x ++){
            let dem = (y * 4 * data.width) + (x * 4)
            let R = data.data[dem] ,
                G = data.data[dem + 1], 
                B = data.data[dem + 2] , 
                clrs
            if (reg == true){
                clrs = setEffects([R,G,B])
            }else {
                R = 255 - R, 
                G = 255 - G,
                B = 255 - B    
            }
            createPx(x,y, clrs || [R,G,B])
        }
    }
}

inv.addEventListener('click' , invert)
reset.addEventListener('click' ,drawImg)
rgb.forEach(c=>{
    c.addEventListener("input" , ()=> invert(true) )
})