async function fetchCategories() {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('https://pk1bfm0q-8000.uks1.devtunnels.ms/items/categories/', {
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
        console.log("categories", data);
        loadCategories(data, 'categoryList', document.getElementById('category'), document.getElementById('categoryTwo'));
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

document.getElementById('categoryForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const categoryName = document.getElementById('categoryName')?.value;
    const button = document.getElementById('addCategoryBtn');
    const originalText = button?.textContent;
    if (button) button.textContent = "Adding...";
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('https://pk1bfm0q-8000.uks1.devtunnels.ms/items/category/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({ name: categoryName })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        alert('Category added successfully!');
        fetchCategories();
        document.getElementById('categoryName').value = '';
    } catch (error) {
        console.error('Error adding category:', error);
        alert(error.message);
    } finally {
        if (button) button.textContent = originalText;
    }
});

document.getElementById('unitForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const unitName = document.getElementById('unitName')?.value;
    const button = document.getElementById('addUnitBtn');
    const originalText = button?.textContent;
    if (button) button.textContent = "Adding...";
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('https://pk1bfm0q-8000.uks1.devtunnels.ms/items/unit/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({ name: unitName })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        alert('unit added successfully!');
        fetchUnits();
        document.getElementById('unitName').value = '';
    } catch (error) {
        console.error('Error adding unit:', error);
        alert(error.message);
    } finally {
        if (button) button.textContent = originalText;
    }
});


async function fetchUnits() {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('https://pk1bfm0q-8000.uks1.devtunnels.ms/items/units/', {
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
        console.log("units", data);
        loadUnits(data, 'unitList', document.getElementById('unit'), document.getElementById('unitTwo'));
    } catch (error) {
        console.error('Error fetching archives:', error);
    }
}

function loadCategories(data, categoryListId, ...dropdowns) {
    const categoryList = document.getElementById(categoryListId);
    categoryList.innerHTML = ''; // Clear the existing list

    dropdowns.forEach(dropdown => {
        dropdown.innerHTML = ''; // Clear existing options for each dropdown
    });

    data.forEach(item => {
        // Populate the category list
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name}`;
        categoryList.appendChild(listItem);

        // Create option element for each dropdown
        dropdowns.forEach(dropdown => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            dropdown.appendChild(option);
        });
    });
}

function loadUnits(data, unitListId, ...dropdowns) {
    const unitList = document.getElementById(unitListId);
    unitList.innerHTML = ''; // Clear the existing list

    dropdowns.forEach(dropdown => {
        dropdown.innerHTML = ''; // Clear existing options for each dropdown
    });

    data.forEach(item => {
        // Populate the unit list
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name}`;
        unitList.appendChild(listItem);

        // Create option element for each dropdown
        dropdowns.forEach(dropdown => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            dropdown.appendChild(option);
        });
    });
}



// Call both fetchItemData and fetchArchiveData when the page loads
window.onload = () => {
    fetchItemData();
    fetchArchiveData();
    fetchCategories();
    fetchUnits();
};