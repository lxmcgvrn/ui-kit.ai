'use client'

import { Link, LinkButton, TopNav } from '@ui-kit.ai/components'
import { LucideCodeXml } from 'lucide-react'

export default function TopNavDefault() {
  return (
    <TopNav>
      <div className='flex items-center gap-6'>
        <Link
          className='text-hi-contrast hover:text-lo-contrast flex items-center gap-1 font-semibold transition-colors'
          href='/'
        >
          ❖ ui-kit.ai
        </Link>
        <div className='flex items-center gap-4'>
          <Link
            className='text-hi-contrast hover:text-lo-contrast text-sm transition-colors'
            href='#'
          >
            Docs
          </Link>
          <Link
            className='text-hi-contrast hover:text-lo-contrast text-sm transition-colors'
            href='#'
          >
            Components
          </Link>
          <Link
            className='text-hi-contrast hover:text-lo-contrast text-sm transition-colors'
            href='#'
          >
            Theme
          </Link>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <LinkButton
          aria-label='Source code'
          href='#'
          isIcon
          variant='tertiary'
        >
          <LucideCodeXml size={18} />
        </LinkButton>
      </div>
    </TopNav>
  )
}
