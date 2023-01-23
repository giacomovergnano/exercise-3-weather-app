/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '1880783b539afcd68e7c6daa24f2265d&units=standard';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event Listener to Generate Button on App Webpage 
document.getElementById('generate').addEventListener('click', () => {
  const zipCode = document.getElementById('zip').value;
  const catchFeelings = document.getElementById('feelings').value;
  getWeather(baseURL, zipCode, apiKey)  
  .then(function(data){

      // console.log("data : ");
      console.log(data);
      postData('/clientAddedData', {date:newDate, temp:data.main.temp, content:catchFeelings})
  })
});


// Function To Get Web API data
const getWeather = async (baseURL, zipCode, apiKey) => { 
  try {
      const apiResponse = await fetch(`${baseURL}${zipCode}&appid=${apiKey}`);
  // Transform into JSON
  const data = await apiResponse.json();
  // console.log("getWeather : " )
  // console.log(data)
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
  // console.log(request);
 try{
  // Transform into JSON
  const finalData = await request.json();
  // console.log("finalData");
  // console.log(finalData);
  //Get Elements of Entries in HTML by ID and Update It in the Web App
  document.getElementById('date').innerHTML = 'Date : ' + finalData.date ; 
  document.getElementById('temp').innerHTML = 'Temperature now is : ' + Math.round(finalData.temp) + '&degC'; 
  document.getElementById('content').innerHTML = 'Your feeling today is : ' + finalData.content ;

 }catch(error){
  console.log("error:", error);
  // appropriately handle the error
 };

};