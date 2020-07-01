// *** Variables ***
const listaTarea = document.getElementById('lista-tareas');



//*** Event Listeners ***

eventListeners();

function eventListeners() {
     // Cuando se envía al formulario
     document.querySelector('#formulario').addEventListener('submit',agregarTarea);

     //Borrar tarea
     listaTarea.addEventListener('click', borrarTarea);

     // Contenido cargado (DOM)
     document.addEventListener('DOMContentLoaded', localStorageListo);
}



// *** Funciones ***

//Añadir tarea del formulario
function agregarTarea(e) {
     e.preventDefault();
     
     //Lectura del valor del "textarea"
     const tarea = document.getElementById('tarea').value;

     // Crear botón de eliminar
     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-tarea';
     botonBorrar.innerText = 'X';

     //Creación del elemento e introducción del contenido a la lista
     const li = document.createElement('li');
     li.innerText = tarea;

     // Añade el botón de borrar al tarea creado
     li.appendChild(botonBorrar);
     
     //Añade el tarea a la lista
     listaTarea.appendChild(li);


     //Añadir tarea a Local Storage
     agregarTweetLocalStorage(tarea);
}

// Elimina Tarea del formulario
function borrarTarea(e) {
     e.preventDefault();
     if(e.target.className === 'borrar-tarea') {
          e.target.parentElement.remove();
          borrarTweetLocalStorage(e.target.parentElement.innerText);
     } 
}

// Mostrar datos del LocalStorage en la lista

function localStorageListo() {
     let tareas;
     
     tareas = obtenerTareasLocalStorage();
     
     tareas.forEach(function(tarea) {
          // Crear botón de eliminar
             const botonBorrar = document.createElement('a');
                 botonBorrar.classList = 'borrar-tarea';
                  botonBorrar.innerText = 'X';

           //Creación del elemento e introducción del contenido a la lista
            const li = document.createElement('li');
             li.innerText = tarea;

         // Añade el botón de borrar al tarea creado
        li.appendChild(botonBorrar);
     
       //Añade el tarea a la lista
      listaTarea.appendChild(li);
     });
}


//Agrega Tarea a Local Storage
function agregarTweetLocalStorage(tarea) {
     let tareas;
     tareas = obtenerTareasLocalStorage();
     // Añadir el nuevo tweet
     tareas.push(tarea);
     // Convertir de string a arreglo para local storage
     localStorage.setItem('tareas', JSON.stringify(tareas) );
}


// Lectura de cantidad de tareas en local storage, retorna un
function obtenerTareasLocalStorage() {
     let tareas;
     // Revisamos los valoes de local storage
     if(localStorage.getItem('tareas') === null ) {
          tareas = []; 
     } else {
          tareas = JSON.parse(localStorage.getItem('tareas') );
     }
     return tareas;
}

// Eliminar tarea de Local Storage

function borrarTweetLocalStorage(tarea) {
     
     let tareas, tweetBorrar;
     
     //Toma 2 parámetros el "substring", desde donde hasta donde cortar (-1 para que no haya problema con la x)
     // Elimina la "X" del tarea
     tweetBorrar = tarea.substring(0, tarea.length - 1);
     
     tareas = obtenerTareasLocalStorage();

     tareas.forEach(function(tarea, index){
          if(tweetBorrar === tarea) {
               tareas.splice(index, 1);
          }
     }) ;

     localStorage.setItem('tareas', JSON.stringify(tareas));

}