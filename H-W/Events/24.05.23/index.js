$(document).ready(function() {
    let inp = $('input');
    let line = $('#in');

    for (let i = 0; i < inp.length; i++) inp[i].oninput = loading;

    function loading (ev) {
        if (line.width() === 400 || line.text() >= 100) return;

        if (ev.target.value.length !== 1) {
            ev.isCheked = true;
            return;
        }

        if (ev.isCheked) return;

        let newWidth = line.width() + (400 / inp.length);
        let newTextContent = Number(line.text()) + 25;

        line.animate({
            width: newWidth,
            textContent: newTextContent
        }, 500);

        if (newTextContent >= 100) {
            inp.off('input', loading);
        }
    }
});