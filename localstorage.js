const textarea = document.getElementById('text-to-add');
const button = document.getElementById('btnAgregarTweet');

function startUp(){
    button.disabled = true;
    button.classList.add('add-button-set-error');
    if(!localStorage.getItem('LastItem')) localStorage.setItem('LastItem',0);
    if(document.getElementsByClassName('display-li').length == 0) getStorage();
    deleteStorage();
}

function Agregar(){
//Agregar Contenido 
function validateTexterea(){
    textarea.addEventListener('input',() => {
        document.getElementById('letterCounter').textContent = textarea.textLength + "/25";
        if(textarea.textLength < 25)
        {
            if(textarea.value == "")
            {
                textarea.classList.add('add-textarea-set-error');
                button.classList.add('add-button-set-error');
                button.disabled = true;
            }
            else
            {
                textarea.className = textarea.className.replace('add-textarea-set-error',' ');
                button.className = button.className.replace('add-button-set-error',' ');
                button.disabled = false;
            };
        }
    });
};

//Incrementar el Ultimo Valor
function autoIncrement(key){
    const lastItem = localStorage.getItem(key);
    return (parseInt(lastItem)+1).toString();
}


//Enviar los valores
validateTexterea();
button.addEventListener('click',function() {
    localStorage.setItem(autoIncrement('LastItem'),textarea.value);
    localStorage.setItem('LastItem',autoIncrement('LastItem'));
    textarea.value = '';
    startUp();
    updateStorage();

});
}

//Function Leer localStorage
function getStorage(){
    const ulElement = document.getElementById('display-content');
    for(const key in localStorage)
    {
        if(parseInt(key))
        {
            const liElement = document.createElement('li');
            liElement.innerHTML ='<p class="li_id" id="local-id">'+ key + '</p> ' + localStorage.getItem(key) +'<box-icon name="message-square-x" class="li-delete"></box-icon>';
            liElement.className ='display-li';
            liElement.id = "display-tweet"
            ulElement.appendChild(liElement);
        }
        
       
    }
}


//Elimina los valores
function deleteStorage() {
    const buttonsDelete = document.getElementsByClassName('li-delete');
        for(const element of buttonsDelete)
        {
            element.addEventListener('click',function(){
                const pKeyElement = element.parentElement.firstElementChild.textContent;
                localStorage.removeItem(pKeyElement);
                updateStorage();
            });
        }
}
//Actualizar
function updateStorage(){
    const ulElement = document.getElementById('display-content');
    const liElement = document.querySelectorAll('#display-tweet');
    for(let i = 1;i<= liElement.length;i++)
    {
        ulElement.removeChild(liElement[i-1]);
    }
    getStorage();
    deleteStorage();
}
//Inicio de Sitio Web
startUp();
//Funcion Agregar
Agregar();
//Funcion Eliminar





