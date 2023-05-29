const hue = 360;

function hsl (hue, saturation, lightness) {
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

function palette () {
  let saturation = document.getElementById("saturation").value;
  let lightness = document.getElementById("lightness").value;

  let palette = document.getElementById("palette");
  let cells = palette.getElementsByTagName("td");
  let deltaHue = 360 / cells.length;
    
  for (let i = 0; i < cells.length; i++) {
    let cellHue = i * deltaHue;
    cells[i].style.backgroundColor = hsl(cellHue, saturation, lightness);
  }
}

function selectColor(event) {
  let selectedColor = event.target.style.backgroundColor;
  document.getElementById("selectedColor").style.backgroundColor = selectedColor;
}

let table = document.getElementById("palette");
let tableContent = `<tr>${"<td></td>".repeat(hue)}</tr>`;
table.innerHTML = tableContent;

let saturation = document.getElementById("saturation");
let lightness = document.getElementById("lightness");

hue.oninput = palette;
saturation.oninput = palette;
lightness.oninput = palette;

let cells = table.getElementsByTagName("td");
cells.onclick = x => { selectColor(); };

palette();