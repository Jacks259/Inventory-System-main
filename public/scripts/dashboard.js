const addFormData = document.getElementById("addFormData");
const addItemButton = document.getElementById("addItemBtn");
const closeButton = document.getElementById("close");
const itemForm = document.getElementById("itemForm");

// this code shows the form to add a new item
addItemButton.addEventListener("click", () =>
    itemForm.classList.remove("hidden")
);

// this code closes the form
closeButton.addEventListener("click", () =>
    itemForm.classList.add("hidden")
);

// This function is responsible for creating a new data and adding it to the inventry list
function handleAddItem() {
    const randomId = crypto.randomUUID().split("-")[0];
    const date = new Date().toLocaleDateString();

    const itemName = document.getElementById("name");
    const itemQuantity = document.getElementById("quantity");
    const itemPrice = document.getElementById("price");

    if (!itemName.value || !itemQuantity.value || !itemPrice.value) return;

    let html = `
                <td class="w-24 p-3 text-sm font-semibold tracking-wide text-center">${randomId}</td>
                <td class="p-3 text-sm font-semibold tracking-wide text-center">${date}</td>
                <td class="p-3 text-sm font-semibold tracking-wide text-center">${itemName.value.trim()}</td>
                <td class="p-3 text-sm font-semibold tracking-wide text-center">${itemQuantity.value.trim()}</td>
                <td class="p-3 text-sm font-semibold tracking-wide text-center">${itemPrice.value.trim()}</td>
            `;

    const tableRow = document.createElement("tr");
    tableRow.classList.add("divide-x-2", "divide-red");
    tableRow.innerHTML = html;

    const dataTable = document.getElementById("dataTable");
    dataTable.appendChild(tableRow);

    itemName.value = "";
    itemQuantity.value = "";
    itemPrice.value = "";

    //console.log('item added');

    itemForm.classList.add("hidden");
}

// This code triggers and event that calls the handleAddItem() function
addFormData.addEventListener("click", (e) => {
    e.preventDefault(); // this line prevents the browser from reloading
    handleAddItem();
});

function showTab(tabId) {
    // Hide all tab content
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach((content) => {
        content.classList.add("hidden");
        content.classList.remove("block");
    });

    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll(".tab-item"); // Change selector to .tab-item
    tabs.forEach((tab) => {
        tab.classList.remove("bg-gray-700", "text-white");
        tab.querySelector("h3").classList.remove("text-white"); // Reset text color
        tab.querySelector("h3").classList.add("text-gray-600"); // Default text color
    });

    // Show the selected tab content
    const selectedContent = document.getElementById(tabId);
    selectedContent.classList.remove("hidden");
    selectedContent.classList.add("block");

    // Add 'active' class to the selected tab
    const selectedTab = [...tabs].find((tab) =>
        tab.getAttribute("onclick").includes(tabId)
    );
    selectedTab.classList.add("bg-gray-700");
    selectedTab.querySelector("h3").classList.add("text-white"); // Change text color to white
}

// Set the default tab to "analytics"
showTab("manageItems");
