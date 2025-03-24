document.addEventListener('DOMContentLoaded', () => {
    // Percentage Calculator Elements
    const calc1X = document.getElementById('calc1_x');
    const calc1Y = document.getElementById('calc1_y');
    const result1 = document.getElementById('result1');

    const calc2X = document.getElementById('calc2_x');
    const calc2Y = document.getElementById('calc2_y');
    const result2 = document.getElementById('result2');

    const calc3Origin = document.getElementById('calc3_origin');
    const calc3New = document.getElementById('calc3_new');
    const result3 = document.getElementById('result3');

    const resetButton = document.getElementById('resetBtn');

    // Percentage Calculator Functions
    function calculatePercentageOf() {
        const x = parseFloat(calc1X.value) || 0;
        const y = parseFloat(calc1Y.value) || 0;
        const result = (x / 100) * y;
        result1.textContent = result.toFixed(2);
    }

    function calculateWhatPercentage() {
        const x = parseFloat(calc2X.value) || 0;
        const y = parseFloat(calc2Y.value) || 0;
        const result = y !== 0 ? (x / y) * 100 : 0;
        result2.textContent = result.toFixed(2) + '%';
    }

    function calculatePercentageChange() {
        const origin = parseFloat(calc3Origin.value) || 0;
        const newValue = parseFloat(calc3New.value) || 0;
        const result = origin !== 0 ? ((newValue - origin) / origin) * 100 : 0;
        result3.textContent = result.toFixed(2) + '%';
    }

    // Event Listeners
    calc1X.addEventListener('input', calculatePercentageOf);
    calc1Y.addEventListener('input', calculatePercentageOf);

    calc2X.addEventListener('input', calculateWhatPercentage);
    calc2Y.addEventListener('input', calculateWhatPercentage);

    calc3Origin.addEventListener('input', calculatePercentageChange);
    calc3New.addEventListener('input', calculatePercentageChange);

    // Reset Function
    resetButton.addEventListener('click', () => {
        calc1X.value = '';
        calc1Y.value = '';
        result1.textContent = '0';

        calc2X.value = '';
        calc2Y.value = '';
        result2.textContent = '0';

        calc3Origin.value = '';
        calc3New.value = '';
        result3.textContent = '0';
    });

    // Initial calculations
    calculatePercentageOf();
    calculateWhatPercentage();
    calculatePercentageChange();
}); 