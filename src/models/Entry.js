class Entry {
    static maxId = 0;

    constructor(text, isChecked = false) {
        this.id = `entry_${Entry.maxId++}`;
        this.text = text; 
        this.isChecked = isChecked;
        this.elem = this.createElement();
    }
    
    createElement() {
        const pattern = document.querySelector('#cb_pattern');

        const elem = pattern.cloneNode(true);

        elem.removeAttribute('id');
        elem.querySelector('input').id = this.id;
        elem.querySelector('input').checked = this.isChecked;
        elem.querySelector('label').for = this.id;
        elem.querySelector('label').textContent = this.text;

        return elem;
    }

}

export default Entry;