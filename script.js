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

    // Date Calculator Elements
    const dateFrom = document.getElementById('date_from');
    const dateTo = document.getElementById('date_to');
    const dateResult = document.getElementById('date_result');
    const yearsSpan = document.getElementById('years');
    const monthsSpan = document.getElementById('months');
    const weeksSpan = document.getElementById('weeks');
    const daysSpan = document.getElementById('days');

    // Reset Buttons
    const resetButton = document.getElementById('resetBtn');
    const dateResetButton = document.getElementById('dateResetBtn');

    // EMI Calculator Elements
    const loanAmount = document.getElementById('loan_amount');
    const interestRate = document.getElementById('interest_rate');
    const loanYears = document.getElementById('loan_years');
    const loanTermType = document.getElementById('loan_term_type');
    const monthlyEMI = document.getElementById('monthly_emi');
    const totalInterest = document.getElementById('total_interest');
    const totalPayment = document.getElementById('total_payment');
    const emiResetButton = document.getElementById('emiResetBtn');

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

    // Date Calculator Functions
    function calculateDateDifference() {
        if (!dateFrom.value || !dateTo.value) return;

        const fromDate = new Date(dateFrom.value);
        const toDate = new Date(dateTo.value);
        
        // Calculate the time difference in milliseconds
        const timeDiff = Math.abs(toDate - fromDate);
        
        // Calculate different units
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30.44); // Average month length
        const years = Math.floor(days / 365.25); // Account for leap years

        // Update the display
        dateResult.textContent = `${days} days`;
        yearsSpan.textContent = years;
        monthsSpan.textContent = months;
        weeksSpan.textContent = weeks;
        daysSpan.textContent = days;
    }

    // EMI Calculator Functions
    function calculateEMI() {
        // Get input values
        const principal = parseFloat(loanAmount.value) || 0;
        const rate = (parseFloat(interestRate.value) || 0) / 100 / 12; // Monthly interest rate
        let time = parseFloat(loanYears.value) || 0;
        
        // Convert years to months if necessary
        if (loanTermType.value === 'years') {
            time = time * 12;
        }

        // Calculate EMI
        let emi = 0;
        let totalAmount = 0;
        let interestAmount = 0;

        if (principal > 0 && rate > 0 && time > 0) {
            emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
            totalAmount = emi * time;
            interestAmount = totalAmount - principal;
        }

        // Update display
        monthlyEMI.textContent = emi.toFixed(2);
        totalInterest.textContent = interestAmount.toFixed(2);
        totalPayment.textContent = totalAmount.toFixed(2);
    }

    // Event Listeners for Percentage Calculator
    calc1X.addEventListener('input', calculatePercentageOf);
    calc1Y.addEventListener('input', calculatePercentageOf);

    calc2X.addEventListener('input', calculateWhatPercentage);
    calc2Y.addEventListener('input', calculateWhatPercentage);

    calc3Origin.addEventListener('input', calculatePercentageChange);
    calc3New.addEventListener('input', calculatePercentageChange);

    // Event Listeners for Date Calculator
    dateFrom.addEventListener('input', calculateDateDifference);
    dateTo.addEventListener('input', calculateDateDifference);

    // Event Listeners for EMI Calculator
    loanAmount.addEventListener('input', calculateEMI);
    interestRate.addEventListener('input', calculateEMI);
    loanYears.addEventListener('input', calculateEMI);
    loanTermType.addEventListener('change', calculateEMI);

    // Reset Functions
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

    dateResetButton.addEventListener('click', () => {
        dateFrom.value = '';
        dateTo.value = '';
        dateResult.textContent = '0 days';
        yearsSpan.textContent = '0';
        monthsSpan.textContent = '0';
        weeksSpan.textContent = '0';
        daysSpan.textContent = '0';
    });

    emiResetButton.addEventListener('click', () => {
        loanAmount.value = '';
        interestRate.value = '';
        loanYears.value = '';
        loanTermType.value = 'years';
        monthlyEMI.textContent = '0';
        totalInterest.textContent = '0';
        totalPayment.textContent = '0';
    });

    // Initial calculations
    calculatePercentageOf();
    calculateWhatPercentage();
    calculatePercentageChange();
    calculateEMI();
}); 