var Todo = function(todo, indicator,date){
  this.todo = todo;
  this.isDone = indicator;
  this.date = date;
  this.todoConstructor = function(){
    return `${this.todo}  ${this.isDone} ${this.date}`;
  }
}

let toDoList = [];
function getCurrentTime(){
  var currentDate = new Date();

  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var hour = currentDate.getHours();
  var minutes = currentDate.getMinutes();

  return `${date}-${(month + 1)}-${year} ${hour}:${minutes}` ;
}
function appendToList(){
  var dateString = getCurrentTime();
  
  var todo = new Todo(toDoListInput.value,true,dateString);
  toDoList.unshift(todo);
  showToDoList();
  getActiveElements();
  document.getElementById("toDoListInput").value='';
}
document.onkeydown=function(){
  if(window.event.keyCode=='13'){
    if(toDoListInput.value != "")
      appendToList();
  }
}
function listItemDone(item){
  for(let i=0; i< toDoList.length;i++){
    if(toDoList[i].todo+toDoList[i].date == item.target.parentNode.textContent){
      toDoList.splice(i,1,new Todo(toDoList[i].todo,false,toDoList[i].date));
    }
  }
  showToDoList();
  getActiveElements();
}
function deleteItem(item){
  for(let i=0; i< toDoList.length;i++){
    if(toDoList[i].todo+toDoList[i].date === item.target.parentNode.parentNode.parentNode.textContent){
      toDoList.splice(i,1);
    }
  }
  showToDoList();
  getActiveElements();
}

function editItem(item){
  var current = null;
  var currentIndex = 0;
  for(let i=0; i< toDoList.length;i++){
    if(toDoList[i].todo+toDoList[i].date == item.target.parentNode.textContent){
      current = toDoList[i];
      currentIndex = i;
    }
  }
  swal({   
        title: "Edit",   
        text: "Edit your task:",   
        content: {
          element: "input",
          attributes: {
            value: current.todo
          },
        },   
        buttons: true}).then(inputValue =>  
        {   
          if (inputValue == false) 
            return false;      
          if (inputValue == "") {     
            swal.showInputError("Please enter task!");     
            return false   
          }  
          toDoList.splice(currentIndex,1,new Todo(inputValue,true,getCurrentTime()));
          showToDoList();
          getActiveElements();
          swal("Task edited Successfully!","success"); 
        });
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

      var iedit = document.createElement('i');
      iedit.className = 'fa fa-edit';
      iedit.style = 'margin-left:1%;color:black;cursor:pointer;text-decoration: none;';
      iedit.addEventListener('click',function(ev){
        editItem(ev);
      });
      temp.appendChild(iedit);
      
      var deleteDiv = document.createElement('div');
      deleteDiv.style = 'float:right;';

      var dateDiv = document.createElement('div');
      dateDiv.style = 'display:inline-block;';

      var dateLabel = document.createElement('p');
      dateLabel.className= 'dateLabelStyle';
      dateLabel.textContent = toDoList[i].date;
      dateDiv.appendChild(dateLabel);
      deleteDiv.appendChild(dateDiv);

      var iDiv = document.createElement('div');
      iDiv.style = 'display:inline-block;';
      var i2 = document.createElement('i');
      i2.className = 'fa fa-times-circle';
      i2.style = 'margin-left:1%;color:red;cursor:pointer;text-decoration: none;';
      i2.addEventListener('click',function(ev){
        deleteItem(ev);
      });
      iDiv.appendChild(i2);
      deleteDiv.appendChild(iDiv);
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

      var dateDiv = document.createElement('div');
      dateDiv.style = 'display:inline-block;';

      var dateLabel = document.createElement('p');
      dateLabel.className= 'dateLabelStyle';
      dateLabel.textContent = toDoList[i].date;
      dateDiv.appendChild(dateLabel);
      deleteDiv.appendChild(dateDiv);

      var iDiv = document.createElement('div');
      iDiv.style = 'display:inline-block;';

      var i2 = document.createElement('i');
      i2.className = 'fa fa-times-circle';
      i2.style = 'margin-left:1%;color:red;cursor: pointer;text-decoration: none;';
      i2.addEventListener('click',function(ev){
        deleteItem(ev);
      });
      iDiv.appendChild(i2);
      lineDive.appendChild(temp);
      deleteDiv.appendChild(iDiv);
      temp.appendChild(deleteDiv);
      ul.appendChild(lineDive);
    }
    div.appendChild(ul);
  }
  return 1;
}
