import type { ReactNode } from 'react'

import AlertDefault from '@/components/examples/alert/default'
import AvatarDefault from '@/components/examples/avatar/default'
import ButtonDefault from '@/components/examples/button/default'
import ChatDefault from '@/components/examples/chat/default'
import CheckboxGroupDefault from '@/components/examples/checkbox-group/default'
import EmptyStateDefault from '@/components/examples/empty-state/default'
import FormDefault from '@/components/examples/form/default'
import KbdKeyCombination from '@/components/examples/kbd/key-combination'
import SelectDefault from '@/components/examples/select/default'
import SkeletonDefault from '@/components/examples/skeleton/default'
import TableDefault from '@/components/examples/table/default'
import TabsDefault from '@/components/examples/tabs/default'
import TagDefault from '@/components/examples/tag/default'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

/* Half a row on tablet, a third of one on desktop. */
const MEDIUM = 'md:col-span-2 lg:col-span-2'
const SMALL = 'md:col-span-1 lg:col-span-1'

interface TileProps {
  children: ReactNode
  className?: string
  /** Slug of the component's docs page, under `/docs/components`. */
  component: string
  label: string
}

/* Tile order matters: the form is two rows tall, so its neighbours come first. */

/** The homepage centrepiece: real components, arranged as a bento grid. */
export function Mosaic() {
  return (
    <div className='grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-6'>
      <Tile
        className='md:col-span-2 md:row-span-2'
        component='form'
        label='Form'
      >
        <FormDefault />
      </Tile>
      <Tile
        className={MEDIUM}
        component='chat'
        label='Chat'
      >
        <ChatDefault />
      </Tile>
      <Tile
        className={MEDIUM}
        component='tabs'
        label='Tabs'
      >
        <TabsDefault />
      </Tile>
      <Tile
        className='md:col-span-4 lg:col-span-4'
        component='table'
        label='Table'
      >
        <TableDefault />
      </Tile>
      <Tile
        className={MEDIUM}
        component='empty-state'
        label='Empty state'
      >
        <EmptyStateDefault />
      </Tile>
      <Tile
        className={MEDIUM}
        component='checkbox-group'
        label='Checkbox group'
      >
        <CheckboxGroupDefault />
      </Tile>
      <Tile
        className={MEDIUM}
        component='select'
        label='Select'
      >
        <SelectDefault />
      </Tile>
      <Tile
        className={MEDIUM}
        component='skeleton'
        label='Skeleton'
      >
        <SkeletonDefault />
      </Tile>
      <Tile
        className={MEDIUM}
        component='tag'
        label='Tag'
      >
        <TagDefault />
      </Tile>
      <Tile
        className={MEDIUM}
        component='button'
        label='Button'
      >
        <ButtonDefault />
      </Tile>
      <Tile
        className='md:col-span-2 lg:col-span-4'
        component='alert'
        label='Alert'
      >
        <AlertDefault />
      </Tile>
      <Tile
        className={SMALL}
        component='avatar'
        label='Avatar'
      >
        <AvatarDefault />
      </Tile>
      <Tile
        className={SMALL}
        component='kbd'
        label='Kbd'
      >
        <KbdKeyCombination />
      </Tile>
    </div>
  )
}

function Tile({ children, className, component, label }: TileProps) {
  return (
    <section className={twMerge('border-default bg-base-raised flex flex-col overflow-hidden rounded-xl border', className)}>
      {/* Safe centring keeps oversized demos (the table) scrollable, not clipped. */}
      <div className={'flex min-h-36 flex-1 items-center-safe justify-center-safe overflow-auto p-4 md:p-6'}>{children}</div>
      <Link
        className={'border-default text-lo-contrast hover:text-hi-contrast border-t px-4 py-2 text-xs transition-colors'}
        href={`/docs/components/${component}`}
      >
        {label}
      </Link>
    </section>
  )
}
