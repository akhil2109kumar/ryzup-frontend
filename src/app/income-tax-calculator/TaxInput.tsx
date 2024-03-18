import {ChangeEvent} from 'react'

type TaxInputProps = {
    title: string
    onChangeTaxInput: (e: ChangeEvent) => void
    taxInputVal: string
}

const TaxInput = ({title, onChangeTaxInput, taxInputVal}: TaxInputProps) => {
    return (
        <div className="flex justify-between mb-4">
        <p>{title}</p>
        <input type="text" className="w-30 h-8 border border-gray-200 rounded px-2" style={{ caretColor: 'var(--green500)' }} value={taxInputVal} onChange={onChangeTaxInput}/>
      </div>
    )
}

export default TaxInput;