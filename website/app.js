/*Global Variables*/
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=bebf25590a6f1c6cf54960d56fda2b17';
const countryCode = ',us';
const fahrenheit = '&units=imperial';

//Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+d.getDate()+'.'+d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zipCode = document.getElementById('zip').value;    
    const feelings = document.getElementById('feelings').value;

   getData(baseURL+zipCode+countryCode+apiKey+fahrenheit)
    .then(function(weather) {        
            return postData('/addForecast', {temperature: weather.main.temp, date: newDate, user_response: feelings})       
        }
    )
    .then(function(post_response) {
            return getData('/get')
        }
    )
    .then(function(get_tempRes) {
            const dispDate = get_tempRes.date;
            const dispTemp = get_tempRes.temperature; 
            const dispFeelings = get_tempRes.user_response;             
            document.getElementById('date').innerHTML = 'Today`s Date: ' + dispDate;
            document.getElementById('temp').innerHTML = 'Current Weather in your ZipCode: ' + dispTemp + '% F';
            document.getElementById('content').innerHTML = ' Users feelings: ' + dispFeelings;
        }
    )
}


const postData = async (url = '', data = {})=>{
     console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};


const getData = async (url = '')=>{
    const response = await fetch(url);

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};