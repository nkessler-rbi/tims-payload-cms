import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { blockRegistryBySlug } from '@/blocks/registry'
import type { Locale } from '@/utilities/locale'

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][] | null | undefined
  locale?: Locale
}> = (props) => {
  const { blocks, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block as { blockType?: string }

        if (!blockType) return null
        const entry = blockRegistryBySlug[blockType]
        if (!entry) return null

        const Block = entry.Component

        return (
          <div className="my-8" key={index}>
            <Block {...(block as unknown as Record<string, unknown>)} locale={locale} />
          </div>
        )
      })}
    </Fragment>
  )
}
