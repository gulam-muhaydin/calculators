document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const costPrice = document.getElementById('cost_price');
    const sellingPrice = document.getElementById('selling_price');
    const amountDisplay = document.getElementById('amount');
    const percentageDisplay = document.getElementById('percentage');
    const resultText = document.getElementById('result_text');
    const resultContainer = document.getElementById('result_container');
    const calculateButton = document.getElementById('calculateBtn');
    const resetButton = document.getElementById('resetBtn');

    // Calculate profit/loss
    function calculateProfitLoss() {
        const cp = parseFloat(costPrice.value) || 0;
        const sp = parseFloat(sellingPrice.value) || 0;

        // Calculate difference
        const difference = sp - cp;
        const percentage = cp !== 0 ? (difference / cp) * 100 : 0;

        // Update amount
        amountDisplay.textContent = Math.abs(difference).toFixed(2);
        
        // Update percentage
        percentageDisplay.textContent = Math.abs(percentage).toFixed(2) + '%';

        // Update result text and styling
        if (difference > 0) {
            resultText.textContent = 'Profit';
            resultContainer.className = 'info-item highlight profit';
        } else if (difference < 0) {
            resultText.textContent = 'Loss';
            resultContainer.className = 'info-item highlight loss';
        } else {
            resultText.textContent = 'No Profit No Loss';
            resultContainer.className = 'info-item highlight neutral';
        }
    }

    // Event listeners
    calculateButton.addEventListener('click', calculateProfitLoss);

    // Reset function
    resetButton.addEventListener('click', () => {
        costPrice.value = '';
        sellingPrice.value = '';
        amountDisplay.textContent = '0';
        percentageDisplay.textContent = '0%';
        resultText.textContent = 'No profit no loss';
        resultContainer.className = 'info-item highlight neutral';
    });

    // Initial calculation
    calculateProfitLoss();
}); 