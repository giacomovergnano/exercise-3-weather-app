/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '1880783b539afcd68e7c6daa24f2265d&units=standard';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


// Event Listener to Generate Button on App Webpage 
document.getElementById('generate').addEventListener('click', () => {
  const zipCode = document.getElementById('zip').value;
  const catchFeelings = document.getElementById('feelings').value;
  getWeather(baseURL, zipCode, apiKey)  
  .then(function(data){

      // console.log("data : ");
      console.log(data);
      postData('/clientData', {date:newDate, temp:data.main.temp, content:catchFeelings})
  })
});


// Function To Get Web API data
const getWeather = async (baseURL, zipCode, apiKey) => { 
  try {
      const apiResponse = await fetch(`${baseURL}${zipCode}&appid=${apiKey}`);
  // Transform into JSON
  const data = await apiResponse.json();

  return data;
  }
  catch(error) {
    console.log("error:", error);
    // appropriately handle the error
  }
};


// Function To Post data
const postData = async ( url = '', data = {})=> {
  // console.log("postberfore : ");
  // console.log(data);
  const response = await fetch (url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
  try {
      updateUI()

  }catch(error) {
      console.log("error:", error);
      // appropriately handle the error
  };
};


// Function to get projectdata and update UI for WebApp
const updateUI = async () => {
 const request = await fetch('/allData');
  // console.log("request : ");
  console.log(request);
 try{
  // Transform into JSON
  const allData = await request.json();
  console.log(allData);
  //Get Elements of Entries in HTML by ID and Update It in the Web App
  document.getElementById('date').innerHTML = 'Date : ' + allData.date ; 
  document.getElementById('temp').innerHTML = 'Temperature now is : ' + allData.temp; 
  document.getElementById('content').innerHTML = 'Your feeling today is : ' + allData.content ;

 }catch(error){
  console.log("error:", error);
  // appropriately handle the error
 };

};