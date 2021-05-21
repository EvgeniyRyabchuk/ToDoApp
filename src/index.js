import './styles/styles.scss';

import {Entry} from './models';

const a = new Entry('some text', true);
document.querySelector('#field').append(a.elem);
const b = new Entry('some text', false);
document.querySelector('#field').append(b.elem);
const c = new Entry('some text', true);
document.querySelector('#field').append(c.elem);