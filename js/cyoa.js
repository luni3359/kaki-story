var div = document.getElementById('gamebody');
var a = document.getElementById('title');

setInterval(() => {
a.innerText = `${div.offsetWidth}px, ${div.offsetHeight}px`;
}, 500);

var x = document.getElementsByTagName('td');

for (let i = 0; i < x.length; i++) {
    let div = document.createElement('div');
    div.innerText = x[i].innerText;
    x[i].innerText = '';
    x[i].appendChild(div);
}

var w = document.getElementById('content');
w.addEventListener('')
