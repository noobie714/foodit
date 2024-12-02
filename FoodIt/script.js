let list = document.querySelectorAll('.list .item');
list.forEach(item => {
    item.addEventListener('click', function(event){
        if(event.target.classList.contains('add')){
            var itemNew = item.cloneNode(true);
            let checkIsset  = false;

            let listCart = document.querySelectorAll('.cart .item');
            listCart.forEach(cart =>{
                if(cart.getAttribute('data-key') == itemNew.getAttribute('data-key')){
                    checkIsset = true;
                    cart.classList.add('danger');
                    setTimeout(function(){
                        cart.classList.remove('danger');
                    },1000)
                }
            })
            if(checkIsset == false){
                document.querySelector('.listCart').appendChild(itemNew);
            }

        }
    })
})
function Remove($key){
    let listCart = document.querySelectorAll('.cart .item');
    listCart.forEach(item => {
        if(item.getAttribute('data-key') == $key){
            item.remove();
            return;
        }
    })
    document.addEventListener('DOMContentLoaded', function() {
        const feedbackForm = document.getElementById('feedbackForm');
        if (feedbackForm) {
            feedbackForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent the form from submitting the traditional way
    
                const feedbackText = document.getElementById('feedbackText').value;
                const feedbackMessages = document.getElementById('feedbackMessages');
    
                // Create a new feedback message element
                const newFeedback = document.createElement('div');
                newFeedback.textContent = feedbackText;
                newFeedback.style.border = '1px solid #ccc';
                newFeedback.style.padding = '10px';
                newFeedback.style.marginTop = '5px';
                newFeedback.style.borderRadius = '5px';
    
                // Append the new feedback message to the feedback messages container
                feedbackMessages.appendChild(newFeedback);
    
                // Clear the textarea
                document.getElementById('feedbackText').value = '';
            });
        }
    });


// Add to cart functionality
document.querySelectorAll('.add').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.parentElement.querySelector('.title').textContent;
        const productPrice = button.parentElement.querySelector('.price').textContent.replace('₱', '');
        const quantity = button.parentElement.querySelector('.count').value;

        // Create a cart item
        const cartItem = {
            name: productName,
            price: parseFloat(productPrice),
            quantity: parseInt(quantity),
        };

        // Retrieve the existing cart from sessionStorage
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        // Add the new item to the cart
        cart.push(cartItem);

        // Save updated cart back to sessionStorage
        sessionStorage.setItem('cart', JSON.stringify(cart));

        // Update cart display on the right side
        updateCartDisplay();

        alert(`${productName} added to your cart!`);
    });
});

// Function to dynamically update the cart display (on Home page)
function updateCartDisplay() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.listCart');

    // Clear the existing cart display
    cartContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div>${item.name} (₱${item.price}) x ${item.quantity}</div>
            <button class="remove-cart-item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Add remove functionality
    document.querySelectorAll('.remove-cart-item').forEach(button => {
        button.addEventListener('click', () => {
            const indexToRemove = parseInt(button.getAttribute('data-index'), 10);
            cart.splice(indexToRemove, 1);

            // Update sessionStorage and refresh the cart display
            sessionStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        });
    });
}

// Function for Done button to save cart to history and clear cart
function handleDoneButton() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is already empty!');
        return;
    }

    // Save the current cart items to localStorage (for history page)
    let history = JSON.parse(localStorage.getItem('cartHistory')) || [];
    history = history.concat(cart);
    localStorage.setItem('cartHistory', JSON.stringify(history));

    // Clear the cart from sessionStorage (reset the cart display)
    sessionStorage.removeItem('cart');
    updateCartDisplay();

    alert('Order completed! Items have been added to your history.');
}

// Attach event listener to the "Done" button
document.querySelector('.done-btn').addEventListener('click', handleDoneButton);

// Load the cart display when the page loads
window.addEventListener('load', updateCartDisplay);

}

// Add to cart functionality
document.querySelectorAll('.add').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.parentElement.querySelector('.title').textContent;
        const productPrice = button.parentElement.querySelector('.price').textContent.replace('₱', '');
        const quantity = button.parentElement.querySelector('.count').value;

        // Create a cart item
        const cartItem = {
            name: productName,
            price: parseFloat(productPrice),
            quantity: parseInt(quantity),
        };

        // Retrieve the existing cart from sessionStorage
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        // Add the new item to the cart
        cart.push(cartItem);

        // Save updated cart back to sessionStorage
        sessionStorage.setItem('cart', JSON.stringify(cart));

        // Update cart display on the right side
        updateCartDisplay();

        alert(`${productName} added to your cart!`);
    });
});

// Function to dynamically update the cart display (on Home page)
function updateCartDisplay() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.listCart');

    // Clear the existing cart display
    cartContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div>${item.name} (₱${item.price}) x ${item.quantity}</div>
            <button class="remove-cart-item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Add remove functionality
    document.querySelectorAll('.remove-cart-item').forEach(button => {
        button.addEventListener('click', () => {
            const indexToRemove = parseInt(button.getAttribute('data-index'), 10);
            cart.splice(indexToRemove, 1);

            // Update sessionStorage and refresh the cart display
            sessionStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        });
    });
}

// Function for Done button to save cart to history and clear cart
function handleDoneButton() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is already empty!');
        return;
    }

    // Save the current cart items to localStorage (for history page)
    let history = JSON.parse(localStorage.getItem('cartHistory')) || [];
    
    // Add a timestamp to each item (optional)
    cart.forEach(item => {
        item.date = new Date().toLocaleString();
    });

    // Append new items to history
    history = history.concat(cart);
    localStorage.setItem('cartHistory', JSON.stringify(history));

    // Clear the cart from sessionStorage (reset the cart display)
    sessionStorage.removeItem('cart');
    updateCartDisplay();

    alert('Order completed! Items have been added to your history.');
}

// Attach event listener to the "Done" button
document.querySelector('.done-btn').addEventListener('click', handleDoneButton);

// Load the cart display when the page loads
window.addEventListener('load', updateCartDisplay);
