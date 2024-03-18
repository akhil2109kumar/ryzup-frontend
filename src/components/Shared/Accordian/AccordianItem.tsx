import { ReactNode } from 'react';

type AccordionItemProps = {
  id: number
  title: string
  content: ReactNode
  activeAccordion: boolean
  onClickAccordion: (id: number) => void
}

const AccordionItem = ({ id, title, content, activeAccordion, onClickAccordion }: AccordionItemProps) => {
  return (
    <>
        <h2 id="accordion-flush-heading-1">
        <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1" onClick={(): void => onClickAccordion(id)}>
          <span>{title}</span>
          <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
          </svg>
        </button>
      </h2>
      <div id="accordion-flush-body-1" className={activeAccordion ? 'show' : "hidden"} aria-labelledby="accordion-flush-heading-1">
        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
          {content}
        </div>
      </div>

    </>
  );
};


export default AccordionItem;
