//@ts-ignore

export function calculateIncomeTax(financialYear, ageGroup, incomeDetailsArray, deductions, hraExemptions) {
    // Tax slabs for FY 2023-2024 (updated)
    const taxSlabs = [
        { min: 0, max: 250000, rate: 0 },
        { min: 250001, max: 500000, rate: 0.05 },
        { min: 500001, max: 1000000, rate: 0.2 },
        { min: 1000001, max: Infinity, rate: 0.3 }
    ];

    // Calculate total income from incomeDetailsArray
    let totalIncome = 0;
    for (const incomeDetail of incomeDetailsArray) {
        const incomeValue = parseInt(incomeDetail[Object.keys(incomeDetail)[0]]) || 0;
        totalIncome += incomeValue;
    }

    // Deduct deductions
    let totalDeductions = 0;
    for (const deduction of deductions) {
        totalDeductions += parseInt(deduction[Object.keys(deduction)[0]]) || 0;
    }

    let taxableIncome = totalIncome - totalDeductions;

    // Apply HRA exemptions
    let totalExemptions = 0;
    for (const exemption of hraExemptions) {
        totalExemptions += parseInt(exemption[Object.keys(exemption)[0]]) || 0;
    }

    taxableIncome -= totalExemptions;

    console.log("taxableIncome",taxableIncome)
    // Calculate tax
    let tax = 0;
    let remainingIncome = taxableIncome;
    for (const slab of taxSlabs) {
        if (remainingIncome <= 0) break;
        const amountInSlab = Math.min(remainingIncome, slab.max - slab.min);
        tax += amountInSlab * slab.rate;
        remainingIncome -= amountInSlab;
    }

    return tax;
}

// Example usage:
// const incomeDetailsArray = [
//     { "gross_salary_income": "1200000" },
//     { "annual_income_from_other_sources": "" },
//     { "annual_income_from_interest": "" },
//     { "annual_income_from_house_property_rental_income_": "" },
//     { "annual_interest_paid_on_home_loan_self_occupied": "" },
//     { "annual_interest_paid_on_home_loan_let_out": "" }
// ];

// const deductions = [
//     { name: 'basic_deductions_u/s_80C', amount: 150000 },
//     { name: 'contribution_to_NPS_u/s_80CCD(1B)', amount: 50000 },
//     { name: 'medical_insurance_premium_u/s_80D', amount: 25000 },
//     { name: 'donation_to_charity_u/s_80G', amount: 10000 },
//     { name: 'interest_on_educational_loan_u/s_80E', amount: 20000 },
//     { name: 'interest_on_deposits_in_saving_account_u/s_80TTA/TTB', amount: 10000 }
// ];

// const hraExemptions = [
//     { name: 'hra', amount: 20000 },
//     { name: 'lta', amount: 15000 },
//     { name: 'professional_tax_and_any_other_exemptions', amount: 5000 }
// ];

// const financialYear = "FY 2023-2024";
// const ageGroup = "Below 60";

// const tax = calculateIncomeTax(financialYear, ageGroup, incomeDetailsArray, deductions, hraExemptions);
// console.log("Income Tax:", tax);
