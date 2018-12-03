

let pre = document.getElementById('title');
let display = document.getElementById('display');

function doxstopTitleGen(){
  pre.innerHTML = title[Math.floor(Math.random()*title.length)];
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
// input.addEventListener('focusout',()=>{input.value = input.value + 'yyy'});
fakeInput.addEventListener('click',()=>{
  console.log('111')
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
  input.value = '';
  search = [];
  
  for (let name of temp){
    let n = name.charAt(0).toUpperCase() + name.substr(1);
    search.push(n);
  }

  let result = [];

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
  let resultFound = ()=>{
    display.innerHTML = '';
    for(res in result){
      display.innerText= display.innerText +'\n\n' + JSON.stringify(result[res])
      console.log(result[res].GivenName,result[res].Surname,result[res])
    }
  }
  
  let noResult = ()=>{
    console.log('Nothing found');
  }
  
  result ? resultFound() : noResult();

}