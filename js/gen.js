(function (){
  let self = document.getElementById('gen');
  let script1 = document.createElement('script');
  script1.setAttribute('src','js/doxxed.js');
  document.body.appendChild(script1);

  let script2 = document.createElement('script');
  script2.setAttribute('src','js/asciiTitle.js');
  document.body.appendChild(script2);
  
  let script3 = document.createElement('script');
  script3.setAttribute('src','js/index.js');
  document.body.appendChild(script3);

  document.body.removeChild(self);
})();