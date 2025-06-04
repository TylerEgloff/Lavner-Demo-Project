let m = document.getElementById('moon')
let f = document.getElementById('front')
let b = document.getElementById('back')
let s = document.getElementById('star')
window.addEventListener('scroll',function(){
  var value = window.scrollY;
  m.style.left = (value*0.5)+'px';
  m.style.top = -(value*0.5)+'px';
  s.style.top = (value*0.85)+'px';
  b.style.top = value+'px';
})
