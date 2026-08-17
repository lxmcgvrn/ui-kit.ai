'use client'

import { Breadcrumb, Breadcrumbs } from '@ui-kit.ai/components'

export default function BreadcrumbsDisabled() {
  return (
    <Breadcrumbs isDisabled>
      <Breadcrumb href='#'>Home</Breadcrumb>
      <Breadcrumb href='#'>Products</Breadcrumb>
      <Breadcrumb>Current Page</Breadcrumb>
    </Breadcrumbs>
  )
}
