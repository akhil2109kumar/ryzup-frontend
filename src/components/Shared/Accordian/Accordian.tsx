"use client"
import { useState, ReactNode } from 'react';
import AccordionItem from './AccordianItem';

type AccordionProps = {
    items: {
        title: string
        content: ReactNode
    }[]
}

const Accordion = ({ items }: AccordionProps) => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const toggleAccordion = (accordionId: number) => {
        console.log(accordionId)
        setActiveAccordion(activeAccordion === accordionId ? null : accordionId);
    };

    return (
        <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    id={index}
                    title={item.title}
                    content={item.content}
                    onClickAccordion={toggleAccordion}
                    activeAccordion={activeAccordion === index}
                />
            ))}
        </div>
    );
};

export default Accordion