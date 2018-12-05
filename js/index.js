
let history = [];
let pre = document.getElementById('asciiTitle');
let resultDisplay = document.getElementById('resultDisplay');
let artDisplay = document.getElementById('artDisplay');

document.getElementById('asciiArt').innerHTML=asciiArt[2];

function doxstopTitleGen(){
  let index = Math.floor(Math.random()*asciiTitle.length)
  pre.innerHTML = asciiTitle[index];
  if(index===0) pre.style.fontSize = 'calc(5px + .5vw)';
  else pre.style.fontSize = 'calc(7px + .5vw)';
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

  let itemImg = document.createElement('svg');
  itemImg.setAttribute('class','resultItem-svg');
  
  
  for(let prop in obj){
    let infoField = makeItemField(prop, obj[prop]);
    itemFieldContainer.appendChild(infoField);
  }

  let svgMale = '<svg iconCreditTo="https://www.flaticon.com/authors/icomoon" x="0px" y="0px" width="448px" height="448px" viewBox="0 0 448 448" style="enable-background:new 0 0 448 448;" xml:space="preserve"><g> <path d="M279.412,311.368c-11.055-1.759-11.307-32.157-11.307-32.157s32.484-32.158,39.564-75.401 c19.045,0,30.809-45.973,11.76-62.148C320.227,124.635,343.91,8,224,8c-119.911,0-96.225,116.635-95.432,133.662 c-19.047,16.175-7.285,62.148,11.761,62.148c7.079,43.243,39.564,75.401,39.564,75.401s-0.252,30.398-11.307,32.157 C132.976,317.034,0,375.686,0,440h224h224C448,375.686,315.023,317.034,279.412,311.368z"/></g></svg>';
  let svgFemale = '<svg iconCreditTo="https://www.flaticon.com/authors/pixel-perfect" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M421.184,384.96l-81.728-20.437l-4.715-18.88c56.384-9.493,85.397-26.389,86.677-27.136c3.029-1.771,4.907-4.992,5.163-8.491c0.235-3.499-1.323-6.933-4.075-9.131C422.123,300.587,384,269.099,384,160c0-92.011-21.525-138.667-64-138.667h-6.293C298.389,6.528,286.891,0,256,0c-40.085,0-128,40.299-128,160c0,109.099-38.123,140.587-38.4,140.8c-2.837,2.133-4.437,5.525-4.267,9.067c0.192,3.563,2.112,6.763,5.163,8.597c1.28,0.768,30.016,17.749,86.741,27.221l-4.715,18.837L90.795,384.96C37.333,398.336,0,446.165,0,501.333C0,507.221,4.779,512,10.667,512h490.667c5.888,0,10.667-4.821,10.667-10.709C512,446.165,474.667,398.336,421.184,384.96z"/></g></g></svg>';

  itemImg.innerHTML = obj.Gender === 'male' ? svgMale : svgFemale;

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