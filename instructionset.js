
const searchInput = document.querySelector('.searchInput');
const nothingFoundMessage = document.querySelector('.nothingFoundMessage');
const instructionInfoHolder = document.querySelector('.instructionInfoHolder');

const instructionHoldertList = document.querySelectorAll('.instructionHolder');

const searchFromTop = document.querySelector('.searchFromTop');

const disclaimerHolder = document.querySelector('.disclaimerHolder');
const disclaimerText = document.querySelector('.disclaimerText');
const disclaimerButton = document.querySelector('.disclaimerButton');

const routerLinkList = document.querySelectorAll('[router]');

//-----------------------------------------------------------------------
//  global vars
//-----------------------------------------------------------------------

// The last found element. Used to turn background color back to white
let lastFoundElement = '';
// the position of the last found element
let lastFoundElementPos = 0;
// last searched term
let lastSearchedTerm = '';

// The last clicked element. Used to turn background color back to white
let lastClickedElement = '';

// is set when windo popstate happens. it is used so that the history push isn't done when back button is pressed.
let backButton = false;

//-----------------------------------------------------------------------
//  button bindings
//-----------------------------------------------------------------------
disclaimerButton.addEventListener('click', () => {

    disclaimerHolder.style.visibility = 'hidden';
    // focus on the search input
    searchInput.focus();

});


//-----------------------------------------------------------------------
//  input bindings
//-----------------------------------------------------------------------
searchInput.addEventListener('keyup', (e) =>{

    let term = searchInput.value;

    if(term === ''){
        highlightFoundElement(lastFoundElement,false);
        nothingFoundMessage.style.visibility = 'hidden';
    }

    if(e.code === 'Enter'){
        // if searching for something new reset the position
        if(lastSearchedTerm.toUpperCase() !== term.toUpperCase() && searchFromTop.checked){
            lastFoundElementPos = 0;
            lastSearchedTerm = term;
        }

        if(term !== ''){
            searchInput.select();
            search(term);
        }
    }

});


//-----------------------------------------------------------------------
//  window bindings
//-----------------------------------------------------------------------
window.addEventListener('popstate', () => {

    backButton = true;

    urlHandler();


});

//-----------------------------------------------------------------------
//  div bindings
//-----------------------------------------------------------------------

// add the same binding to all the instructionHolder elements
for(let p = 0; p < instructionHoldertList.length; p++){
    instructionHoldertList[p].addEventListener('click', (e) => {

        highlightClickedElement(lastClickedElement, false);
        highlightClickedElement(instructionHoldertList[p], true);
        lastClickedElement = instructionHoldertList[p];

        // get the title
        const title = instructionHoldertList[p].querySelector('.instructionTitle').innerHTML.toUpperCase().trim().replace(/ /g,'');

        // clear the field 
        instructionInfoHolder.innerHTML = '';

        // check if there is info on that thing
        if(INSTRUCTION_SET_INFO[title]){
            // get the file with the info

            // create divs
            for(let i = 0; i < INSTRUCTION_SET_INFO[title].url.length; i++){
                
                let d = document.createElement('div');
                d.id = `info${i}`;
                d.innerHTML = INSTRUCTION_SET_INFO[title].url[i] + '<div class="infoEndOfFile"></div>';
                instructionInfoHolder.append(d);

            }

            let d = document.createElement('div');
            d.id = `info${INSTRUCTION_SET_INFO[title].url.length}`;
            instructionInfoHolder.append(d);
            document.getElementById(`info${INSTRUCTION_SET_INFO[title].url.length}`).innerHTML += '<div class="infoEndOfInfo"></div>';

            // change the url
            if(!backButton){
                const url = window.location.href.split(/instructionset/i)[0];
                const newUrl = `${url}instructionset/${title}`;
                // console.log(newUrl);
                history.pushState({id:'6502 - instructionset'},'6502 - instructionset', newUrl);
            }
            backButton = false;

        }
        else{
            instructionInfoHolder.innerHTML = 'NO INFO FOUND ON THIS';
        }
    });
}

// prevent the routerlink to acctually do anything.
// needed for SEO
for(let i = 0; i < routerLinkList.length; i ++){
    routerLinkList[i].addEventListener('click', (e) => {
    
        e.preventDefault();
    
    });
}

//-----------------------------------------------------------------------
//  functions
//-----------------------------------------------------------------------

// init site
function init(){

    disclaimerText.innerHTML = DISCLAIMER;
    disclaimerButton.focus();

    urlHandler();
}

// do the url stuff
function urlHandler(){

    let found = false;

    const url = window.location.href;

    const urlSplit = url.split(/instructionset/i);
    const urlInstruction = urlSplit[1].split('/')[1].toUpperCase();

    //go through the list of instructions an click the right one 
    for(let i = 0; i < instructionHoldertList.length; i ++){
        const title = instructionHoldertList[i].querySelector('.instructionTitle').innerHTML.toUpperCase().trim().replace(/ /g,'');

        if(title === urlInstruction){
            instructionHoldertList[i].click();
            instructionHoldertList[i].scrollIntoView();
            found = true;
            break;
        }
    }

    if(!found){
        backButton = false;
    }

}

// search for stuff
function search(term){

    let found = false;
    let element = '';

    let reg = `^`;

    // create the regex
    // make a list fo the terms
    const termList = term.split(' ');
    for(let q = 0; q < termList.length; q ++){
        reg += `(?=.*?\\b${termList[q]}\\b)`;
    }
    reg += `.*$`;

    const re = new RegExp(reg,'gi');

    // go through the list and check the tags
    for(let i = lastFoundElementPos; i <instructionHoldertList.length; i++){
        // search the tags
        if(instructionHoldertList[i].dataset.tags){

            let tags = instructionHoldertList[i].dataset.tags;
            // if the element has a full name div add that to the tags
            if(instructionHoldertList[i].querySelector('.instructionFullName')){
                tags += ` ${instructionHoldertList[i].querySelector('.instructionFullName').innerHTML} `;
            }

            if(tags.replace(/\n/g,'').match(re)){
                found = true;
                element = instructionHoldertList[i];
                // set the new place to search from
                lastFoundElementPos = i+1;
                // make sure it wraps around
                if(lastFoundElementPos >= instructionHoldertList.length){
                    lastFoundElementPos = 0;
                }
                break;
            }
        }
    }

    if(found){
        nothingFoundMessage.style.visibility = 'hidden';
        // clear the click
        highlightClickedElement(lastClickedElement, false);

        // scroll the element into view
        element.scrollIntoView();
        // deheighlight the last found element
        highlightFoundElement(lastFoundElement, false);
        // highlight the found element
        highlightFoundElement(element, true);
        // save new found element as last element
        lastFoundElement = element;
        // click the element
        element.click();
    }
    else if(lastFoundElementPos != 0){
        // reset the search position and search again
        lastFoundElementPos = 0;
        search(term);
    }
    else{
        // dehieghlight last element found
        highlightFoundElement(lastFoundElement, false);
        // show nothing found message
        nothingFoundMessage.style.visibility = 'visible';
    }
}


// function to turn the text and lines to a certain color
function highlightFoundElement(element, highlight){

    if(element){
        if(highlight){
            element.classList.add('found');
        }
        else{
            element.classList.remove('found');
        }
    }
}

// function to turn the text and lines to a certain color
function highlightClickedElement(element, highlight){

    if(element){
        if(highlight){
            element.classList.add('clicked');
        }
        else{
            element.classList.remove('clicked');
        }
    }
}




// initialize the site
init();