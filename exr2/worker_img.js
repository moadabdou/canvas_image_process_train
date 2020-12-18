
function setEffects(rgb,clrs){
    let r = [] 
    for(let i = 0 ; i < 3 ;i++ ){
        if (clrs[i] >= rgb[i]){
            r.push(clrs[i] - rgb[i])
        }else {
            r.push(clrs[i])
        }
    }
    return r
}

function invert(data ,rgb, reg){
    let pxs = []
    for(let y = 0 ; y <= data.width ; y ++){
        for(let x = 0 ; x <= data.height ; x ++){
            let dem = (y * 4 * data.width) + (x * 4)
            let R = data.data[dem] ,
                G = data.data[dem + 1], 
                B = data.data[dem + 2] , 
                clrs
            if (reg == true){
                clrs = setEffects(rgb,[R,G,B])
            }else {
                R = 255 - R, 
                G = 255 - G,
                B = 255 - B    
            }
            pxs.push({
                x ,
                y,
                clrs : clrs || [R,G,B] 
            })
        }
    }
    postMessage(pxs)
}

onmessage = r=> {
     invert(r.data.data,r.data.rgb, r.data.rf)
}
