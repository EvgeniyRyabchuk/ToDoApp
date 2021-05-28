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

        let elem = pattern.cloneNode(true);
        elem.removeAttribute("id"); 
        elem.querySelector('input').id = this.id;
        elem.querySelector('input').checked = this.isChecked;
        elem.querySelector('label').setAttribute("for", this.id);
        elem.querySelector('label').textContent = this.text;
        elem.querySelector('.check-namer').dataset.for = this.id; 
        elem.querySelector('.check-delete-img').dataset.for = this.id; 
        //console.dir(elem.querySelector('#check-namer')); 
        console.log(elem.querySelector('label'))
        return elem;
    }

}

export default Entry;