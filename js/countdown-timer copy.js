const timerId = 'timer-next-match'
const timerContainer = document.getElementById(timerId);

const timerClass = 'timer__countdown';

timerContainer.className = timerClass;

const templateContainer = 
`
<div class="item">
  <span class="value">63</span>
  <span class="seprator">:</span>
  <span class="label">label</div> 
</div>
`;

const templateSecContainer = 
`
<div class="item">
  <span class="value">63</span>
  <span class="label">label</div> 
</div>
`;

for(let i=0; i<4; i++){
  if(i==0){
    timerContainer.insertAdjacentHTML("afterbegin",templateSecContainer);
  } else{
    timerContainer.insertAdjacentHTML("afterbegin",templateContainer);
  }
}

timerContainer.children.item(0).classList.add('day');
timerContainer.children.item(1).classList.add('hour');
timerContainer.children.item(2).classList.add('min');
timerContainer.children.item(3).classList.add('sec');


const dayCountContainer = document.querySelector(`#${timerId} .day .value`);
const dayLabelContainer = document.querySelector(`#${timerId} .day .label`);

const hourCountContainer = document.querySelector(`#${timerId} .hour .value`);
const hourLabelContainer = document.querySelector(`#${timerId} .hour .label`);

const minCountContainer = document.querySelector(`#${timerId} .min .value`);
const minLabelContainer = document.querySelector(`#${timerId} .min .label`);

const secCountContainer = document.querySelector(`#${timerId} .sec .value`);
const secLabelContainer = document.querySelector(`#${timerId} .sec .label`);

let makeDualChar = (count)=>{
  let dualChar = count;
  if(count<10){
    dualChar = '0' + count;
  }
  return dualChar;
}


// Set the date we're counting down to
var countDownDate = new Date("june 5, 2022 23:50:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = makeDualChar(Math.floor(distance / (1000 * 60 * 60 * 24)));
  var hours = makeDualChar(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  var minutes = makeDualChar(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
  var seconds = makeDualChar(Math.floor((distance % (1000 * 60)) / 1000));

  // Display the result in the element with id="demo"
  dayCountContainer.innerHTML = days;
  hourCountContainer.innerHTML = hours;
  minCountContainer.innerHTML = minutes;
  secCountContainer.innerHTML = seconds;

  dayLabelContainer.innerHTML = 'days';
  hourLabelContainer.innerHTML = 'hours';
  minLabelContainer.innerHTML = 'mins';
  secLabelContainer.innerHTML = 'secs';

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    timerContainer.innerHTML = "Now It's Time of Game";
  }
}, 1000);