const words = ['Hello', 'World', 'I', 'am', 'a', 'web', 'developer', 'and', 'I', 'am', 'a', 'student', 'of', 'the', 'University', 'of', 'Bucharest'];
var pool = [];
let speed = 0;
let correct = 1;
let wrong = 0; 
let time = 0;
let interval;

function toggle() {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition');
    }, 650);

    if (document.documentElement.getAttribute('light-theme') === 'dark') {
        document.documentElement.setAttribute('light-theme', 'light');
    } else {
        document.documentElement.setAttribute('light-theme', 'dark');
    }
}

function loadText () {
    document.querySelector('#text').innerHTML = '';
    for (let i = 0; i < 25; i++) {
        text = document.querySelector('#text');
        var p = document.createElement('P');
        var word = words[Math.floor(Math.random() * words.length)];
        p.innerText = word;
        p.className = 'text-word';
        pool.push(word);
        text.appendChild(p);
    }
}

loadText();

document.querySelector('#input').addEventListener('keyup', (e) => {
    if (e.key == ' ') {
        if (speed == 0) {
            interval = setInterval(updateWPM, 1000);
        }

        typed = document.querySelector('#input').value.slice(0, -1);
        speed += typed.length;
        document.querySelector('#input').value = '';

        var elem = document.getElementsByClassName('text-word')[0];
        if (pool[0] == typed) {
            elem.style.color = 'green';
            elem.className = '';
            correct++;
        } else {
            elem.style.color = 'red';
            elem.className = '';
            wrong++;
        }
        pool.shift();

        var elems = document.getElementsByClassName('text-word');
        if (elems.length == 0) {
            loadText();
            return;
        }
    }
});

function updateWPM() {
    time++;
    var words = Math.round((speed/5)/(time/60));
    document.querySelector('#wpm').innerText = Math.round(words) + ' WPM';
}

function updateACC() {
    var acc = Math.round((correct/(correct+wrong))*100);
    document.querySelector('#acc').innerText = acc + '% ACC';
}

setInterval(updateACC, 10);

function reset() {
    correct = 1;
    wrong = 0;
    speed = 0;
    pool = [];
    time = 0;
    document.querySelector('#wpm').innerText = '0 WPM';
    document.querySelector('#input').value = '';
    loadText();
    clearInterval(interval);
}