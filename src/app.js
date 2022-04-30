import { createElement } from 'lwc';
import xApp from 'x/app';




const elm = createElement('x-app', { is: xApp });
document.body.appendChild(elm);