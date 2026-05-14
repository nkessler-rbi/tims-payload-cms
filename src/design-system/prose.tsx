import React from 'react'

/**
 * Render the markdown body of a DESIGN.md section. Handles the subset of
 * markdown actually used in this project's DESIGN.md: paragraphs (blank-line
 * separated), bullet lists (`- ` prefix), and **bold** spans. Inline links
 * `[text](url)` are also supported because the components section references
 * source files.
 */
export const Prose: React.FC<{ markdown: string; className?: string }> = ({
  markdown,
  className,
}) => {
  const blocks = splitBlocks(markdown)
  return (
    <div className={className ?? 'b-richtext'}>
      {blocks.map((block, i) => {
        if (block.kind === 'ul') {
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ul>
          )
        }
        return <p key={i}>{renderInline(block.text)}</p>
      })}
    </div>
  )
}

type Block = { kind: 'p'; text: string } | { kind: 'ul'; items: string[] }

const splitBlocks = (md: string): Block[] => {
  const blocks: Block[] = []
  const lines = md.split('\n')
  let currentList: string[] | null = null
  let paragraph: string[] = []

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    blocks.push({ kind: 'p', text: paragraph.join(' ').trim() })
    paragraph = []
  }
  const flushList = () => {
    if (currentList === null) return
    blocks.push({ kind: 'ul', items: currentList })
    currentList = null
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    const listItem = line.match(/^\s*-\s+(.*)$/)
    if (listItem) {
      flushParagraph()
      if (currentList === null) currentList = []
      currentList.push(listItem[1])
      continue
    }
    if (line.trim() === '') {
      flushParagraph()
      flushList()
      continue
    }
    flushList()
    paragraph.push(line.trim())
  }
  flushParagraph()
  flushList()
  return blocks
}

const renderInline = (s: string): React.ReactNode => {
  // First pass: split by **bold**, then within each token also split by [text](url).
  const out: React.ReactNode[] = []
  let key = 0
  const boldRe = /\*\*([^*]+)\*\*/g
  let lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = boldRe.exec(s)) !== null) {
    if (m.index > lastIndex) {
      out.push(...renderLinks(s.slice(lastIndex, m.index), key))
      key += 100
    }
    out.push(<strong key={`b-${key++}`}>{renderLinks(m[1], key)}</strong>)
    lastIndex = m.index + m[0].length
  }
  if (lastIndex < s.length) {
    out.push(...renderLinks(s.slice(lastIndex), key))
  }
  return out
}

const renderLinks = (s: string, baseKey: number): React.ReactNode[] => {
  const out: React.ReactNode[] = []
  let key = baseKey
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = linkRe.exec(s)) !== null) {
    if (m.index > lastIndex) out.push(s.slice(lastIndex, m.index))
    out.push(
      <a key={`a-${key++}`} href={m[2]} className="text-th-red underline-offset-2 hover:underline">
        {m[1]}
      </a>,
    )
    lastIndex = m.index + m[0].length
  }
  if (lastIndex < s.length) out.push(s.slice(lastIndex))
  return out
}
