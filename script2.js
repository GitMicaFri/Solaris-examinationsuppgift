
/*************************************** */
// A parameter is a coin slot which enables the function to do something.
// An argument is the coin you put in that slot, which determinses what is done

// Example: A function which repeats your name 10 times
// function repeatName(name) {  // name = parameter
    //return name.repeat(10)
//}
//repeatName("Mickan")  //"MickanMickanMickan..." = argument

/*
*************************** */
//example: 
/*
const myPromise = new Promise((resolve, reject) => {
    const error = false;
    if (!error) {
        resolve("Yes! resolved promise!")
    } else {
        reject("No, rejected the promise.");
    }
})
console.log(myPromise);
//*************************** */
//********Thenables************* */
/*
myPromise.then(value => {
   return value + 1; 
})
.then(newValue => {
    console.log(newValue);
})
.catch(err => {
    console.error(err);
})
*/

/**************************** */
/*
const myNextPromise = new Promise((resolve, reject) =>{
   setTimeout(function(){
    resolve("myNextPromise resolved!");
   }, 3000);

   myNextPromise.then(value => {
    console.log(value);
   });

   myPromise.then(value => {
    console.log(value);
   });
})
*/

//***Pending***** */
/*const users = fetch("https://jsonplaceholder.typicode.com/users");
console.log(users); // shows promise pending in the log.
fetch("https://jsonplaceholder.typicode.com/users")
.then(response => {
    return response.json();
})
.then(data => {
    data.forEach(user => {
        console.log(user);
    })
})
*/

/*********ASYNC & AWAIT************* */
/*
const myUsers = {
    userList:[]
}

const myCoolFunction = async () => {
    const response = await fetch ("https://jsonplaceholder.typicode.com/users");
    const jsonUserData = await response.json();
    // console.log(jsonUserData); // This logs the whole list of 10 people and their belongings
    return jsonUserData;
}

// myCoolFunction(); // We call the function above

const anotherFunc = async() => { // This function...
    const data = await myCoolFunction(); // ...awaits the coolFunction to complete
    // console.log(data);
    myUsers.userList = data; // This is instead of the console.log above.
    console.log(myUsers.userList);  // If we put the console.log from below inside the function instead, it will work.
}
anotherFunc(); // We get the same result as above, because these are chained. Awaiting the coolFunction before logging the data.
console.log(myUsers.userList);  // 1:We still get an empty array, since it is still waiting to get the data. 2: But when we put this log inside the function above, it still logs the empty array first, and then the complete list.
*/

// Example workflow function

const getAllUserEmails = async () => {

    const response = await fetch ("https://jsonplaceholder.typicode.com/users");
    const jsonUserData = await response.json();

    const userEmailArray = jsonUserData.map(user => { // Her we are filtering out only the email.
        return user.email;
    });

    console.log(userEmailArray);
}
getAllUserEmails();



//callbacks
//function firstFunction(parameters, callback) {
    // do stuff
//    callback();
//} // AKA "callback hell because of repetition and long nested code". Replaced by PROMISES.

// PROMISES
// 3 states: pending, fulfilled, rejected
// Promises delivers async code, and JS is syncronous (doing one thing at a time). Promises can act in 3 different ways (or: you go away, and I will catch up when I´m finished with my task).
//


/******Alize *****/ 
/*fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com', {
  headers: {
    'x-zocom': 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

const planets = document.querySelectorAll('.planet');


/************** Chatgpt:*/
/*
planets.forEach(planet => {
  planet.addEventListener('click', async () => {
    const planetId = planet.id; // Get the ID of the clicked planet
    const response = await fetch(`https://api-url.com/planets/${planetId}`);
    const data = await response.json();
    
    const popup = document.getElementById('popup');
    popup.innerHTML = data.description; // Assuming the API returns a 'description' field
    popup.style.display = 'block';
  });
});
*/
