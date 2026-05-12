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
      className="b-anchorlinks"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <ul
        className="mx-auto flex items-center overflow-x-auto m-0 p-0 list-none"
        style={{
          maxWidth: 'var(--max-w)',
          paddingInline: 'var(--gutter)',
          gap: 'clamp(20px, 4vw, 48px)',
          scrollbarWidth: 'none',
        }}
      >
        {items.map((item, idx) => (
          <li key={item.id || idx} className="relative flex-shrink-0 group">
            <a
              href={`#${item.targetAnchorId}`}
              className="block whitespace-nowrap transition-opacity hover:opacity-100"
              style={{
                padding: '18px 0',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--th-ink)',
                opacity: 0.7,
              }}
            >
              {item.label}
              <span
                aria-hidden
                className="absolute left-0 right-0 origin-left transition-transform duration-200 group-hover:scale-x-100"
                style={{
                  bottom: -2,
                  height: 3,
                  background: 'var(--th-red)',
                  transform: 'scaleX(0)',
                }}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
