let inp=document.getElementById("input")

function sends(){
    
    getwether(inp.value)
    inp.value=""
}


const api="ed90ed94d49476502c92327bc04c0be0"
function getwether(location){

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}`)
.then(res=>res.json())
.then(result=>addweather(result)

)

}

function addweather(data){

console.log(data)

    let temp=c(data.main.temp)
    let feel=c(data.main.feels_like)
    let min=c(data.main.temp)
    let max=c(data.main.temp)
    let preture=data.main.pressure
    let humidity=data.main.humidity
    let speed=data.wind.speed
    let city=data.name
      
    let _feel=document.getElementById("feel")
    let _f=document.createElement("div")
    _f.innerHTML=`<div>${feel}C°</div>`
    _f.classList.add("size")
    _feel.appendChild(_f)
    
   

    let _min=document.getElementById("min")
    let _m=document.createElement("div")
    _m.innerHTML=`<div>${min}C°</div>`
    _m.classList.add("size")
    _min.appendChild(_m)


    let _max=document.getElementById("max")
    let _mx=document.createElement("div")
    _mx.innerHTML=`<div>${max}C°</div>`
    _mx.classList.add("size")
    _max.appendChild(_mx)


    let _humid=document.getElementById("humidity")
    let _h=document.createElement("div")
    _h.innerHTML=`<div>${humidity}%</div>`
    _h.classList.add("size")
    _humid.appendChild(_h)


    let _presures=document.getElementById("presure")
    let _p=document.createElement("div")
    _p.innerHTML=`<div>${preture}p</div>`
    _p.classList.add("size")
    _presures.appendChild(_p) 


    let _wind=document.getElementById("wind")
    let _w=document.createElement("div")
    _w.innerHTML=`<div>${speed}m/s</div>`
    _w.classList.add("size")
    _wind.appendChild(_w)
    
    let _temp=document.getElementById("tempreture")
    _temp.innerHTML=`${temp}°`
    let _city=document.getElementById("city")
    _city.innerHTML=`${city}`

    mapboxgl.accessToken = 'pk.eyJ1IjoiZmF0ZW1lMTIzNDUiLCJhIjoiY2xmNXFmaXlkMG51ZzQ2cjBnbDV6MjdobCJ9.W3PtBuEy6TMdWfTRASf67A';
    var map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [data.coord.lon, data.coord.lat], // starting position [lng, lat]
    zoom: 9 // starting zoom
    })
    map.on('load', () => {
        // Load an image from an external URL.
        map.loadImage(
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        (error, image) => {
        if (error) throw error;
         
        // Add the image to the map style.
        map.addImage('cat', image);
         
        // Add a data source containing one point feature.
        map.addSource('point', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
        {
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': [data.coord.lon, data.coord.lat]
        }
        }
        ]
        }
        });
         
        // Add a layer to use the image to represent the data.
        map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point', // reference the data source
        'layout': {
        'icon-image': 'cat', // reference the image
        'icon-size': 1
        }
        });
        }
        );
        });
    inp.addEventListener("change",function(){
        _f.innerHTML=""
        _m.innerHTML=""
        _mx.innerHTML=""
        _p.innerHTML=""
        _w.innerHTML=""
        _h.innerHTML=""
    })

}

function c(t){
    return parseInt(t-273.15)

}