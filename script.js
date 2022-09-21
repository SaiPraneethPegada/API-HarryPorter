document.body.innerHTML = `
<nav id="topSection" class="navbar navbar-dark bg-dark sticky-top">
  <div class="header container-fluid align-center flex-column ">
    <div class="text-center text-white"><img src='logo.PNG' alt='logo'></div>
    <div class="searchfield">
      <input type="text" class="p-1 m-2 rounded-2" style="width:30vw" placeholder="Search by name" onkeyup='search()'>
    </div>
  </div>
</nav>
<div id='maincontainer' class='d-flex p-4 gap-3 m-0 gb-5 flex-row flex-wrap justify-content-evenly text-center' ></div>
`;

let url = "https://hp-api.herokuapp.com/api/characters";
// API has 490 characters data, loading and searching it was taking time...

// Getting Data from API endpoint.
const getData = async () => {
    try {
        maincontainer.innerHTML = "";
        const data = await fetch(`${url}`);
        const hpCharacters = await data.json();
        console.log(hpCharacters);
        hpCharacters.map((character, index) => {
            if (index >= 0 && index < 25) {
                displayData(character);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

getData();

// Rendering the Data from Api to UI
const displayData = (obj) => {
    maincontainer.innerHTML += `<div class="card mb-5 p-3 rounded-3" >
    <img src=${obj.image} alt=${obj.name} class="h-50 w-50 mx-0 d-block mx-auto rounded-2 my-2"> <hr/>
    <p class="title"><strong> ${obj.name}</strong></p>
    <p>Actor:<i> ${obj.actor} </i></p>
    <p>Gender: ${obj.gender}</p>
    <p>Species: ${obj.species}</p>
    <p>Wand-wood: ${obj.wand.wood}</p>
    <p>Wand-Core: ${obj.wand.core}</p>
    <p>House: ${obj.house}</p>
    <p>D.O.B: ${obj.dateOfBirth}</p>
    </div>`;
};

// Search functionality by name.
async function search() {
    try {
        let searchValue = document.querySelector("input").value.toLowerCase();
        maincontainer.innerHTML = "";
        const data = await fetch(`${url}`);
        const hpCharacters = await data.json();
        for (obj of hpCharacters) {
            let searchName = obj.name.toLowerCase();
            // let searchActor = obj.actor.toLowerCase();
            if (searchName.includes(searchValue)) {
                displayData(obj);
            } else {
                continue;
            }
        }
    } catch (error) {
        console.log(error);
    }
}
