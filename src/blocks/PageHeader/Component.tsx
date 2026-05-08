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
    <header id={anchorId || undefined} className="container mx-auto py-12 text-center">
      {eyebrow && (
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">{eyebrow}</p>
      )}
      <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
    </header>
  )
}
