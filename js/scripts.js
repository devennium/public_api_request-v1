/*********************** 
 * Start declaration of Global variables
 * 
 * 
*/

const searchDiv = document.querySelector("body > header > div > div.search-container")
const galleryDiv = document.querySelector("#gallery")
const numberOfEmployeesToQuery = 12
let cardDiv
let modalCloseBtn
let users
let searchMatch

init()


/***********************
 * Fetch X number of random employees from randomuser.me API
 * Where X is numberOfEmployeesToQuery const declared at top of file
 *  
*/
async function getEmployees(){
    await
        fetch('https://randomuser.me/api/?results=' + numberOfEmployeesToQuery)
        .then(response => response.json())
        .then(data => galleryHTMLTemplate(data.results))
}

/******************** 
 * HTML Templates
 * These functions build the HTML elements
 * from the fetched employees
*/

function searchHTMLTemplate() {
    let searchDivContent = `
                            <form action="#" method="get"> 
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                            </form>
                            `
    searchDiv.innerHTML = searchDivContent
    searchHandler()
}

/**
 * HTML markup for employee gallery
 * 
 */

function galleryHTMLTemplate(data) {

    let galleryDivContent = data.map((employee) => `
                <div class="card" id="card">
                <div class="card-img-container">
                <img class="card-img" src="${employee.picture.thumbnail}" alt="profile picture">
                </div>
                <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
                </div>
                `
    ).join('')
    
    galleryDiv.innerHTML = galleryDivContent
    clickHandlers(data) 
}

/**
 * HTML markup for modal container
 */
function modalContainerHTMLTemplate(employeesData) {
    const modal = document.createElement('div')
    modal.classList.add('modal-container')
    galleryDiv.appendChild(modal)
    let modalContainer = `
                    <div class=modal>
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                    <img class="modal-img" src="${employeesData.picture.medium}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employeesData.name.first} ${employeesData.name.last}</h3>
                    <p class="modal-text">${employeesData.email}</p>
                    <p class="modal-text cap">${employeesData.location.city}</p>
                    <hr>
                    <p class="modal-text">${employeesData.cell}</p>
                    <p class="modal-text">${employeesData.location.street}, ${employeesData.location.city}, ${employeesData.location.state} ${employeesData.location.postcode}</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                    `
    modal.innerHTML = modalContainer
}

/** 
 * Initialize web app
 * 
 * 
*/
function init(){
    getEmployees()
    // Initialize dynamic HTML to be added to the page for search and gallery div
    searchHTMLTemplate()
}

/**
 * OnClick Handlers
 */
function clickHandlers(employeesData) {
            cardDiv = document.getElementsByClassName('card')
            /**
             * For loop to add event listeners to 
             * the employee cards when clicked modal
             * window will appear with employee's data
             */
            for(let i=0; i < cardDiv.length; i++){
                    cardDiv[i].addEventListener('click', function(event){
                        /**
                         * Handlers for modal window
                         */
                        modalContainerHTMLTemplate(employeesData[i])
                        modalHandler(event)
                    })
                }
}

/**
 * Modal handler
 */
function modalHandler(){
    modalCloseBtn = document.querySelector("#modal-close-btn")
    modalCloseBtn.addEventListener('click', function(){
    const modal = document.querySelector("#gallery > div.modal-container")
    modal.remove()
    })
}

/**
 * Search handler
 */

function searchHandler(){
    const searchSubmitBtn = document.querySelector("#serach-submit")
    let txtValue

    /**
     * Search listener for search button
     */
    searchSubmitBtn.addEventListener('click', function(){

        const searchField = document.querySelector("#search-input")
        cardDiv = document.getElementsByClassName('card')
        let searchFieldValue = searchField.value.toUpperCase()

        for(let i = 0; i < cardDiv.length; i++){
            /**
             * Hides and unhides employees based on search value
             */
            txtValue = cardDiv[i].textContent || cardDiv[i].innerText
            if(searchFieldValue != ''){
            if(txtValue.toUpperCase().indexOf(searchFieldValue) > -1){
                cardDiv[i].style.visibility = "visible"
            } else {
                cardDiv[i].style.visibility = "hidden"
                }
            } else {
                resetEmployeeCardVisibility()
            }
        }
    })
}

/**
 * Resets employee card visibilty
 */
function resetEmployeeCardVisibility(){
    for(let i = 0; i < cardDiv.length; i++){
        cardDiv[i].style.visibility = "visible"
    }
}