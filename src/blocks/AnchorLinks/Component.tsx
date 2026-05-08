import React from 'react'

export type AnchorLinksBlockProps = {
  items: { label: string; targetAnchorId: string; id?: string | null }[]
  anchorId?: string | null
}

export const AnchorLinksBlockComponent: React.FC<AnchorLinksBlockProps> = ({
  items,
  anchorId,
}) => {
  if (!items || items.length === 0) return null

  return (
    <nav
      id={anchorId || undefined}
      aria-label="Section navigation"
      className="container mx-auto border-y border-border py-3"
    >
      <ul className="flex flex-wrap gap-4 md:gap-8 justify-center">
        {items.map((item, idx) => (
          <li key={item.id || idx}>
            <a
              href={`#${item.targetAnchorId}`}
              className="text-sm md:text-base font-medium hover:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
