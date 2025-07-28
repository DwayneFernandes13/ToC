const cryptoFilter = document.getElementById('crypto-filter');
const sortBy = document.getElementById('sort-by');
const tableBody = document.querySelector('#site-table tbody');

cryptoFilter.addEventListener('change', filterAndSort);
sortBy.addEventListener('change', filterAndSort);

function filterAndSort() {
    const crypto = cryptoFilter.value;
    const sort = sortBy.value;
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    // Filter by crypto
    rows.forEach(row => {
        const cryptos = row.dataset.crypto.split(',');
        row.classList.toggle('hidden', crypto !== 'all' && !cryptos.includes(crypto));
    });

    // Sort rows
    const visibleRows = rows.filter(row => !row.classList.contains('hidden'));
    visibleRows.sort((a, b) => {
        if (sort === 'rating') {
            return b.dataset.rating - a.dataset.rating;
        } else {
            return b.dataset.bonus - a.dataset.bonus;
        }
    });

    tableBody.innerHTML = '';
    visibleRows.forEach(row => tableBody.appendChild(row));
}