const WeatherApi = "824e6500dd976b459e243c527ea45aa3";

const body = document.querySelector('body');
const widget = document.querySelector('.main-box');
const city = document.querySelector('.city');
const date = document.querySelector('.date');
const cel = document.querySelector('.cel');
const winfo = document.querySelector('.w-info');
const wicon = document.querySelector('.wicon');
const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const searchSelf = document.querySelector('.search-self');
const errText = document.querySelector('.err-txt');

const convertKelvin = function (temp) {
    const number = parseFloat(temp);
    return number - 273.15;
};

const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
const today = new Date();
const currentTime = today.getHours();
if(currentTime >= 6 && currentTime <= 17){
    body.style.backgroundColor = "#F3E7EF";
} else if(currentTime >= 18 && currentTime <= 20){
    body.style.backgroudColor = "#86667B";
} else {
    body.style.backgroudColor = "#2B1A25";
}

const getCityWeather = async function(input){
    errText.textContext = '';
    date.textContent = today.toLocaleDateString('en-UK', dateOptions);
    try{
        const base = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${WeatherApi}`;
        const data = await fetch(base);
        if(data.status === 404) throw new error('Invalid')
            const dat = await data.json();
            console.log(dat);
            widget.classList.remove('hidden');
            
            city.textContent = dat.name + ', ' + dat.sys['country'];
            cel.textContent = Math.floor(convertKelvin(dat.main['temp']));
            winfo.textContent = dat.weather[0]['description'];

            const iconcode = dat.weather[0]['icon'];
            const iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`;
            wicon.src = iconUrl;
    }
    catch(err){
        widget.classList.add('hidden');
        errText.textContent = err.message;
    }
};

searchBtn.addEventListener('click' , function (){
    const cityQuery = cityInput.value;

    getCityWeather(cityQuery);
})