'use client'

import { Button, Kbd } from '@ui-kit.ai/components'

export default function KbdInButton() {
    return <Button slotRight={<Kbd>C</Kbd>}>Create</Button>
}
