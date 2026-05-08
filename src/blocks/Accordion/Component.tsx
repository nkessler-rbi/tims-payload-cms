import React from 'react'

import RichText from '@/components/RichText'

export type AccordionBlockProps = {
  heading?: string | null
  items: { question: string; answer: any; id?: string | null }[]
  anchorId?: string | null
}

export const AccordionBlockComponent: React.FC<AccordionBlockProps> = ({
  heading,
  items,
  anchorId,
}) => {
  if (!items || items.length === 0) return null

  return (
    <section id={anchorId || undefined} className="container mx-auto py-12">
      {heading && <h2 className="text-3xl font-bold mb-6">{heading}</h2>}
      <div className="divide-y divide-border border-y border-border">
        {items.map((item, idx) => (
          <details key={item.id || idx} className="group py-4">
            <summary className="cursor-pointer list-none flex justify-between items-center font-medium text-lg">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="ml-4 transition-transform group-open:rotate-45 text-2xl leading-none"
              >
                +
              </span>
            </summary>
            <div className="mt-3">
              <RichText data={item.answer} enableGutter={false} enableProse={true} />
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
