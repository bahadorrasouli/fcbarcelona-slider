function TimerCoundown (date, timerId, additionalClass, timerClass="timer__countdown"){

  this.timerId = timerId;

  this.timerContainer = document.getElementById(timerId);

  this.timerClass = timerClass;

  this.timerContainer.className = timerClass;

  
  if(additionalClass){

    this.additionalClass = additionalClass;

    this.timerContainer.classList.add(additionalClass);

  }

  this.templateContainer = 
  `
  <div class="item">
    <span class="value">63</span>
    <span class="seprator">:</span>
    <span class="label">label</div> 
  </div>
  `;

  this.templateSecContainer =  
  `
  <div class="item">
    <span class="value">63</span>
    <span class="label">label</div> 
  </div>
  `;

  this.addTemplate();
  this.addChildrenClass();

  this.dayCountContainer = document.querySelector(`#${timerId} .day .value`);
  this.dayLabelContainer = document.querySelector(`#${timerId} .day .label`);

  this.hourCountContainer = document.querySelector(`#${timerId} .hour .value`);
  this.hourLabelContainer = document.querySelector(`#${timerId} .hour .label`);

  this.minCountContainer = document.querySelector(`#${timerId} .min .value`);
  this.minLabelContainer = document.querySelector(`#${timerId} .min .label`);

  this.secCountContainer = document.querySelector(`#${timerId} .sec .value`);
  this.secLabelContainer = document.querySelector(`#${timerId} .sec .label`);


  // Set the date we're counting down to
  this.countDownDate = new Date(date).getTime();

  this.runTimer();

}

TimerCoundown.prototype.addTemplate= function(){
  
  for(let i=0; i<4; i++){
    if(i==0){
      this.timerContainer.insertAdjacentHTML("afterbegin",this.templateSecContainer);
    } else{
      this.timerContainer.insertAdjacentHTML("afterbegin",this.templateContainer);
    }
  }

}

TimerCoundown.prototype.addChildrenClass = function(){

  this.timerContainer.children.item(0).classList.add('day');
  this.timerContainer.children.item(1).classList.add('hour');
  this.timerContainer.children.item(2).classList.add('min');
  this.timerContainer.children.item(3).classList.add('sec');

}


TimerCoundown.prototype.makeDualChar = function(count){
  let dualChar = count;
  if(count<10){
    dualChar = '0' + count;
  }
  return dualChar;
}

TimerCoundown.prototype.runTimer = function(){
  let _this = this;
  // Update the count down every 1 second
  let x = setInterval(function() {

    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = _this.countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = _this.makeDualChar(Math.floor(distance / (1000 * 60 * 60 * 24)));
    let hours = _this.makeDualChar(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = _this.makeDualChar(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = _this.makeDualChar(Math.floor((distance % (1000 * 60)) / 1000));

    // Display the result in the element with id="demo"
    _this.dayCountContainer.innerHTML = days;
    _this.hourCountContainer.innerHTML = hours;
    _this.minCountContainer.innerHTML = minutes;
    _this.secCountContainer.innerHTML = seconds;

    _this.dayLabelContainer.innerHTML = 'days';
    _this.hourLabelContainer.innerHTML = 'hours';
    _this.minLabelContainer.innerHTML = 'mins';
    _this.secLabelContainer.innerHTML = 'secs';

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      _this.timerContainer.innerHTML = "Now It's Time of Game";
    }
  }, 1000);
  
}

