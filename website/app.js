/* Global Variables */
let zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
// Personal API Key for OpenWeatherMap API
const ApiKey = "&appid=e29f76a67e79023696f70e3e74da99a7&units=metric";
const url = `https://api.openweathermap.org/data/2.5/weather?`;
// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", () => { generateWeb() });
/* Function called by event listener */
function generateWeb() {
    console.log("server is running");
    GETWebAPIData(url, ApiKey, zip)
        .then(data => {
            POSTdata('/data', {
                temp: (data.main.temp).toFixed(2),
                date: newDate,
                content: feelings.value,
            })
        })
        .then(() => { GETProjectData() })
        .catch((error) => { console.log(error); })
};
/* Function to GET Web API Data*/
async function GETWebAPIData(url, ApiKey, zip) {
    const request = await fetch(`${url}q=${zip.value}${ApiKey}`);
    try {
        const main = await request.json();
        return main;
    } catch (error) {
        console.log(error);
    }
};
/* Function to POST data */
async function POSTdata(url = '', data = {}) {
    const request = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    try {
        const main = await request.json();
        return main;
    } catch (error) {
        console.log(error);
    }
};
/* Function to GET Project Data */
async function GETProjectData() {
    const request = await fetch('/all');
    try {
        const main = await request.json();
        date.innerHTML = `date : ${main.date}`;
        content.innerHTML = `I am feeling ${main.content}`;
        temp.innerHTML = `temperature : ${main.temp} °C`;
    } catch (error) {
        console.log(error);
    }
};