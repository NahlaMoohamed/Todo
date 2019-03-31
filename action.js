//document.addEventListener('DOMContentLoaded', function(){ 
  var Todo = function(todo, indicator){
    this.todo = todo;
    this.isDone = indicator;
    this.todoConstructor = function(){
      return `${this.todo}  ${this.isDone}`;
    }
  }

  let toDoList = [];

  function appendToList(){
    var todo = new Todo(toDoListInput.value,true);
    toDoList.push(todo);
    showToDoList();
    getActiveElements();
  }

  function listItemDone(item){
    for(let i=0; i< toDoList.length;i++){
      if(toDoList[i].todo == item.target.parentNode.textContent){
        toDoList.splice(i,1,new Todo(item.target.parentNode.textContent,false));
      }
    }
    showToDoList();
    getActiveElements();
  }
  function deleteItem(item){
    for(let i=0; i< toDoList.length;i++){
      if(toDoList[i].todo === item.target.parentNode.parentNode.textContent){
        toDoList.splice(i,1);
      }
    }
    showToDoList();
    getActiveElements();
  }

  function getActiveElements(){
    var count = 0;
    for(let item of toDoList)
    {
      if(item.isDone === true)
      {
        count +=1;
      }
    }
    //return count;
    if(toDoList.length > 0){
      var listLength = document.getElementById('listLength');
      listLength.textContent = `${count} To-Do items in the list.`;
    }
    else{
      var listLength = document.getElementById('listLength');
      listLength.textContent = '';
    }
  }

  function showToDoList(){
    var div = document.getElementById('toDoListDiv');
    if(div.hasChildNodes()){
      div.removeChild(div.firstChild);
    }
    var ul = document.createElement('ul');

    for(let i=0; i<toDoList.length; i++){
      if(toDoList[i].isDone == true){
        var temp = document.createElement('li');      //ul -> li -> i -> deleteDiv -> i ->
        temp.className = 'well todo-li';
        temp.textContent = toDoList[i].todo;
        var iele = document.createElement('i');
        iele.className = 'fa fa-check-circle';
        iele.style = 'margin-left:1%;color:black;cursor:pointer;text-decoration: none;';
        iele.addEventListener('click',function(ev){
          listItemDone(ev);
        });
        temp.appendChild(iele);
        
        
        var deleteDiv = document.createElement('div');
        deleteDiv.style = 'float:right;';
        var i2 = document.createElement('i');
        i2.className = 'fa fa-times-circle';
        i2.style = 'margin-left:1%;color:red;cursor:pointer;text-decoration: none;';
        i2.addEventListener('click',function(ev){
          deleteItem(ev);
        });
        deleteDiv.appendChild(i2);
        temp.appendChild(deleteDiv);
        ul.appendChild(temp);
      }
      else{
        var temp = document.createElement('li');
        temp.className = 'well todo-li';
        temp.textContent = toDoList[i].todo;
        var lineDive = document.createElement('div');
        lineDive.style = 'text-decoration:line-through';
        var x = document.createElement('i');
        x.className = 'fa fa-check-circle';
        x.style = 'margin-left:1%;color:green;cursor: pointer;text-decoration: none;';
        temp.appendChild(x);
        
        var deleteDiv = document.createElement('div');
        deleteDiv.style = 'float:right;';
        var i2 = document.createElement('i');
        i2.className = 'fa fa-times-circle';
        i2.style = 'margin-left:1%;color:red;cursor: pointer;text-decoration: none;';
        i2.addEventListener('click',function(ev){
          deleteItem(ev);
        });
        lineDive.appendChild(temp);
        deleteDiv.appendChild(i2);
        temp.appendChild(deleteDiv);
        ul.appendChild(lineDive);
      }
      div.appendChild(ul);
    }
    return 1;
  }

//}, false);