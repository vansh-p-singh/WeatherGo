let searchBtn=document.querySelector(".searchBtn");
let citySearch=document.querySelector("#citySearch")
let cityName=document.querySelector(".cityName");
let latitude=document.querySelector(".latitude");
let longitude=document.querySelector(".longitude");
let cityTemp=document.querySelector(".cityTemp");
let seaLevel=document.querySelector(".seaLevel");
let humidity=document.querySelector(".humidity");
let windSpeed=document.querySelector(".windSpeed");
let weatherIcon=document.querySelector(".cityDiv2");
let weathers={"Clear":`<i class="fa-solid fa-sun"></i>`,"Rain":`<i class="fa-solid fa-cloud-rain"></i>`,"Snow":`<i class="fa-solid fa-snowflake"></i>`}
// Major Cities
let majorTemp=document.querySelectorAll(".majorTemp");

window.addEventListener("load",()=>{
    majorFetch();
    let xr=new XMLHttpRequest();
    xr.open("get",`https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=645e6e6439f6f185371f144755805e20`);
    xr.send();
    xr.onload=()=>{
        let x=JSON.parse(xr.response);
        cityName.innerText=x.name;
        latitude.innerText=x.coord.lat;
        longitude.innerText=x.coord.lon;
        cityTemp.innerHTML=Math.floor(x.main.temp - 273) + `&deg;`;
        seaLevel.innerText=x.main["pressure"];
        humidity.innerText=x.main.humidity;
        windSpeed.innerText=x.wind.speed + " m/s";
        if(weathers[x.weather["0"].main]!=undefined){
            weatherIcon.innerHTML=weathers[x.weather["0"].main];
        }
        else{
            weatherIcon.innerHTML=`<i class="fa-solid fa-sun"></i>`;
        }
    }
})
let fetchTemp=(city)=>{
    let js=new XMLHttpRequest();
    js.open("get",`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=645e6e6439f6f185371f144755805e20`);
    js.send();
    js.onload=()=>{
        let x=JSON.parse(js.response);
        if(x.cod=="200"){
            cityName.innerText=x.name;
            latitude.innerText=x.coord.lat;
            longitude.innerText=x.coord.lon;
            cityTemp.innerHTML=Math.floor(x.main.temp - 273) + `&deg;`;
            seaLevel.innerText=x.main["pressure"];
            humidity.innerText=x.main.humidity;
            windSpeed.innerText=x.wind.speed + " m/s";
            if(weathers[x.weather["0"].main]!=undefined){
                weatherIcon.innerHTML=weathers[x.weather["0"].main];
            }
            else{
                weatherIcon.innerHTML=`<i class="fa-solid fa-sun"></i>`;
            }
        }
        else if(x.cod=="400"){
            noResult();
        }
    }
}

let majorFetch=()=>{
    for(let i=0;i<majorTemp.length;i++){
        let xreq=new XMLHttpRequest();
        xreq.open("get",`https://api.openweathermap.org/data/2.5/weather?q=${majorTemp[i].getAttribute("data-majorCity")}&appid=645e6e6439f6f185371f144755805e20`);
        xreq.send();
        xreq.onload=()=>{
            let ans=JSON.parse(xreq.response);
            majorTemp[i].innerHTML=Math.floor(ans.main.temp-273) + `&deg;`;
        }
    }
}

let noResult=()=>{
    cityName.innerText="Invalid Input";
    latitude.innerText="";
    longitude.innerText="";
    cityTemp.innerHTML="";
    seaLevel.innerText="";
    humidity.innerText="";
    windSpeed.innerText="";
    weatherIcon.innerHTML="";
}
searchBtn.addEventListener("click",()=>{
    fetchTemp(citySearch.value);
    majorFetch();
})
window.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        fetchTemp(citySearch.value);
    }
    majorFetch();
})

// Search Hamburger
let searchHam=document.querySelector(".searchHamburger");
let searchDiv=document.querySelector(".search");
let hamClick=()=>{
    if(searchHam.innerHTML==`<i class="fa-solid fa-magnifying-glass"></i>`){
        searchHam.innerHTML=`<i class="fa-solid fa-xmark"></i>`;
        searchDiv.style.display="flex";
        document.querySelector("header>h3").style.display="none";

    }
    else{
        searchHam.style.display="block";
        searchHam.innerHTML=`<i class="fa-solid fa-magnifying-glass"></i>`;
        searchDiv.style.display="none";
        document.querySelector("header>h3").style.display="block";
    }
}
searchHam.addEventListener("click",hamClick);