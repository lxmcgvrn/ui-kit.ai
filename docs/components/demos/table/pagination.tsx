'use client'

import {
    Button,
    Cell,
    Column,
    Label,
    Row,
    Select,
    SelectButton,
    Table,
    TableBody,
    TableHeader,
} from '@ui-kit.ai/components'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
} from 'lucide-react'

export default function TablePagination() {
    return (
        <div>
            <Table aria-label='Table'>
                <TableHeader>
                    <Column isRowHeader>Code</Column>
                    <Column>Name</Column>
                    <Column alignment='end'>High</Column>
                    <Column alignment='end'>Open</Column>
                    <Column alignment='end'>Close</Column>
                </TableHeader>
                <TableBody>
                    <Row>
                        <Cell>TSLA</Cell>
                        <Cell>Tesla Inc.</Cell>
                        <Cell alignment='end'>720.00</Cell>
                        <Cell alignment='end'>710.00</Cell>
                        <Cell alignment='end'>735.00</Cell>
                    </Row>
                    <Row>
                        <Cell>AMZN</Cell>
                        <Cell>Amazon.com Inc.</Cell>
                        <Cell alignment='end'>3450.00</Cell>
                        <Cell alignment='end'>3420.00</Cell>
                        <Cell alignment='end'>3475.00</Cell>
                    </Row>
                    <Row>
                        <Cell>GOOGL</Cell>
                        <Cell>Alphabet Inc.</Cell>
                        <Cell alignment='end'>2800.50</Cell>
                        <Cell alignment='end'>2780.00</Cell>
                        <Cell alignment='end'>2825.00</Cell>
                    </Row>
                </TableBody>
            </Table>

            <div className='mt-4 flex w-full items-center justify-between'>
                <span className='text-lo-contrast block shrink-0 text-sm font-medium whitespace-nowrap'>
                    1-10 of 100
                </span>

                <div className='flex items-center justify-center gap-1'>
                    <Button
                        aria-label='First page'
                        isIcon
                        variant='tertiary'
                    >
                        <ChevronsLeftIcon />
                    </Button>
                    <Button
                        aria-label='Previous page'
                        isIcon
                        variant='tertiary'
                    >
                        <ChevronLeftIcon />
                    </Button>
                    <Button
                        aria-label='Page 2'
                        isIcon
                        variant='tertiary'
                    >
                        2
                    </Button>
                    <Button
                        aria-label='Page 3'
                        data-current={true}
                        isIcon
                        variant='primary'
                    >
                        3
                    </Button>
                    <Button
                        aria-label='Page 4'
                        isIcon
                        variant='tertiary'
                    >
                        4
                    </Button>
                    <Button
                        aria-label='Next page'
                        isIcon
                        variant='tertiary'
                    >
                        <ChevronRightIcon />
                    </Button>
                    <Button
                        aria-label='Last page'
                        isIcon
                        variant='tertiary'
                    >
                        <ChevronsRightIcon />
                    </Button>
                </div>

                <Select
                    className='flex w-auto items-center gap-2'
                    defaultSelectedKey='10'
                    items={[
                        { id: '10', textValue: '10' },
                        { id: '20', textValue: '20' },
                        { id: '50', textValue: '50' },
                    ]}
                >
                    <Label className='mb-0'>Rows</Label>
                    <SelectButton
                        className='w-auto'
                        isBorderless
                    />
                </Select>
            </div>
        </div>
    )
}
