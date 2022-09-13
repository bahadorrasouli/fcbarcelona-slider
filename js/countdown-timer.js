function TimerCountdown (setting){

  // for use or Not of New keyword 
  if(!(this instanceof TimerCountdown)){
    return new TimerCountdown (setting);
  }
  
  // setup object
  this.setSetting = {
    timerId :'timer-next-match',
    date : "april 22, 2022 18:30:33",
    color : 'gradient',
    timerClass : "timer__countdown",
    firstItem: 'day',
    endItem: 'sec',
    type: 'normal',
    seprator: ':',
    dateItems: ['day', 'hour', 'min', 'sec'],
    subItems: ['value','seprator','label'],
    labels: [day='Day', hour='Hour', min='Min', sec='Sec'],
  }
  
  if(setting){
    this.setSetting = {...this.setSetting,...setting}
    if(document.querySelector('#'+ setting.timerId).getAttribute("date")){
      this.setSetting.date = document.querySelector('#'+ setting.timerId).getAttribute("date");
    }

    if(setting.size){
      this.setSetting = {...this.setSetting,...setting.size}
      document.querySelector('#'+ setting.timerId).style.fontSize = setting.size
    }
  }

  this.firstItem = this.setSetting.firstItem;
  this.endItem = this.setSetting.endItem;
  this.dateItems = this.setSetting.dateItems;
  this.dateItems = this.customizeDateItems()

  this.date = this.setSetting.date;

  this.timerId = this.setSetting.timerId;

  this.timerContainer = document.getElementById(this.setSetting.timerId);

  this.timerClass = this.setSetting.timerClass;

  this.labels = this.setSetting.labels;

  this.seprator = this.setSetting.seprator;

  this.timerContainer.className = this.timerClass;

  this.subItems = this.setSetting.subItems;

  if(this.setSetting.color){

    this.color = this.setSetting.color;

    this.timerContainer.classList.add(this.setSetting.color);

  }
  
  this.type = this.setSetting.type;  
  this.timerContainer.classList.add(this.type);

  this.makeTemplate();
  
  
  // Set the date we're counting down to
  this.countDownDate = new Date(this.date).getTime();
  
  
  this.runTimer()
  
}


TimerCountdown.prototype.dateItemsArrayLength = function(){
  
  let firstItemIndex = this.dateItems.indexOf(this.firstItem);
  let endItemIndex = this.dateItems.indexOf(this.endItem);

  return length = (endItemIndex - firstItemIndex) + 1;

}

TimerCountdown.prototype.customizeDateItems = function(){

  let firstItemIndex = this.dateItems.indexOf(this.firstItem);
    
  this.dateItems.splice(0, firstItemIndex);

  let endItemIndex = this.dateItems.indexOf(this.endItem);

  this.dateItems.splice( endItemIndex + 1 , this.dateItems.length);

  return this.dateItems;
  
}

TimerCountdown.prototype.customizeLabelItems = function(){

  let firstItemIndex = this.dateItems.indexOf(this.firstItem);
    
  this.labels.splice(0, firstItemIndex);

  let endItemIndex = this.dateItems.indexOf(this.endItem);

  this.labels.splice( endItemIndex + 1 , this.dateItems.length);

  return this.labels;
  
}

TimerCountdown.prototype.makeElement = function(className, elementType='div'){
  let element = document.createElement(elementType);
  element.classList.add(className);
  return element;
}

TimerCountdown.prototype.makeTemplate = function(){
  let items;
  let timer = this.timerContainer
  let id = this.timerId
  let length = this.dateItemsArrayLength();
  let subItems;
  
  if(this.type == 'normal'){
  
    for(let i=0; i<length; i++){

      timer.appendChild(this.makeElement('item'));
      items = document.querySelectorAll(`#${id} .item`);
      items[i].classList.add(this.dateItems[i]);
      
      subItems = ['value','seprator','label'];

      if(i == length-1){
        subItems = ['value','label'];
      }
      
      for(let j=0; j<subItems.length; j++){
        items[i].appendChild(this.makeElement(subItems[j]));
      }

    }

  }

  else if(this.type == 'model-0'){
    
    timer.appendChild(this.makeElement('big-item'))
    timer.appendChild(this.makeElement('small-item'))

    let bigItem = document.querySelector(`#${id} .big-item`);
    let smallItem = document.querySelector(`#${id} .small-item`);

    smallItem.appendChild(this.makeElement('container'));

    let smallItemContainer = document.querySelector(`#${id} .small-item .container`);

    for(let i=0; i<length; i++){

      if(i==0){
        
        bigItem.appendChild(this.makeElement('item'));
      } else {
        smallItemContainer.appendChild(this.makeElement('item'));
      }

      items = document.querySelectorAll(`#${id} .item`);
      items[i].classList.add(this.dateItems[i]);


      if(i==0){
        this.subItems = ['value'];
      }
      if(i == 0 || i == length-1){
        this.subItems = ['value','label'];
      } else {
        this.subItems = ['value','seprator','label'];
      }

      for(let j=0; j<this.subItems.length; j++){
        items[i].appendChild(this.makeElement(this.subItems[j]));
        
        let subItems = document.querySelector(`#${id} .item .${this.subItems[j]}`);
        
        if(i == 0 && this.subItems[j]=='label'){
          // subItems.remove();
        }
      }

      
    }

  }
  
}

TimerCountdown.prototype.makeDualChar = function(count){
  let dualChar = count;
  if(count<10){
    dualChar = '0' + count;
  }
  return dualChar;
}

TimerCountdown.prototype.checkZero = function(item){
  if(item == 0 || item == '0' || item == '00'){
    return true;
  } else {
    return false;
  }
}

TimerCountdown.prototype.addClassZero = function(item){
  item.classList.add('zero');
}

TimerCountdown.prototype.selectContainer = function(item, type){

  let selectContainerList = document.querySelectorAll(`#${this.timerId} .${item} .${type}`);
  return selectContainerList;

}

TimerCountdown.prototype.addTimeValues = function(item, type){
  
  let list = this.selectContainer(item, type);
  
  let times = this.makeTimeValues();
  
  let key;
  for (let keys of Object.keys(times)) {
    
    if(keys == item){
      key = keys
    }
  }
    
  for(let i=0; i<list.length; i++){
    list[i].innerHTML = times[key];
  }

}

TimerCountdown.prototype.addLabelValues = function(item, type){
  
  let list = this.selectContainer('item', type);
  
  let labels = this.customizeLabelItems();
  
  

  for(let i=0; i<list.length; i++){
    list[i].innerHTML = labels[i];

  }
  
}

TimerCountdown.prototype.addSepratorValues = function(item, type){
  
  let list = this.selectContainer(item, type);
  
  let seprator = this.makeSepratorValues();
  
      
  for(let i=0; i<list.length; i++){
    list[i].innerHTML = seprator;
  }
  
}

TimerCountdown.prototype.makeTimeValues = function(){

  let timeNow = new Date().getTime();
  let distance = this.countDownDate - timeNow;

  let times = {
    day: this.makeDualChar(Math.floor(distance / (1000 * 60 * 60 * 24))),
    hour: this.makeDualChar(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    min: this.makeDualChar(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
    sec: this.makeDualChar(Math.floor((distance % (1000 * 60)) / 1000)),
  }

  if(distance <= 0){
    times.end = true;
  }

  return times;  
}

TimerCountdown.prototype.makeLabelValues = function(){

  return this.labels;

}

TimerCountdown.prototype.makeSepratorValues = function(){

  return this.seprator;

}

TimerCountdown.prototype.runTimer = function(){
  let _this = this;
  // Update the count down every 1 second
  let x = setInterval(function() {

    // Get today's date and time
    

    // Find the distance between now and the count down date
    

    // Time calculations for days, hours, minutes and seconds
    
    
    let time = _this.makeTimeValues();

        
    for(let i=0; i<_this.customizeDateItems().length; i++){
      
      _this.addTimeValues(_this.customizeDateItems()[i], 'value');
      _this.addSepratorValues(_this.customizeDateItems()[i], 'seprator');
      _this.addLabelValues(_this.customizeDateItems()[i], 'label');

    }
    

    // for(let i=0; i<_this.timerContainer.children.length; i++){
    //   if(_this.checkZero(_this.timerContainer.children[i].children[0].innerText)){
    //     _this.addClassZero(_this.timerContainer.children[i]);
    //   } else {
    //     break;
    //   }
    // }
  
    // If the count down is finished, write some text
    if (time.end) {
      clearInterval(x);
      _this.timerContainer.innerHTML = "Now It's Time of Game";
    }


  }, 1000);
  
}

