import {Form} from "./form.js";
import {Graphs} from "./graphs.js"

const select = document.querySelector('#select');
const graph = new Graphs();
const alert = new Form();

document.querySelector('#form').onclick = () => alert.show();
select.onclick = () => graph.redistribution(select.value);