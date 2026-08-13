'use client'

import { Button, Menu, MenuTrigger, Popover } from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'
import { MenuIcon } from 'lucide-react'

export default function MenuSections() {
    return (
        <MenuTrigger>
            <Button
                aria-label='Open menu'
                className='px-2'
                isIcon
                variant='secondary'
            >
                <MenuIcon />
            </Button>
            <Popover>
                <Menu
                    items={getMockOptions<'menu'>({
                        withIcon: true,
                        withSections: true,
                    })}
                />
            </Popover>
        </MenuTrigger>
    )
}
