const firstPageContainer = document.querySelector('.firstPageContainer');
const textPopupBackground = document.querySelector('.textPopupBackground');

// Fetch and store api-key
const getKey = async () => {
    //console.log('getKey called'); //Logs when getKey is called
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'POST',  //'POST' to get the key)    
    }) 
        const data = await response.json();
        //console.log(data); // Log the whole object
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

    const textPopup = document.querySelector('.textPopup');
    textPopup.remove();
    firstPageContainer.style.display = 'flex';
}

/*****Function for handling data from planet array */
const showPlanetData = (singlePlanetData) => {
   firstPageContainer.style.display = 'none';
    textPopupBackground.style.display = 'flex';
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

    let text = `Rotationshastighet: ${singlePlanetData.rotation}<br><br> Dagtemperatur: ${singlePlanetData.temp.day}&#8451<br><br>Nattemperatur: ${singlePlanetData.temp.night}&#8451<br><br> Distans från solen: ${singlePlanetData.distance} km<br><br>Planetens månar: ${singlePlanetData.moons.join(', ')}`;

    p.innerHTML = text;

    /******Adding p in textPopup-div*/
    textPopup.appendChild(h2);
    textPopup.appendChild(h3);
    textPopup.appendChild(p);
    /********Showing the text centered***/
    textPopup.style.display = 'flex';

            /*******adding textPopup-div to the document*/
    document.querySelector('.textPopupBackground').appendChild(textPopup);
    //document.popupBackground.appendChild(textPopup);

            /**********Create close-button */
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('closeButton');
    textPopup.appendChild(closeButton);

    const haloPlanetEl = document.querySelectorAll('.haloPlanet');
    haloPlanetEl.forEach(element => element.style.display = 'block')
            /*********Eventlistener for the closebutton */
    closeButton.addEventListener('click', () => {
        haloPlanetEl.forEach((element) => {
            element.style.display = 'none'
        })
        removeTextPopup();  
    })
}

/********Show background for textPopup ***/
const showPopupBackground = (textPopupBackground) => {
    
}
/*document.body.classList.add('textPopupBackground');

/**********Selecting all the planets */
const handleClickedPlanets = (planetData) => {
    const textPopupBackground = document.querySelector('.textPopupBackground');
    textPopupBackground.style.display = 'flex'
;    const ellipseNodeList = document.querySelectorAll('.ellipse'); //hämtar en nodeList
 const ellipseEl = Array.from(ellipseNodeList); // Convert buttons NodeList to an array

 // variabeln index håller koll på vilket element vi är på i arrayen.
 ellipseEl.forEach((singleElement, index) => { //loopar igenom planeterna
     singleElement.addEventListener('click', () => {
        const style = window.getComputedStyle(singleElement); 
        const singlePlanetData = planetData.bodies[index]; 
        //console.log(style.backgroundColor);
        colorChange(style.backgroundColor);
         showPlanetData(singlePlanetData);
        });
    });
}

// Color function
const colorChange = (newColor) => {
    const haloPlanets = Array.from(document.querySelectorAll('.haloPlanet')); // 

    haloPlanets.forEach((haloPlanet) => {
        haloPlanet.style.backgroundColor = newColor;
    })
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
