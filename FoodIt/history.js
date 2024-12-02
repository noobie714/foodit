window.addEventListener('load', () => {
    const cartHistory = JSON.parse(localStorage.getItem('cartHistory')) || [];
    const historyContainer = document.querySelector('.historyContainer');

    if (cartHistory.length === 0) {
        historyContainer.innerHTML = '<p>No history available.</p>';
        return;
    }

    cartHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <div>${item.name} (₱${item.price}) x ${item.quantity}</div>
            <div>Date: ${item.date || new Date().toLocaleString()}</div>
        `;
        historyContainer.appendChild(historyItem);
    });
});
