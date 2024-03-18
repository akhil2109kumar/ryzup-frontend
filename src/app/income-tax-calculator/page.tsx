'use client'
import { useState, ChangeEvent } from 'react';
import Accordion from '../../components/Shared/Accordian/Accordian';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CalculatedTaxCard from './CaluclatedTaxCard';
import { calculateIncomeTax } from '@/utils/income-tax-elgo';


const financialYearOptions = ["FY 2024-2025", "FY 2023-2024"];
const ageOptions = ["Below 60", "60 or above 60", "80 or above 80"];
const IncomeInputs = [
  { name: 'gross_salary_income', title: 'Gross salary income' },
  { name: 'annual_income_from_other_sources', title: 'Annual income from other sources' },
  { name: 'annual_income_from_interest', title: 'Annual income from interest' },
  { name: 'annual_income_from_house_property_rental_income_', title: 'Annual income from house property(rental income)' },
  { name: 'annual_interest_paid_on_home_loan_self_occupied', title: 'Annual interest paid on home loan(self - occupied)' },
  { name: 'annual_interest_paid_on_home_loan_let_out', title: 'Annual interest paid on home loan (let-out)' }
]

const Deductions = [
  { name: 'basic_deductions_u/s_80C', title: 'Basic deductions u/s 80C' },
  { name: 'contribution_to_NPS_u/s_80CCD(1B)', title: 'Contribution to NPS u/s 80CCD(1B)' },
  { name: 'medical_insurance_premium_u/s_80D', title: 'Medical Insurance Premium u/s 80D' },
  { name: 'donation_to_charity_u/s_80G', title: 'Donation to charity u/s 80G' },
  { name: 'interest_on_educational_loan_u/s_80E', title: 'Interest on Educational Loan u/s 80E' },
  { name: 'interest_on_deposits_in_saving_account_u/s_80TTA/TTB', title: 'Interest on deposits in saving account u/s 80TTA/TTB' }
]

const HRAExemption = [
  { name: 'hra', title: 'HRA' },
  { name: 'lta', title: 'LTA' },
  { name: 'professional_tax_and_any_other_exemptions', title: 'Professional Tax' }
]



const TextCalculator = () => {
  const [totalCalculatedTax, setTotalCalculatedTax] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<any>()



  const incomeAccordionItems = [
    {
      title: 'Income',
      content: (
        <div className="flex flex-col">
          {IncomeInputs.map(taxParams => {
            return (
              <div className="flex justify-between mb-4">
                <p>{taxParams.title}</p>
                <div className='bg-green-100'>
                  <input {...register(`Income6-${taxParams.name}`)} type="text" className="w-[82px] h-[30px] rounded px-2 text-black bg-green-100" style={{ backgroundColor: 'var(--green500)' }} />
                </div>
              </div>
            )
          })}
        </div>
      ),
    },
    {
      title: 'Deductions',
      content: (
        <div className="flex flex-col">
          {Deductions.map(taxParams => {
            return (
              <div className="flex justify-between mb-4">
                <p>{taxParams.title}</p>
                <div className='bg-green-100'>
                  <input {...register(`Deductions6-${taxParams.name}`)} type="text" className="w-[82px] h-[30px] rounded px-2 text-black bg-green-100" style={{ backgroundColor: 'var(--green500)' }} />
                </div>
              </div>
            )
          })}
        </div>
      ),
    },
    {
      title: 'HRA Exemption',
      content: (
        <div className="flex flex-col">
          {HRAExemption.map(taxParams => {
            return (
              <div className="flex mb-4">
                <div className="flex justify-between mb-4 w-full">
                  <p>{taxParams.title}</p>
                  <div className='bg-green-100'>
                    <input {...register(`HRAExemption3-${taxParams.name}`)} type="text" className="w-[82px] h-[30px] rounded px-2 text-black bg-green-100" style={{ backgroundColor: 'var(--green500)' }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ),
    },
  ];

  const handleSubmitForm = async (data: any) => {
    console.log("this is the value", data)
    const taxParams: any = {};

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key.includes("Income6")) {
          const name = key.split("-")[0];
          if (!taxParams[name]) taxParams[name] = [];
          //@ts-ignore
          taxParams[name].push({ [key.replace(/^Income6-/, '')]: data[key] });
        } else if (key.includes("Deductions6")) {
          const name = key.split("-")[0];
          if (!taxParams[name]) taxParams[name] = [];
          //@ts-ignore
          taxParams[name].push({ [key.replace(/^Deductions6-/, '')]: data[key] });
        } else if (key.includes("HRAExemption3")) {
          const name = key.split("-")[0];
          if (!taxParams[name]) taxParams[name] = [];
          //@ts-ignore
          taxParams[name].push({ [key.replace(/^HRAExemption3-/, '')]: data[key] });
        }
      }
    }

    const taxCalculated = calculateIncomeTax(data.financial_year, data.user_age, taxParams.Income6, taxParams.Deductions6, taxParams.HRAExemption3)
    
    setTotalCalculatedTax(taxCalculated)
    console.log(taxParams);
    console.log(calculateIncomeTax(data.financial_year, data.user_age, taxParams.Income6, taxParams.Deductions6, taxParams.HRAExemption3))
  }


  return (
    <div className="flex flex-col border border-gray-200 rounded p-4 w-[500px] mx-auto mt-[100px] bg-white">
      <h2 className="text-gray-800 font-bold">Indian Tax Calculator</h2>
      <p className="text-gray-600">Calculate your income tax liability for the selected financial year and age category.</p>
      <form className="mt-4" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="mb-4">
          <label htmlFor="financialYear" className="block text-sm font-medium text-gray-700">Financial Year</label>
          <select {...register('financial_year')} id="financialYear" name="financial_year" className="w-full py-4 bg-[#FDFDFD] text-[#6D6B83] border-b border-black outline-none">
            {financialYearOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <select {...register('user_age')} id="financialYear" name="user_age" className="w-full py-4 bg-[#FDFDFD] text-[#6D6B83] border-b border-black outline-none">
            {ageOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <Accordion items={incomeAccordionItems} />
        <div className="mt-4">
          <button disabled={isSubmitting} type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Calculate Tax</button>
        </div>
      </form>
      {
        isSubmitted && <CalculatedTaxCard oldRegimeTaxtitle='Total tax (Old regime)' totalOldRegimeTax={totalCalculatedTax} totalNewRegimeTax={277788} newRegimeTitle='Total tax (New regime)' />
      }
    </div>
  );
};

export default TextCalculator;
