import React from 'react'

export type PageHeaderBlockProps = {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  anchorId?: string | null
}

export const PageHeaderBlockComponent: React.FC<PageHeaderBlockProps> = ({
  eyebrow,
  title,
  subtitle,
  anchorId,
}) => {
  return (
    <section
      id={anchorId || undefined}
      className="b-pageheader bg-background"
      style={{
        padding: 'clamp(56px, 8vw, 120px) 0 clamp(40px, 5vw, 64px)',
        borderBottom: '1px solid var(--th-rule)',
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: 'var(--max-w)', paddingInline: 'var(--gutter)' }}
      >
        {eyebrow && (
          <p
            className="font-mono uppercase mb-3"
            style={{
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: 'var(--th-muted)',
            }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="font-display"
          style={{
            margin: 0,
            fontWeight: 900,
            fontSize: 'clamp(36px, 5.5vw, 70px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--th-espresso)',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-4"
            style={{
              fontSize: '17px',
              lineHeight: 1.6,
              color: 'var(--th-muted)',
              maxWidth: '60ch',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
