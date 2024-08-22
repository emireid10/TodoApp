let todoItems = [];
let inputvalue = "";
let searchvalue = "";
let changevalue = true;

function setdate(){
  let now = new Date();
  let day = String(now.getDate()).padStart(2, '0');
  let month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() 0'dan başlar, bu yüzden 1 ekliyoruz.
  let year = now.getFullYear();

  let fulldate = `${day}.${month}.${year}`;
  return fulldate;
}

function handleInputChange(event){
  inputvalue = event.target.value;
}

function handleCheckChange(event){
  event.target.checked = true;
}

function searchTasks(event){
searchvalue = event.target.value.toLowerCase();
}

function founds(element){
  return element.text.toLowerCase().includes(searchvalue);
}

function add(){
  if(inputvalue.trim() !== ""){
    let currentdate = setdate();
    let newtask = { 
      text : inputvalue,
      date : currentdate,
      checked : false
    };

  todoItems.push(newtask);
  displayTodos(todoItems);
  inputvalue = "";
  document.getElementById("searchinput").value = "";
  }
  else{
    alert("Please enter a task!");
  }
}
function displayTodos(todoItems){
  const todoContainer = document.querySelector('.todo');
  todoContainer.innerHTML = "";

todoItems.map((item,index) => {
  const todoDiv = document.createElement('div');
  todoDiv.className = "todo-item";

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = "todo-checkbox";
  if(item.checked){checkbox.checked = true;}
  checkbox.addEventListener('change', () => {
    item.checked = checkbox.checked; //checkbox işaretlenme durumunu kaydet
  });




  const taskText = document.createElement('span');
  taskText.textContent = item.text;
  taskText.className = "task-text";

  const deleteButton = document.createElement('button');
  deleteButton.className = "delete-button";
  deleteButton.onclick = () => {
    removeTodo(todoItems,index);
  };
  const currentdate = document.createElement('date');
  currentdate.className = "dates";
  currentdate.textContent = item.date;

todoDiv.appendChild(checkbox);
todoDiv.appendChild(taskText);
todoDiv.appendChild(currentdate);
todoDiv.appendChild(deleteButton);

todoContainer.appendChild(todoDiv);

});
}

function search(){
  if(searchvalue.trim() !== ""){
    let foundTasks = todoItems.filter(founds);

  let searchContainer = document.querySelector(".todo");
  searchContainer.innerHTML = "";

    if(foundTasks.length > 0){
      const foundContainer = document.querySelector('.todo');
  foundContainer.innerHTML = "";
      foundTasks.map((item,index) => {
        const foundDiv = document.createElement('div');
        foundDiv.className = "todo-item";
      
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = "todo-checkbox";
        checkbox.checked = item.checked;

        checkbox.addEventListener('change', () => {
          item.checked = checkbox.checked; 
        });
      
        const foundText = document.createElement('span');
        foundText.textContent = item.text;
        foundText.className = "task-text";
      
        const deleteButton = document.createElement('button');
        deleteButton.className = "delete-button";
        deleteButton.onclick = () => {
          removeTodo(index);
        };
      
        const currentdate = document.createElement('date');
        currentdate.className = "dates";
        currentdate.textContent = item.date;

      foundDiv.appendChild(checkbox);
      foundDiv.appendChild(foundText);
      foundDiv.appendChild(currentdate);
      foundDiv.appendChild(deleteButton);
      
      foundContainer.appendChild(foundDiv);
      });
    } else {
      alert(`There is no task including ${searchvalue}`);
    }
    searchvalue = "";
    document.getElementById("searchtaskbar").value = "";
  }
  else {
    displayTodos(todoItems);
  }
}



function removeTodo(todoItems,index){
  todoItems.splice(index,1);
  displayTodos(todoItems);
}

function showfilters(){
  const filterOptions = document.getElementById("filteroptions");

  if(filterOptions.style.display === "block"){
    filterOptions.style.display = "none";
  }
  else {
    filterOptions.style.display = "block";
  }
}

function foreachcheck(element){
  if(element.checked === true){
    return element;
  }

}

function applyfilters(){
  const newestbox = document.getElementById("newest");
  const oldestbox = document.getElementById("oldest");
  const checkedbox = document.getElementById("checked");

  let filteredTasks = [];
  if(newestbox.checked){
filteredTasks= todoItems.sort((a,b) => new Date(b.date) - new Date(a.date));
  }

  else if(oldestbox.checked){
    filteredTasks= todoItems.sort((a,b) => new Date(a.date) - new Date(b.date));

  }
  else if(checkedbox.checked){
    filteredTasks = todoItems.filter(item => item.checked);

  }

  
  else{
    alert("You didn't choose any filter to apply!");
  }
  displayTodos(filteredTasks);
}

function resetfilters(){
  const radios = document.querySelectorAll(".filter");
  radios.forEach(radio => {
    radio.checked = false;
  });
  displayTodos(todoItems);
}
