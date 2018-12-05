
let history = [];
let pre = document.getElementById('asciiTitle');
let resultDisplay = document.getElementById('resultDisplay');
let artDisplay = document.getElementById('artDisplay');


// (function doxxed(){
//   let script1 = document.createElement('script');
//   script1.setAttribute('src','js/doxxed.js');
//   document.body.appendChild(script1);
//   let script2 = document.createElement('script');
//   script2.setAttribute('src','js/asciiTitle.js');
//   document.body.appendChild(script2);
// })();

document.getElementById('asciiArt').innerHTML=asciiArt[2];

function doxstopTitleGen(){
  pre.innerHTML = asciiTitle[Math.floor(Math.random()*asciiTitle.length)];
};

pre.addEventListener('click', ()=>{
  doxstopTitleGen();
})

doxstopTitleGen();

let input = document.getElementById('input');
let searchBtn = document.getElementsByTagName('button')[0];
let randomSearchBtn = document.getElementsByTagName('button')[1];

document.body.focus();

let fakeInput = document.getElementById('fakeInput');

fakeInput.addEventListener('click',()=>{
  fakeInput.style.visibility = 'hidden';
  input.style.visibility = 'visible';
  input.focus();
  input.value = ''});

input.addEventListener('blur',()=>{
  if(input.value) return
  fakeInput.style.visibility = 'visible';
  input.style.visibility = 'hidden';
  fakeInput.value = '_'});

input.addEventListener('keydown',(key)=>{
  if(key.key !== 'Enter' || !input.value) return;
  doxSearch(input.value);
})

searchBtn.addEventListener('click',()=>{
  if(!input.value) return;
  doxSearch(input.value);
})

randomSearchBtn.addEventListener('click',()=>{
  randomDox();
})

function doxSearch(val){
  if(!val) return;

  let temp = val.replace(/\s+/g, " ").toLowerCase().split(' ');
  let result = [];
  search = [];
  input.value = '';

  history.push(temp);
  
  for (let name of temp){
    let n = name.charAt(0).toUpperCase() + name.substr(1);
    search.push(n);
  }


  for (let id in search){
    let find = search[id];
    for(let dox in doxxed){
      let given = doxxed[dox].GivenName;
      let sur = doxxed[dox].Surname;
      if(find === given || find === sur) result.push(doxxed[dox]);
    }
  }
  searchResult(result);
}

function randomDox(){
  let search = doxxed[Math.floor(Math.random()*doxxed.length)];
  searchResult([search]);
}

function searchResult(result){
  artDisplay.style.visibility = 'hidden';
  resultDisplay.innerHTML = '';

  let resultFound = ()=>{
    for(res in result){
      console.log(result[res].GivenName,result[res].Surname,result[res]);
      renderitem(result[res]);
    }
  }
  
  let noResult = ()=>{
    console.log('No Result');
    artDisplay.style.visibility = 'visible';
  }
  
  result[0] ? resultFound() : noResult();
}


function openAbout(){
  let aboutModal = document.createElement('script');
  aboutModal.id = 'modal';
  aboutModal.setAttribute('src','js/modal.js');
  document.body.appendChild(aboutModal);
}

document.getElementById('about').addEventListener('click',()=>openAbout());
// openAbout();

function renderitem(obj){
  // input = JSON.stringify(input);
  let item = document.createElement('div');
  item.setAttribute('class','resultItem');

  let itemFieldContainer = document.createElement('div');
  itemFieldContainer.setAttribute('class','resultItem-fieldContainer');
  
  let itemContainer = document.createElement('div');
  itemContainer.setAttribute('class','resultItem-Container');

  let itemImg = document.createElement('img');
  itemImg.setAttribute('class','resultItem-Img');

  for(let prop in obj){
    console.log(prop, obj[prop]);
    let infoField = makeItemField(prop, obj[prop]);
    itemFieldContainer.appendChild(infoField);
  }

  itemContainer.appendChild(itemImg);
  itemContainer.appendChild(itemFieldContainer);

  item.appendChild(itemContainer);
  resultDisplay.appendChild(item);
}

function makeItemField(fieldName,info){
  let field = document.createElement('p');
  let content = document.createTextNode(`${fieldName}: ${info}`);
  field.appendChild(content);
  field.setAttribute('class',`${fieldName} resultItem-field`);
  return field;
}