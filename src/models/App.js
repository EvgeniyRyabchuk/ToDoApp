class App {

    static cur_focus_list; 
    static lists = []; 
    
    static addList(list)
    {
        if(App.lists.length == 0)
        {
            App.cur_focus_list = list.id; 
            list.elem.disabled = true; 
        }

        App.lists.push(list); 
    }
    
    static getCurList()
    {
        for(let i of App.lists)
        {
            if(i.id == App.cur_focus_list)
                return i; 
        }
    }

    static getCurListByIndex()
    {
        for(let i of App.lists)
        {
            if(i.id == App.cur_focus_list)
                return i; 
        }
    }

    static getEntryById(entryId)
    {
        const curList = this.getCurList(); 
        for(let e of curList.entryList)
        {
            if(e.id == entryId)
            {
                return e; 
            }
        } 
        
    }

    // получить список по id 
    static getListById(listId)
    {
        for(let i of App.lists)
        {
            if(i.id == listId) 
                return i; 
        }
    }
    // удалить текущий выбраный список 
    static deleteCurList()
    {
        for(let i = 0; i < this.lists.length; i++)
        {
            if(this.lists[i].id == App.cur_focus_list)
                this.lists.splice(i, 1); 
        }
    }
    // удалить список по id 
    static deleteList(id)
    {
        for(let i = 0; i < this.lists.length; i++)
        {
            if(this.lists[i].id == id) 
                this.lists.splice(i, 1);  
        }
    }

    static deleteAll()
    {
        App.lists = []; 
    }
}



export default App;