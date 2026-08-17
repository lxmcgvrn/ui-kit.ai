'use client'

import { Breadcrumb, Breadcrumbs } from '@ui-kit.ai/components'

export default function BreadcrumbsLongPath() {
  return (
    <Breadcrumbs>
      <Breadcrumb href='#'>Home</Breadcrumb>
      <Breadcrumb href='#'>Category</Breadcrumb>
      <Breadcrumb href='#'>Subcategory</Breadcrumb>
      <Breadcrumb href='#'>Section</Breadcrumb>
      <Breadcrumb>Current Page</Breadcrumb>
    </Breadcrumbs>
  )
}
