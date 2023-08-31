//target all the ID selectors from the HTML in JavaScript
$(document).ready(function () {
  const API_URL = 'http://localhost:3000';

  let tasks = [];

  function fetchTasks() {
    $.ajax({
      url: `${API_URL}/tasks`,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        tasks = data;
        createTasks();
      },
    });
  }

  function createTasks() {
    $('#tasks').empty();
    tasks.forEach((task, index) => {
      $('#tasks').append(`
        <div id="${index}">
          <span class="fw-bold">${task.text}</span>
          <span class="small text-secondary">${task.date}</span>
          <p>${task.description}</p>
          <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteTask(this, ${index})" class="fas fa-trash-alt"></i>
          </span>
        </div>
      `);
    });
  }

  function addTask(task) {
    $.ajax({
      url: `${API_URL}/tasks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(task),
      success: function () {
        fetchTasks();
      },
    });
  }

  function deleteTask(e, index) {
    $.ajax({
      url: `${API_URL}/tasks/${tasks[index].id}`,
      method: 'DELETE',
      success: function () {
        tasks.splice(index, 1);
        createTasks();
      },
    });
  }

  fetchTasks();

  $('#form').submit(function (e) {
    e.preventDefault();
    formValidation();
  });

  function formValidation() {
    // Existing validation code...

    acceptData();
  }

  function acceptData() {
    const task = {
      text: textInput.value,
      date: dateInput.value,
      description: textarea.value,
    };

    addTask(task);
    resetForm();
    $('#add').attr('data-bs-dismiss', 'modal');
    $('#add').click();
  }

  function resetForm() {
    // Reset form fields...
  }

  // Other functions (editTask, editPost, etc.) remain unchanged...
});
///Do I need the above code?
fetch(' http://localhost:3000/posts', {
   method: 'GET',
 })
 .then(response => response.json())
 .then(data => console.log(data))
 .catch((error) => console.error('Error:', error));

 fetch(' http://localhost:3000/comments', {
   method: 'GET',
 })
 .then(response => response.json())
 .then(data => console.log(data))
 .catch((error) => console.error('Error:', error));

 fetch(' http://localhost:3000/profile', {
   method: 'GET',
 })
 .then(response => response.json())
 .then(data => console.log(data))
 .catch((error) => console.error('Error:', error));

//const URL_ENDPOINT =  ` http://localhost:3000/posts`;
//const URL_ENDPOINT =  `http://localhost:3000/comments`;

//WHAT WOULD HAPPEN IF I USED THE WEEK10 CODE FROM MY .JS?

/**  DONT USE THE CODE BELOW THIS LINE FOR NOW */


// // This is the function that creates the Delete button, and it contains
// // the code that deletes the element and returns the button.
// function createDeleteButton(id) {
//   // declares the btn variable which creates the button element
//   let btn = document.createElement("button");
//   // declares the classes which will apply to the button when created
//   btn.className = "btn btn-primary";
//   // assigns an id to the button
//   btn.id = id;
//   // applies the text inside the tag for the button
//   btn.innerHTML = "Delete";
//   // is the function for what to do when clicked.
//   btn.onclick = () => {
//     // consoles out the text of what task id we are deleting when clicked.
//     console.log(`Deleting row with id: task-${id}`);
//     // declares a value for what element we want to delete -->
//     let elementToDelete = document.getElementById(`task-${id}`);
//     // Then deletes it from the parent node.
//     elementToDelete.parentNode.removeChild(elementToDelete);
//   };
//   // retuns btn to create the button again.
//   return btn;
// }


// let category =0;
// let categoryId =[];

// function myFunction() {
//   console.log("I clicked the button!");
// }

// function myAddRow(){
//   console.log("to add a row");
// }

// onclick(`new-Budget-category`,() =>{
//   Category.push(new Category(CategoryId++,getValue(`new-Budget-category-names`)));
//   drawDOM();
// });
// function onclick(id, action){
//   let element=document.getElementById(id);
//   element.addEventListener(`click`,action);
//   return element;
// }
// function getValue(id) {
//   return document.getElementById(id).value
// }
// function drawDOM(){
//   let categoryDiv = document.getElementById(`category`);
//   clearElement(categoryDiv);
// for (category of categories) {
//     let table =createCategoryTable(category);
//     let title =document.createElement(`h2`);
//     title.innerHTML =categoy.name;
//     title.appendChild(createDeleteCategoryButton(category));
//     categoryDiv.appendChild(title);
//     categoryDiv.appendChild(table);
//     for (AmountOfPay of category.AmountOfPay){
//     createAmountOfPayRow(category, table, AmountOfPay);
//     }
//   }
//   function addNewRow() {
//     table.row
//         .add([
//             counter + '.1',
//             counter + '.2',
//             counter + '.3',
//             counter + '.4',
//             counter + '.5'
//         ])
//         .draw(false);
 
//     counter++;
// }
 
// const table = new DataTable('#example');
// let counter = 1;
 
// document.getElementById('#addRow').addEventListener('click', addNewRow);
 
// // Automatically add a first row of data
// addNewRow();
// }





let form = document.getElementById("form");
let input = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

//build a submit event listener for the form so that it can prevent the default behaviour of our App
//We can not let a user submit blank input field. Need to validate(look this up)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log("button clicked");
  
    formValidation();
  });
  
  
//make an if else statement inside our formValidation function. 
//This will help us prevent users from submitting blank input fields. 

let formValidation = () => {
    if (textInput.value === "") {//added text input instead of leaving it just Input
      console.log("failure"); 
      msg.innerHTML = "Post cannot be blank";
    } else {
      console.log("successs");
      msg.innerHTML = "";
      acceptData(); //This will not work unless you invoke the function acceptData inside the else statement
      add.setAttribute("data-bs-dismiss", "modal");  //You may have noticed that the modal doesn't close automatically. 
      //To solve this, write this small function inside the else statement of the form validation: 
      add.click();
  

      (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};
//Also, we need the acceptData function to work when the user clicks the submit button. 
//For that, we will fire this function in the else statement of our formValidation function. 
    
  

//How to accept data from input fields
//Whatever data we get from the input fields, we will store them in an object.
let data = [{}];  //added []

//The main idea is that, using the function, we collect data 
//the inputs and store them in our object named data.

//First, we collect the data from the input fields, using the function named 
//acceptData and an array named data. Then we push them inside the local storage like this: 

let acceptData = () => {
    data.push({
        text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });
  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();//invoke code inside accept Data
    //data["text"] = input.value;//other codes are here..Not sure what to do
    //console.log(data);//with these 3
    //createPost();  //In our acceptdata function, we will fire our createPost function
  };
  let createTasks = () => {  //create a new task we need to create a function and use template literals
    //to create the HTML element & use map to push the data collected from the user inside the template
    tasks.innerHTML = "";
    data.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };

  let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    
  };
  
  let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
  
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
  
    deleteTask(e);
  };
//Once we're done collecting and accepting data from the user, 
//we need to clear the input fields. For that we create a function called resetForm  
  let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
  };  

  (() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createTasks();
  })();
  
  
 //I AM NOT SURE WHAT BELOW IS

//In order to post our input data on the right side, 
//we need to create a div element and append it to the posts div.  
  let createPost = () => {
    //The backticks are template literals. It will work as a template for us. Here, we need 3 things: a parent div, 
    //the input itself, and the options div which carries the edit and delete icons.   
    posts.innerHTML += `
    <div>
      <p>${data.text}</p>
      <span class="options">
        <i onClick="editPost(this)" class="fas fa-edit"></i>
        <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
      </span>
    </div>
    `;
    input.value = "";
  };
    
//HOW TO DELETE A POST
//In order to delete a post, first of all, 
//let's create a function inside our javascript file:

let deletePost = (e) =>{

e.parentElement.parentElement.remove();//The first line will delete the HTML element from the screen,
data.splice(e.parentElement.parentElement.id, 1);//the second line will remove the targetted Task from the data array,
localStorage.setItem("data", JSON.stringify(data));//and the third line will update the local storage with the new data.
console.log(data);
};


//The this keyword will refer to the element that fired the event. in our case, the this refers to the delete button.

//Look carefully, the parent of the delete button is the span with class name options. The parent of the span is the div. So, 
//we write parentElement twice so that we can jump from the delete icon to the div and target it directly to remove it.

//Next up, we fire this deletePost function inside all of our delete icons using an onClick attribute. 
//EDIT POST  The this keyword will refer to the element that fired the event. In our case, the this refers to the edit button.
//Look carefully, the parent of the edit button is the span with class name options. The parent of the span is the div. 
//So, we write parentElement twice so that we can jump from the edit icon to the div and target it directly to remove it.
//Then, whatever data is inside the post, we bring it back on the input field to edit it.
let editPost = (e) => {
input.value = e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove();
};

//THis is the code from github. https://github.com/JoyShaheb/CRUD-Application/blob/main/to-do-app/main.js
//let form = document.getElementById("form");
        // let textInput = document.getElementById("textInput");
        // let dateInput = document.getElementById("dateInput");
        // let textarea = document.getElementById("textarea");
        // let msg = document.getElementById("msg");
        // let tasks = document.getElementById("tasks");
        // let add = document.getElementById("add");

        // form.addEventListener("submit", (e) => {
        // e.preventDefault();
        // formValidation();
        // });

        // let formValidation = () => {
        // if (textInput.value === "") {
        //     console.log("failure");
        //     msg.innerHTML = "Task cannot be blank";
        // } else {
        //     console.log("success");
        //     msg.innerHTML = "";
        //     acceptData();
        //     add.setAttribute("data-bs-dismiss", "modal");
        //     add.click();

        //     (() => {
        //     add.setAttribute("data-bs-dismiss", "");
        //     })();
        // }
        // };

        // let data = [{}];

        // let acceptData = () => {
        // data.push({
        //     text: textInput.value,
        //     date: dateInput.value,
        //     description: textarea.value,
        // });

        // localStorage.setItem("data", JSON.stringify(data));

        // console.log(data);
        // createTasks();
        // };

        // let createTasks = () => {
        // tasks.innerHTML = "";
        // data.map((x, y) => {
        //     return (tasks.innerHTML += `
        //     <div id=${y}>
        //         <span class="fw-bold">${x.text}</span>
        //         <span class="small text-secondary">${x.date}</span>
        //         <p>${x.description}</p>
        
        //         <span class="options">
        //             <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        //             <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
        //         </span>
        //         </div>
        //     `);
        // });

        // resetForm();
        // };

        // let deleteTask = (e) => {
        // e.parentElement.parentElement.remove();
        // data.splice(e.parentElement.parentElement.id, 1);
        // localStorage.setItem("data", JSON.stringify(data));
        // console.log(data);
        
        // };

        // let editTask = (e) => {
        // let selectedTask = e.parentElement.parentElement;

        // textInput.value = selectedTask.children[0].innerHTML;
        // dateInput.value = selectedTask.children[1].innerHTML;
        // textarea.value = selectedTask.children[2].innerHTML;

        // deleteTask(e);
        // };

        // let resetForm = () => {
        // textInput.value = "";
        // dateInput.value = "";
        // textarea.value = "";
        // };

        // (() => {
        // data = JSON.parse(localStorage.getItem("data")) || []
        // console.log(data);
        // createTasks();
        // })();