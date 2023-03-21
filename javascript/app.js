let click=false;
function clickarow(){
       click=true;
       window.addEventListener('click', function(e){cardSwitching(e);})
       

     }


let countryCode="";
let data1 ="";

function gotoNode(val){
    countryCode=val;
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
     var i = Math.floor((Math.random() * 3));
       
     document.getElementById('header2').style.backgroundImage = "url('"+backgroundImg[i]+"')";
     document.getElementById('header2').style.transition = "all 1s";

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