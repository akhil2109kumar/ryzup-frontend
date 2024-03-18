type CalculatedTaxCardProps = {
    totalOldRegimeTax: number
    oldRegimeTaxtitle: string
    totalNewRegimeTax: number
    newRegimeTitle: string
}

const CalculatedTaxCard = ({ totalOldRegimeTax, oldRegimeTaxtitle, totalNewRegimeTax, newRegimeTitle }: CalculatedTaxCardProps) => {
    return (
        <div className="flex flex-col justify-center border border-gray-200 rounded p-4 w-[80%] mx-auto mt-[50px] bg-white">
            <div className="flex justify-between items-center mb-4">
                <p className="text-black text-md md:text-[12px] custom-text-align-righ">{oldRegimeTaxtitle}</p>
                <h3 className="text-2xl font-medium text-gray-800">₹{totalOldRegimeTax}</h3>
            </div>
        </div>
    )
}

export default CalculatedTaxCard;