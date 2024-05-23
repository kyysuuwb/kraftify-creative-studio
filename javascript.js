document.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash;
    if (hash) {
        const targetId = hash.substring(1);
        document.querySelectorAll('.hide-con').forEach(function (container) {
            if (container.id === targetId) {
                container.style.display = 'flex';
            } else {
                container.style.display = 'none';
            }
        });
    }

    const subscribeButton = document.getElementById('subscribeButton');
    subscribeButton.addEventListener('click', function(event) {
        event.preventDefault();
        const emailInput = document.getElementById('emailInput');
        const email = emailInput.value.trim();
        if (email) {
            alert('Thank you for signing up!');
            emailInput.value = '';
        }
        else {

        }
    });
});

function showPlanner() {
    document.querySelector('#digisetup').style.display = 'none';
    document.querySelector('#planner').style.display = 'flex';
}

function showSetup() {
    document.querySelector('#planner').style.display = 'none';
    document.querySelector('#digisetup').style.display = 'flex';
}

function updateCartItemCount() {
    const itemCountElement = document.getElementById('cartItemCount');
    const titles = JSON.parse(sessionStorage.getItem('productTitles')) || [];
    const count = titles.length;
    itemCountElement.textContent = `${count}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.color-opt button');
    const colordisplay = document.getElementById('colordisplay');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const color = button.value;
            colordisplay.value = color;
        });
    });
});

// add to cart
function addToCart(title, price, color = '') {
    let titles = JSON.parse(sessionStorage.getItem('productTitles')) || [];
    let prices = JSON.parse(sessionStorage.getItem('productPrices')) || [];
    let colors = JSON.parse(sessionStorage.getItem('productColors')) || [];
    let quantities = JSON.parse(sessionStorage.getItem('productQuantities')) || [];

    const index = titles.indexOf(title);
    if (index !== -1) {
        alert('This item has been added to the cart.');
        return;
    }

    titles.push(title);
    prices.push(price);
    colors.push(color);
    quantities.push(1);
    sessionStorage.setItem('productTitles', JSON.stringify(titles));
    sessionStorage.setItem('productPrices', JSON.stringify(prices));
    sessionStorage.setItem('productColors', JSON.stringify(colors));
    sessionStorage.setItem('productQuantities', JSON.stringify(quantities));
    updateCartItemCount();
}

document.querySelectorAll('.transferBtn').forEach(btn => {
    btn.addEventListener('click', function () {
        const productDiv = this.closest('.right-column');
        const titleElement = productDiv.querySelector('.wp-title');
        const title = titleElement ? titleElement.innerText : '';
        const priceElement = productDiv.querySelector('.prod-price');
        const price = priceElement ? priceElement.innerText : '';
        const colorBtn = productDiv.querySelector('.color-opt button.selected');

        let color = '';
        if (colorBtn) {
            color = colorBtn.innerText;
        }

        addToCart(title, price, color);
    });
});

updateCartItemCount();

document.querySelectorAll('.color-opt button').forEach(btn => {
    btn.addEventListener('click', function () {
        const selectedBtn = document.querySelector('.color-opt button.selected');
        if (selectedBtn) {
            selectedBtn.classList.remove('selected');
        }
        this.classList.add('selected');
    });
});

function toggleInfoForm() {
    var col = document.querySelector('.col');
    var cartItemCount = parseInt(document.getElementById('cartItemCount').textContent);

    if (cartItemCount > 0) {
        col.classList.toggle('hidden');
        var nameInput = document.querySelector('input[name="csname"]');
        var addressInput = document.querySelector('input[name="address"]');
        var contactInput = document.querySelector('input[name="contact"]');
        var cashInput = document.querySelector('input[name="cash"]');

        if (nameInput.value && addressInput.value && contactInput.value && cashInput.value) {
            var totalPriceElement = document.querySelector('.totalprice');
            var totalPrice = parseFloat(totalPriceElement.textContent.replace(/[^\d.]/g, ''));

            var cashGiven = parseFloat(cashInput.value);
            if (cashGiven >= totalPrice) {
                var change = cashGiven - totalPrice;
                var changeLabel = document.querySelector('.changelbl');
                changeLabel.textContent = '₱ ' + change.toFixed(2);

                // Get cart details from session storage
                var titles = JSON.parse(sessionStorage.getItem('productTitles')) || [];
                var prices = JSON.parse(sessionStorage.getItem('productPrices')) || [];
                var quantities = JSON.parse(sessionStorage.getItem('productQuantities')) || [];

                var orderDetails = `Name: ${nameInput.value}\nAddress: ${addressInput.value}\nContact: ${contactInput.value}\n\nProducts:\n`;
                titles.forEach((title, index) => {
                    var price = prices[index];
                    var quantity = quantities[index];
                    var subtotal = parseFloat(price.replace(/[^\d.]/g, '')) * quantity;
                    orderDetails += `${index + 1}. ${title} - ${price} x ${quantity} = ₱ ${subtotal.toFixed(2)}\n`;
                });

                orderDetails += `\nTotal Price: ₱ ${totalPrice.toFixed(2)}\nCash: ₱ ${cashGiven.toFixed(2)}\nChange: ₱ ${change.toFixed(2)}`;

                alert('Order successful!\n\n' + 'ORDER DETAILS\n' + orderDetails + 
                '\n\nTHANK YOU FOR YOUR ORDER!');

                sessionStorage.removeItem('productTitles');
                sessionStorage.removeItem('productPrices');
                sessionStorage.removeItem('productColors');
                sessionStorage.removeItem('productQuantities');
                document.getElementById('cartItemCount').textContent = '0';
                nameInput.value = '';
                addressInput.value = '';
                contactInput.value = '';
                cashInput.value = '';
                window.location.href = 'typage.html';
            } else {
                alert('Insufficient funds.');
            }
        } else {
            alert('Please fill in all input fields before checking out.');
        }
    } else {
        alert('Your cart is empty. Add an item to proceed with checkout.');
    }
}
