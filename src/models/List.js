class List {
    
    static maxId = 0; 

    constructor(title)
    {
        this.id = `list_${List.maxId++}`; 
        this.title = title; 
        this.entryList = []; 
        this.elem = this.createElement(); 
    }

    createElement()
    {
        let button = document.createElement('button');
        button.id = this.id; 
        button.className = "btn btn-primary border-1 border-dark"; 
        button.style.marginRight = "5px";
        button.textContent = this.title; 
        return button; 
    }

    addEntry(entry)
    {
        this.entryList.push(entry); 
    }

    deleteEntry(id)
    {
        for(let i = 0; i < this.entryList.length; i++)
        {
            if(this.entryList[i].id == id)
                this.entryList.splice(i, 1);  
        }
    }
}

export default List;