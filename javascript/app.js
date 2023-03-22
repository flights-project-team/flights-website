let click=false;
function clickarow(){
       click=true;
       window.addEventListener('click', function(e){cardSwitching(e);})
       

     }


let countryCode="";
let data1 ="";

function gotoNode(val){
  localStorage.setItem('countryCode',JSON.stringify(val));
  window.location.href = "bookNow.html";
}

window.onload = function () {
  // Array of Images

   var backgroundImg=["../assets/images/aipth.jpg",
                      "../assets/images/aipth (4).jpg",
                      "../assets/images/aipth (2).jpg",
                      "../assets/images/aipth (1).jpg"]

     setInterval(changeImage, 3000);
    function changeImage() {   
     var i = Math.floor((Math.random() * 4));
       
     document.getElementById('header2').style.backgroundImage = "linear-gradient(rgb(0, 0, 0), rgba(249, 249, 248, 0), rgba(249, 249, 248, 0),rgb(255, 255, 255)),url('"+backgroundImg[i]+"')";
     document.getElementById('header2').style.transition = "all 2s";

   }
 }

const CARD_PEN_OFFSET = 10, //displacement of the cards
      CARD_SWITCH_RANGE = '40%';


const CARD_ARRAY = [...document.querySelectorAll('div[class*="card"]')];
/* Do not change this */
const COUNT_OF_CARDS = CARD_ARRAY.length;
let last_element = CARD_ARRAY[CARD_ARRAY.length - 1];
let isMoving = false;


let offsetArray = [], offset = 0, l = CARD_ARRAY.length;
for (let i = 1; i <= l; i++) {
  offsetArray.push(offset);
  offset += CARD_PEN_OFFSET;
}

setCardOffset();
function setCardOffset() {
  CARD_ARRAY.forEach(function(item, index){
    item.style.zIndex = Math.abs(index - COUNT_OF_CARDS);
    item.style.transform = `translate(${offsetArray[index]}px, ${offsetArray[index]}px)`;
  });
}

/******************************************************************/

function cardSwitching(e) {
  let animationObject = {}, previousSibling, scrolling = '';
console.log(animationObject)
  /* return when you scroll during the animation of a card */
  if (isMoving) return;

  if ((e.keyCode !== 38 && e.keyCode !== 40) && (e.keyCode !== undefined)) return;

  for (let index of CARD_ARRAY) {
    if ((parseInt(window.getComputedStyle(index).zIndex) === CARD_ARRAY.length) || (parseInt(index.style.zIndex) === CARD_ARRAY.length)) {

      /*switch the rearmost card */
      if (click) { //deltaY < 0 -> scrolling up
        previousSibling = index.previousElementSibling;
        if (previousSibling === null) previousSibling = last_element;
      }

      animationObject = click ? previousSibling : e.deltaY > 0 || e.keyCode === 40 ? index : '';
      animationObject.style.transform = `translate(0px, -${CARD_SWITCH_RANGE})`;
      scrolling = click ? 'up' : e.deltaY > 0 || e.keyCode === 40 ? 'down' : '';
      isMoving = true;
    }
  }

  if (animationObject !== undefined) {
    animationObject.addEventListener('transitionend', function(){
      if (scrolling === 'down') {
        animationObject.style.zIndex = 0;
        animationObject.style.transform = `translate(${offsetArray[COUNT_OF_CARDS]}px, ${offsetArray[COUNT_OF_CARDS]}px)`;
        offsetSwitch(scrolling);
      }

      else if (scrolling === 'up'){
        offsetSwitch(scrolling);
        animationObject.style.zIndex = COUNT_OF_CARDS;
        animationObject.style.transform = `translate(0px, 0px)`;
      }
      scrolling = '';
    }, {once: true });
  }
}

function offsetSwitch(scrolling) {
  for (let index of CARD_ARRAY) {
    index.style.zIndex = scrolling === 'down' ? parseInt(index.style.zIndex) + 1 : parseInt(index.style.zIndex) - 1;
    let offsetIndex = Math.abs(parseInt(index.style.zIndex) - COUNT_OF_CARDS);
    index.style.transform = `translate(${offsetArray[offsetIndex]}px, ${offsetArray[offsetIndex]}px)`;

    index.addEventListener('transitionend', () => isMoving = false, {once: true });
  }
}

if (click === true) {
  animationObject.style.zIndex = 0;
  animationObject.style.transform = `translate(${offsetArray[COUNT_OF_CARDS]}px, ${offsetArray[COUNT_OF_CARDS]}px)`;
 
}

/* ----------------------------- */

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '35d500b444msh7f4e5bc5924241fp19626fjsn5a7987613d58',
		'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
	}
};

const url = 'https://aerodatabox.p.rapidapi.com/flights/number/DL47?withAircraftImage=false&withLocation=false'

async function fetchData(){
    try{

        let response = await fetch(url,options);
        let data = await response.json();

        return data;
    }

    catch(error){

        console.error(error);

    }
}

fetchData();

// render function
 async function render() {
    let flights = await fetchData();
    console.log(flights);
    
    flights.forEach(flight => {
      // const countries = Object.values(flight.content.results.places)
      // console.log(countries[1].iata)
       bookingArr = [flight.departure.scheduledTimeLocal.toString().slice(11,16),flight.departure.scheduledTimeLocal.toString().slice(0,11), "4H", "JOD 208",localStorage.getItem('countryCode')]
      let html='';
      let htmlSegment = `<li>
                        <div class="detailsCard">
                            <div class="flightInfo">
                                <div class="airline"><img src="../assets/images/emirates.png" alt=""></div>
                                <div class="time">
                                    <div>
                                        <h4>${flight.departure.scheduledTimeLocal.toString().slice(11,16)} - ${flight.arrival.scheduledTimeLocal.toString().slice(11,16)}</h4>
                                    </div>
                                    <div>
                                        <p>${flight.airline.name}</p>
                                    </div>
                                </div>
                                <div class="duration">
                                    <div>
                                        <h4>4 hr 30 min</h4>
                                    </div>
                                    <div>
                                        <p>AMM - ${localStorage.getItem('countryCode').slice(1,4)}</p>
                                    </div>
                                </div>
                                <div class="stops">
                                    <div>
                                        <h4>${flight.arrival.terminal} Stops</h4>
                                    </div>
                                    <div>
                                        <p>${flight.number}</p>
                                    </div>
                                </div>
                                <div class="price">
                                    <div>
                                        <h4>JOD 208</h4>
                                    </div>
                                    <div>
                                        <p>round trip</p>
                                    </div>
                                </div>
                                <div class="bookNowBtnContainer">
                                <div>
                                    <button onclick="bookNow()" class="bookNowBtn">Book Now</button>
                                </div>
                            </div>
                    
                            </div>
                        </div>
                    </li>`  
  
      html += htmlSegment;
      
      let container = document.querySelector('.mainList');
      container.innerHTML = html;

    })

 }

  render();
 

  function bookNow() {
    localStorage.setItem('flights',JSON.stringify(bookingArr));
    window.location.href= "cart.html";
  }

  /* -------- */
  const createTable = (flights) =>{
    console.log(flights);
    return `
    <h1>My Bookings</h1>
    <table>
    <tr>
        <th>Destination</th>
        <th>Time</th>
        <th>Date</th>
        <th>Price</th>
    </tr>
    <tbody>
    ${createTableData(flights)}
    </tbody>
</table>
    `
  }

 const createTableData = (flights)=>{
    let html = '';
    console.log(flights);
    html += `
    <tr>
    <td>
    "AMM" - ${flights[4]}
    </td>
    <td>${flights[0]}</td>
    <td>${flights[1]}</td>
    <td>208JOD</td>
</tr>
    `
    
    return html;
 }
  

  function getBookings(){
    const storedData = localStorage.getItem('flights');
    const bookings = JSON.parse(storedData);

    document.getElementById('table1').innerHTML = `

    <div>${createTable(bookings)}</div>
    
    `

  }
  getBookings();
