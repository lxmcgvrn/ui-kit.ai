import type {
    Card,
    CardBody,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

/**
 * Re-exported so `<AutoTypeTable />` has a named, exported type to document —
 * the component package only exports the components themselves.
 */
export type CardBodyProps = ComponentProps<typeof CardBody>

export type CardDescriptionProps = ComponentProps<typeof CardDescription>

export type CardFooterProps = ComponentProps<typeof CardFooter>

export type CardHeaderProps = ComponentProps<typeof CardHeader>

export type CardProps = ComponentProps<typeof Card>

export type CardTitleProps = ComponentProps<typeof CardTitle>
