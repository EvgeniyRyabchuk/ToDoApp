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

    static getList(id)
    {
        for(let i of App.lists)
        {
            if(i.id == id)
                return i; 
        }
    }

    static deleteList(id)
    {
        for(let i = 0; i < this.lists.length; i++)
        {
            if(this.lists[i].id == id)
                this.lists.splice(i, 1);  
        }
    }
}



export default App;