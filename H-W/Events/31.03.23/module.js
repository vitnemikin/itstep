import { AddProduct } from "./windowMod.js";

document.querySelector('.btn').onclick = () => {
    const add = new AddProduct();
    add.show();
};