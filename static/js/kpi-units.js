(function(){var s=document.getElementById('value_type');if(!s)return;var m={percent:'%',number:'',currency:'ر.س'};
function u(){var x=m[s.value]||'';document.querySelectorAll('[data-unit-suffix]').forEach(function(e){e.textContent=x});
document.querySelectorAll('[data-unit-label]').forEach(function(e){e.textContent=x?'('+x+')':''});}
s.addEventListener('change',u);u();})();
