import {convert, getRequiredParams, useRegex} from './test.js'

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")
const mp4Btn = document.getElementById("mp4-btn")
const itemsContainerEl = document.getElementById("wrapper")


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

let link = ''

mp4Btn.addEventListener('click', async () => {
    link = inputEl.value
    if (!useRegex(link)){
        alert('Invalid link')
        document.getElementById('loading').style.display = 'none';
        return
    }
    document.getElementById('loading').style.display = 'flex';

    let result = await convert(link)
    console.log(result)
    let stuff =  getRequiredParams(result)
    // console.log(stuff)
    let topComponent = `
<div class="top-download-section">
    <img src="${stuff.thumbnail[0].url}" alt="" class="tn">
    <div class="text-container">
        <p class="name-el">Title: ${stuff.title}</p>
        <p class="length-el">Length: ${stuff.lis}</p>
    </div>
</div>
<div class="display-items">
    <div class="headers">
        <p>QUALITY</p>
        <p>ACTION</p>
    </div>
</div>`
    // console.log(inputEl)
    itemsContainerEl.innerHTML = topComponent;
    // <div class="items"></div>
    let elements = ''

    let url = Object.values(stuff.urls)
   let quality =  Object.values(stuff.quality)

   console.log(url, quality)
   for(let i = 0; i < url.length; i++){
    elements += `
        <div class="inner-items">
            <p>${quality[i].toUpperCase()}</p>
            <a href="${url[i]}" target="_blank"> <button> Download </button> </a>
        </div>
    `
   }
   let mainComponent = `
    ${elements}
  
   `
   itemsContainerEl.innerHTML += mainComponent;
    document.getElementById('loading').style.display = 'none';
    console.log(stuff)
    console.log(mainComponent)
})

// Get a reference to the tab button element
tabBtn.addEventListener("click", function() {
    // Query the currently active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // Add the URL of the active tab to the myLeads array
        myLeads.push(tabs[0].url);
        // Store the updated myLeads array in localStorage
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        // Render the updated list of leads
        render(myLeads);
    });
    // console.log("Clicked") // Debugging log
});


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})