document.addEventListener('DOMContentLoaded', () => {
    // EMI Calculator Elements
    const loanAmount = document.getElementById('loan_amount');
    const interestRate = document.getElementById('interest_rate');
    const loanYears = document.getElementById('loan_years');
    const loanTermType = document.getElementById('loan_term_type');
    const monthlyEMI = document.getElementById('monthly_emi');
    const totalInterest = document.getElementById('total_interest');
    const totalPayment = document.getElementById('total_payment');
    const emiResetButton = document.getElementById('emiResetBtn');

    // EMI Calculator Function
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

    // Event Listeners
    loanAmount.addEventListener('input', calculateEMI);
    interestRate.addEventListener('input', calculateEMI);
    loanYears.addEventListener('input', calculateEMI);
    loanTermType.addEventListener('change', calculateEMI);

    // Reset Function
    emiResetButton.addEventListener('click', () => {
        loanAmount.value = '';
        interestRate.value = '';
        loanYears.value = '';
        loanTermType.value = 'years';
        monthlyEMI.textContent = '0';
        totalInterest.textContent = '0';
        totalPayment.textContent = '0';
    });

    // Initial calculation
    calculateEMI();
}); 