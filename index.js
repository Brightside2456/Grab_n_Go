let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


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