'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@ui-kit.ai/components'

export default function DisclosureDefault() {
  return (
    <Disclosure defaultExpanded>
      <DisclosureButton>Toggle Content</DisclosureButton>
      <DisclosurePanel>
        <p>This is the content inside the disclosure panel.</p>
      </DisclosurePanel>
    </Disclosure>
  )
}
