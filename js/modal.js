console.log('Modal');


(function createSelf(){
  
  let moduleExtra = asciiTitle[Math.floor(Math.random()*asciiTitle.length)];
  let moduleTitle = 'About';
  let moduleContent = 
  "Dox-Stop is a website to look up the private information of a individual inspired from a scene in the Netflix miniseries 'Maniac'."
  let moduleContentExtra = "DISCLAIMER: THE RESULTS AND FUNTIONS OF THIS WEBSITE ARE NOT REAL. Doxxing is a EXTREME violation of privacy and should not be done.";

  let self = document.getElementById('modal');

  //fill/background
  let fill = document.createElement('div');
  fill.setAttribute('class','modal-fill');
  
  //Modal Container
  let container = document.createElement('div');
  container.setAttribute('class','modal-container');
  
  //Ascii Art
  let pre = document.createElement('pre');
  let preContent = document.createTextNode(moduleExtra);
  pre.appendChild(preContent);

  //Title
  let h1 = document.createElement('h1');
  let h1Content = document.createTextNode(moduleTitle);
  h1.appendChild(h1Content);

  //Content
  let p = document.createElement('p');
  let pContent = document.createTextNode(moduleContent);
  p.appendChild(pContent);

  //Disclamer
  let p2 = document.createElement('p');
  let p2Content = document.createTextNode(moduleContentExtra);
  p2.appendChild(p2Content);

  hr = document.createElement('hr');
  
  
  fill.appendChild(container);
    container.appendChild(pre);
    container.appendChild(hr);
    container.appendChild(h1);
    container.appendChild(p);
    container.appendChild(p2);

  //Add to screen
  document.body.appendChild(fill);
  fill.style.opacity = '1';

  fill.addEventListener('click',(c)=>{
    if(c.target !== fill)return;
    document.body.removeChild(fill);
    document.body.removeChild(self);
  })
})()



//Modal Paragraph


