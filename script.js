const myForm = document.querySelector('#my-form');
const msg = document.querySelector('#msg');
const expenseInput = document.querySelector('#expense');
const descriptionInput = document.querySelector('#description');
const categoryInput = document.querySelector('#category');
const btn = document.querySelector('#btn');
const expenseList = document.querySelector("#expense-list");

btn.addEventListener('click', (e) => {
    e.preventDefault();

    if (expenseInput.value === '' || descriptionInput.value === '' || categoryInput.value === '') {
        msg.textContent = "*Please don't leave any field blank";
    } else if (localStorage.getItem(descriptionInput.value) !== null) {
        msg.textContent = `*${descriptionInput.value} is already present in the list`;
    } else {
        const li = document.createElement('tr');
        li.innerHTML = `
            <td>${expenseInput.value}</td>
            <td>${descriptionInput.value}</td>
            <td>${categoryInput.value}</td>
            <td>
                <button class="btn btn-sm btn-danger mx-1" data-description="${descriptionInput.value}">Delete</button>
                <button class="btn btn-sm btn-warning mx-1" data-description="${descriptionInput.value}">Edit</button>
            </td>
        `;
        expenseList.appendChild(li);

        // Store expense in local storage
        const expenseStorage = {
            expense: expenseInput.value,
            description: descriptionInput.value,
            category: categoryInput.value
        };
        localStorage.setItem(descriptionInput.value, JSON.stringify(expenseStorage));

        // Clear input fields and error message
        expenseInput.value = "";
        descriptionInput.value = "";
        categoryInput.value = "";
        msg.textContent = "";
    }
});

// Delete expense
expenseList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const description = e.target.dataset.description;
        const li = document.querySelector(`tr[data-description="${description}"]`);
        li.remove();
        localStorage.removeItem(description);
    }
});

// Edit expense
expenseList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Edit') {
        const description = e.target.dataset.description;
        const expenseStorage = JSON.parse(localStorage.getItem(description));

        expenseInput.value = expenseStorage.expense;
        descriptionInput.value = expenseStorage.description;
        categoryInput.value = expenseStorage.category;

        const li = document.querySelector(`tr[data-description="${description}"]`);
        li.remove();
        localStorage.removeItem(description);
    }
});