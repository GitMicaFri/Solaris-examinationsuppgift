// Fetch and store api-key

const getKey = async () => {
    //console.log('getKey called'); //Logs when getKey is called
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'POST',  //'POST' to get the key)    
    }) 
        const data = await response.json();
        console.log(data); // Log the whole object
        //console.log(data.key);  // Log the key ( solaris-i0jmhtjgqKZhp6Hl )before returning it
        return data.key;   
}
// getKey(); // Calls the function

// Fetch and store planet-data
const fetchData = async (apiKey) => {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
        method: 'GET',  // to get the data (before this, I used 'POST)
        headers: {'x-zocom': apiKey} // Got the key after POST-method   
    }) 
        const planetData = await response.json();
        return planetData; 
}

const removeTextPopup = () => {
    document.querySelector('.firstPageContainer').style.display = 'flex';
    document.querySelector('.textPopupBackground').style.display = 'none';
    const textPopup = document.querySelector('.textPopup');
    textPopup.remove();
}

/*****Function for handling data from planet array */
const showPlanetData = (singlePlanetData) => {
    document.querySelector('.firstPageContainer').style.display = 'none';
    document.querySelector('.textPopupBackground').style.display = 'block';
        if (!singlePlanetData) {
            console.log('singlePlanetData is undefined!');
            return;
        }
    /********create a new div adding class 'textPopup'*/ 
    const textPopup = document.createElement('div');
    textPopup.classList.add('textPopup'); 
    textPopup.style.display = 'block';

    /***********create new div p for adding text*/
    const h2 = document.createElement('h2')
    h2.textContent = singlePlanetData.name;

    const h3 = document.createElement('h3')
    h3.textContent = singlePlanetData.latinName;

    const p = document.createElement('p');
    p.textContent = 'Här är lite information om planeten.';

    let text = `Rotationshastighet: ${singlePlanetData.rotation}<br> Dagtemperatur: ${singlePlanetData.temp.day} <br>Nattemperatur: ${singlePlanetData.temp.night} Distansen från solen är: ${singlePlanetData.distance}<br>Planetens månar: ${singlePlanetData.moons.join(', ')}`;

    p.innerHTML = text;

    /******Adding p in textPopup-div*/
    textPopup.appendChild(h2);
    textPopup.appendChild(h3);
    textPopup.appendChild(p);
    /********Showing the text centered***/
    textPopup.style.display = 'flex';

            /*******adding textPopup-div to the document*/
    document.querySelector('.textPopupBackground').appendChild(textPopup);
    document.popupBackground.appendChild(textPopup);

            /**********Create close-button */
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('closeButton');
    textPopup.appendChild(closeButton);

            /*********Eventlistener for the closebutton */
    closeButton.addEventListener('click', () => {
        removeTextPopup();
    })
}

/********Show background for textPopup ***/
const showPopupBackground = (textPopupBackground) => {
    
}
/*document.body.classList.add('textPopupBackground');

/**********Selecting all the planets */
const handleClickedPlanets = (planetData) => {
 const ellipseNodeList = document.querySelectorAll('.ellipse'); //hämtar en nodeList
 const ellipseEl = Array.from(ellipseNodeList); // Convert buttons NodeList to an array
            console.log(ellipseEl); 

 // variabeln index håller koll på vilket element vi är på i arrayen.
 ellipseEl.forEach((singleElement, index) => { //loopar igenom planeterna
     singleElement.addEventListener('click', () => {
            console.log('Planet clicked!');
            console.log(planetData);
            console.log(index);
            console.log(planetData.bodies[index]);
            console.log(planetData.bodies.length); 
            console.log(ellipseEl.length);      
         const singlePlanetData = planetData.bodies[index]; 
         showPlanetData(singlePlanetData);
        });
    });
}

/****** Await all resources to load, before javascript is executed */
window.onload = async function(){
 /**** 1. Fetch api-key
  * 2. Fetch planet-data
  * 3. Handeling click on planets
  * 4. Handeling closing of textPopup.
 */
const apiKey = await getKey();
const planetData = await fetchData(apiKey);
handleClickedPlanets(planetData);
};
