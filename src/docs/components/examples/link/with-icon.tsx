'use client'

import { Link } from '@ui-kit.ai/components'
import { LucideExternalLink } from 'lucide-react'

export default function LinkWithIcon() {
  return (
    <Link
      className='flex items-center gap-1'
      href='#'
    >
      Learn more
      <LucideExternalLink className='h-4 w-4' />
    </Link>
  )
}
