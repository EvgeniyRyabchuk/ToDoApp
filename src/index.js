import './styles/styles.scss';

import { Entry, List, App } from './models';

// const a = new Entry('some text', true);
// document.querySelector('#field').append(a.elem);
// const b = new Entry('some text', false);
// document.querySelector('#field').append(b.elem); 
// const c = new Entry('some text', true);
// document.querySelector('#field').append(c.elem);

// отображение чекбоксов другого списка  
function toggleList(content)
{ 
    console.log(content)
    let field = document.querySelector("#field"); 
    field.innerHTML = ''; 

    for(let i of content)
        field.append(i.elem); 
}

document.getElementById("menu").addEventListener("click", (e) =>
{
    let target = e.target; 
    console.log(target.tagName);

    if(target.tagName == "BUTTON")
    {
        // if(!target.disabled) 
        // {
            let prev = document.querySelector(`#${App.cur_focus_list}`); 
            prev.disabled = false; 
            
            App.cur_focus_list = target.id; 
            target.disabled = true;  
            
            toggleList(App.getCurList().entryList); 
        // }
    }
})

document.getElementById("addList_btn").addEventListener("click", (e) =>
{
    let list = new List("new list"); 
    App.addList(list); 

    document.querySelector('#menu').append(list.elem); 
    
})
document.getElementById("addEntry_btn").addEventListener("click", (e) =>
{
    let entry = new Entry('some text', true); 
    let curList = App.getCurList(); 
    curList.addEntry(entry); 

    document.querySelector('#field').append(entry.elem);
    console.dir(App.lists); 
})
document.getElementById("save_btn").addEventListener("click", (e) =>
{
    
})
document.getElementById("deleteList_btn").addEventListener("click", (e) =>
{
    
})
document.getElementById("deleteEntry_btn").addEventListener("click", (e) =>
{
    
})