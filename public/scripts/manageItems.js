let currentItemId = null;

async function fetchItemData() {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('http://127.0.0.1:8000/items/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        loadItemData(data);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}


async function fetchArchiveData() {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('http://127.0.0.1:8000/items/archives/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        loadArchiveData(data);
    } catch (error) {
        console.error('Error fetching archives:', error);
    }
}

function archiveItem(event) {
    const button = event.target;
    const row = button.closest('tr');
    const id = row ? row.id : null;
    const token = localStorage.getItem('authToken');

    if (!id) {
        console.error("ID not found for the row. Ensure each item has a unique ID.");
        return;
    }

    fetch(`http://127.0.0.1:8000/items/archive/${id}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            fetchItemData();
            fetchArchiveData();
        })
        .then(() => {
            alert('Item archived successfully!');
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
}


function restoreArchive(event) {
    const button = event.target;
    const row = button.closest('tr');
    const id = row ? row.id : null;
    const token = localStorage.getItem('authToken');

    if (!id) {
        console.error("ID not found for the row. Ensure each item has a unique ID.");
        return;
    }

    fetch(`http://127.0.0.1:8000/items/restore/${id}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            fetchItemData();
            fetchArchiveData();
        })
        .then(() => {
            alert('Item restored successfully!');
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
}


function deleteArchive(event) {
    const button = event.target;
    const row = button.closest('tr');
    const id = row ? row.id : null;
    const token = localStorage.getItem('authToken');

    if (!id) {
        console.error("ID not found for the row. Ensure each item has a unique ID.");
        return;
    }

    fetch(`http://127.0.0.1:8000/items/delete/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            fetchItemData();
            fetchArchiveData();
        })
        .then(() => {
            alert('Item deleted successfully!');
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
}


function loadArchiveData(data) {
    const tableBody = document.getElementById('archiveBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('divide-x-2', 'divide-red');
        row.id = item.id; // Assign item.id to the row

        row.innerHTML = `
          <td class="p-3 text-center">${data.indexOf(item) + 1}</td>
          <td class="p-3 text-center">${item.name}</td>
          <td class="p-3 text-center">${item.category}</td>
          <td class="p-3 text-center">${item.quantity}</td>
          <td class="p-3 text-center">${item.unit}</td>
          <td class="p-3 text-center">
            <button id="restoreBtn" type="Button" class="text-blue-600 mr-3 restoreButton">Restore</button>
            <button id="deleteBtn" type="Button"  class="text-red-600 deleteButton">Delete</button>
          </td>
        `;

        tableBody.appendChild(row);

        // Attach a single event listener to the table body for event delegation
        tableBody.addEventListener('click', function (event) {
            if (event.target && event.target.classList.contains('restoreButton')) {
                restoreArchive(event);
            }
            if (event.target && event.target.classList.contains('deleteButton')) {
                deleteArchive(event);
            }
        });
    });
}

function loadItemData(data) {
    const tableBody = document.getElementById('itemsBody');
    const updateForm = document.getElementById('updateForm'); // Get the update form
    const closeButton = document.getElementById("close2"); // Get the close button
    const updateItemForm = document.getElementById('updateItemForm');
    const nameInput = document.getElementById('nameTwo');
    const categoryInput = document.getElementById('categoryTwo');
    const quantityInput = document.getElementById('quantityTwo');
    const reorderQuantityInput = document.getElementById('reorder-quantityTwo');
    const unitInput = document.getElementById('unitTwo');
    const priceInput = document.getElementById('priceTwo');
    const descriptionInput = document.getElementById('descriptionTwo');

    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('divide-x-2', 'divide-red');
        row.id = item.id; // Assign item.id to the row
        row.dataset.name = item.name.toLowerCase(); // Store name in lowercase for filtering

        if (item.quantity <= item.reorder_quantity) {
            row.classList.add('bg-red-400', 'text-white');
        }

        row.innerHTML = `
          <td class="p-3 text-center">${data.indexOf(item) + 1}</td>
          <td class="p-3 text-center">${item.name}</td>
          <td class="p-3 text-center">${item.category}</td>
          <td class="p-3 text-center">${item.quantity}</td>
          <td class="p-3 text-center">${item.unit}</td>
          <td class="p-3 text-center">
            <button class="text-blue-600 mr-3 updateBtn" type="button">Update</button>
            <button class="text-red-600 archiveBtn" type="button">Archive</button>
          </td>
        `;
        tableBody.appendChild(row);
    });

    // Event delegation on the table body for updating items
    tableBody.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('updateBtn')) {
            const row = event.target.closest('tr');
            const itemId = parseInt(row.id, 10); // Ensure itemId is an integer
            const item = data.find(d => d.id === itemId);
            currentItemId = row.id;

            // Populate the update form fields with item data
            if (item) {
                nameInput.value = item.name;
                quantityInput.value = item.quantity;
                reorderQuantityInput.value = item.reorder_quantity;
                priceInput.value = item.price;
                descriptionInput.value = item.description;

                // Set selected category by matching name to find the correct ID
                Array.from(categoryInput.options).forEach(option => {
                    if (option.textContent === item.category) {
                        categoryInput.value = option.value; // Set the category ID as value
                    }
                });

                // Set selected unit by matching name to find the correct ID
                Array.from(unitInput.options).forEach(option => {
                    if (option.textContent === item.unit) {
                        unitInput.value = option.value; // Set the unit ID as value
                    }
                });
            }

            // Show the update form
            updateForm.classList.remove('hidden');
        }

        if (event.target && event.target.classList.contains('archiveBtn')) {
            archiveItem(event);
        }
    });

    // Attach an event listener to the close button to hide the form
    closeButton.addEventListener('click', function () {
        updateForm.classList.add('hidden');
    });
}




function filterItems() {
    const searchInput = document.getElementById('searchItems').value.toLowerCase();
    const rows = document.querySelectorAll('#itemsBody tr');

    rows.forEach(row => {
        const itemName = row.dataset.name;
        row.style.display = itemName.includes(searchInput) ? '' : 'none';
    });
}


function filterArchives() {
    const searchInput = document.getElementById('searchArchives').value.toLowerCase();
    const rows = document.querySelectorAll('#archiveBody tr');

    rows.forEach(row => {
        const itemName = row.dataset.name;
        row.style.display = itemName.includes(searchInput) ? '' : 'none';
    });
}


function createItem(event) {
    event.preventDefault();
    const addItemForm = document.getElementById('addItemForm');
    const button = document.getElementById('addFormData');
    const originalText = button?.textContent;
    const token = localStorage.getItem('authToken');
    if (button) button.textContent = "Add...";
    const modal = document.getElementById('itemForm');

    const data = {
        name: document.getElementById('name').value || '',
        description: document.getElementById('description').value || '',
        quantity: document.getElementById('quantity').value || '',
        reorder_quantity: document.getElementById('reorder-quantity').value || '',
        price: document.getElementById('price').value || '',
        category_id: parseInt(document.getElementById('category').value) || 1,
        unit_id: parseInt(document.getElementById('unit').value) || 1
    };

    console.log(data);

    fetch('http://127.0.1:8000/items/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding item');
            }
            return response.json();
        })
        .then(data => {
            alert('Item added successfully!');
            fetchItemData();
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        })
        .finally(() => {
            modal.classList.add('hidden');
            button.textContent = originalText;
        });
}


function updateItem(event) {
    event.preventDefault();
    const updateItemForm = document.getElementById('updateItemForm');
    const button = document.getElementById('updateFormData');
    const originalText = button?.textContent;
    const token = localStorage.getItem('authToken');
    if (button) button.textContent = "Updating...";
    const modal = document.getElementById('updateForm');

    const data = {
        name: document.getElementById('nameTwo').value || '',
        description: document.getElementById('descriptionTwo').value || '',
        quantity: document.getElementById('quantityTwo').value || '',
        reorder_quantity: document.getElementById('reorder-quantityTwo').value || '',
        price: document.getElementById('priceTwo').value || '',
        category_id: parseInt(document.getElementById('categoryTwo').value) || 1,
        unit_id: parseInt(document.getElementById('unitTwo').value) || 1
    };


    fetch(`http://127.0.1:8000/items/update/${currentItemId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error updating item');
            }
            return response.json();
        })
        .then(data => {
            alert('Item updated successfully!');
            fetchItemData();
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        })
        .finally(() => {
            modal.classList.add('hidden');
            button.textContent = originalText;
        });
}


document.getElementById('addFormData').addEventListener('click', createItem);
document.getElementById('updateFormData').addEventListener('click', updateItem);


// Call both fetchItemData and fetchArchiveData when the page loads
window.onload = () => {
    fetchItemData();
    fetchArchiveData();
};

