document.addEventListener('DOMContentLoaded',()=>{
  const cityInput=document.getElementById("city-input");
  const weatherBtn=document.getElementById("get-weather-btn")
  const weatherInfo=document.getElementById("weather-info")
  const cityName=document.getElementById("city-name")
  const temperature=document.getElementById("temperature")
  const description=document.getElementById("description")
  const errorMessage=document.getElementById("error-message")
  const API_KEY="563c74006127ba49e4a88bba82b2f683"

  weatherBtn.addEventListener('click',async()=>{
    
    const city=cityInput.value.trim();
    if(!city)
      return;

    else{
      try {

        const value=await fetchData(city)
        displayWeather(value);
        
      } catch (error) {
        showError();
      }



    

    }
    
    






  })

  async function fetchData(city)
  {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response=await fetch(url);
    if(!response.ok)
    {
      throw new Error( "City Not Found");
    }
    else
    {
      const res=await response.json();
      return res
    }

  }

  function displayWeather(weatherData){ 
    const {name,main,weather,sys}=weatherData;
    cityName.textContent=`${name},${sys.country}`
    temperature.textContent=`Temperature : ${main.temp}`;
    description.textContent=`Weather : ${weather[0].description}`;

    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden')
    
    changeBackground(weather[0].main)
    

  }

  function showError(){
  weatherInfo.classList.add('hidden')
  errorMessage.classList.remove('hidden');
  }

  function changeBackground(weatherCondition) {
    const body = document.body;
    console.log(weatherCondition);
    

    // Define a mapping for weather conditions to background images or colors
    const backgrounds = {
      Clear: "url('clear.jpg')",
      Clouds: "url('cloud.jpg')",
      Rain: "url('rain.jpg')",
      Snow: "url('snow.jpg')",
      Thunderstorm: "url('thunder.jpg')",
      Mist: "url('mist.jpg')",
      Default: "#121212"
    };

    // Select the background based on weather condition
    const background = backgrounds[weatherCondition] || backgrounds.Default;
    // Apply the background
    body.style.transition = "opacity 0.5s ease-in-out, background 0.5s ease-in-out"; // Smooth transition for opacity and background
    body.style.opacity = "0"; // Set opacity to 0 for fade-out effect
    setTimeout(() => {
      body.style.backgroundImage = background; 
      body.style.backgroundSize = "cover";
      body.style.backgroundPosition = "center";// Change the background image
      body.style.opacity = "1"; // Fade back in
    }, 500); // Ensure it waits for the fade-out effect
  }
})