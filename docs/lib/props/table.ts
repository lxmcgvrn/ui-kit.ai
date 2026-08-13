import type { Cell, Column, Row, Table, TableBody, TableHeader } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

export type CellProps = ComponentProps<typeof Cell>

export type ColumnProps = ComponentProps<typeof Column>

export type RowProps = ComponentProps<typeof Row>

export type TableBodyProps = ComponentProps<typeof TableBody>

export type TableHeaderProps = ComponentProps<typeof TableHeader>

/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 */
export type TableProps = ComponentProps<typeof Table>
