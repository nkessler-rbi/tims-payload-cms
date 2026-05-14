import React from 'react'

import { Prose } from '@/design-system/prose'
import type { DesignSystem } from '@/design-system/parseDesignMd'

type Subsection = { heading: string; body: string }

/**
 * Split the section body by `### ` sub-headings. Returns the prose *before*
 * the first sub-heading separately so the lead-in paragraphs can render
 * above the flow boxes.
 */
const splitSubsections = (md: string): { lead: string; subsections: Subsection[] } => {
  const lines = md.split('\n')
  const lead: string[] = []
  const subsections: Subsection[] = []
  let current: Subsection | null = null

  for (const line of lines) {
    const h3 = line.match(/^###\s+(.+?)\s*$/)
    if (h3) {
      if (current) subsections.push(current)
      current = { heading: h3[1], body: '' }
      continue
    }
    if (current) {
      current.body += line + '\n'
    } else {
      lead.push(line)
    }
  }
  if (current) subsections.push(current)

  return {
    lead: lead.join('\n').trim(),
    subsections: subsections.map((s) => ({ ...s, body: s.body.trim() })),
  }
}

/**
 * Extract `- **Step N.** rest of step` lines as ordered flow steps.
 * Non-step bullets are dropped; that is intentional — the flow boxes
 * render only numbered steps.
 */
const parseSteps = (md: string): { n: number; text: string }[] => {
  const steps: { n: number; text: string }[] = []
  for (const line of md.split('\n')) {
    const m = line.match(/^\s*-\s+\*\*Step\s+(\d+)\.\*\*\s+(.*)$/i)
    if (!m) continue
    steps.push({ n: parseInt(m[1], 10), text: m[2] })
  }
  return steps
}

const FlowBox: React.FC<{ label: string; tone: 'edit' | 'introduce'; steps: { n: number; text: string }[] }> = ({
  label,
  tone,
  steps,
}) => {
  const accent = tone === 'edit' ? 'bg-th-cream-soft' : 'bg-th-cream'
  const badgeBg = tone === 'edit' ? 'bg-th-red' : 'bg-th-espresso'
  return (
    <div className={`rounded-[4px] border border-th-rule ${accent} p-6`}>
      <p className="font-mono text-xs uppercase tracking-widest text-th-muted">{tone === 'edit' ? 'Edit' : 'Introduce'}</p>
      <h3 className="mt-1 text-xl font-medium text-th-espresso">{label}</h3>
      <ol className="mt-5 space-y-4">
        {steps.map((step) => (
          <li key={step.n} className="flex gap-3 text-sm text-th-espresso">
            <span
              aria-hidden
              className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${badgeBg} font-mono text-xs text-white`}
            >
              {step.n}
            </span>
            <span>{renderStepText(step.text)}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/**
 * Render a step's text with the same inline-link / bold support that Prose
 * provides — without rendering the wrapping paragraph block.
 */
const renderStepText = (text: string): React.ReactNode => (
  <Prose markdown={text} className="b-howto-step" />
)

export const HowToUseSection: React.FC<{ design: DesignSystem }> = ({ design }) => {
  const body = design.sections['how-to-use'] ?? ''
  const { lead, subsections } = splitSubsections(body)

  const editSection = subsections.find((s) => /edit/i.test(s.heading))
  const introduceSection = subsections.find((s) => /introduce/i.test(s.heading))
  const orderSection = subsections.find((s) => /why this order/i.test(s.heading))
  const agentSection = subsections.find((s) => /agent/i.test(s.heading))

  const editSteps = editSection ? parseSteps(editSection.body) : []
  const introduceSteps = introduceSection ? parseSteps(introduceSection.body) : []

  return (
    <div className="space-y-10">
      {lead && <Prose markdown={lead} />}

      <div className="grid gap-6 lg:grid-cols-2">
        <FlowBox label="Editing an existing token" tone="edit" steps={editSteps} />
        <FlowBox label="Introducing a new token or component" tone="introduce" steps={introduceSteps} />
      </div>

      {orderSection && (
        <aside className="rounded-[4px] border-l-4 border-th-red bg-th-cream-soft p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-th-red">
            Why this order matters
          </p>
          <div className="mt-3">
            <Prose markdown={orderSection.body} />
          </div>
        </aside>
      )}

      {agentSection && (
        <aside className="rounded-[4px] border border-th-rule bg-th-espresso p-6 text-th-cream">
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: '#f4ecdf' }}>
            For agent-driven changes
          </p>
          <div className="mt-3" style={{ color: '#f4ecdf' }}>
            <Prose markdown={agentSection.body} className="b-howto-agent" />
          </div>
        </aside>
      )}
    </div>
  )
}
