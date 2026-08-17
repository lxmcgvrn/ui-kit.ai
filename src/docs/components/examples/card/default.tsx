'use client'

import { Button, Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui-kit.ai/components'

export default function CardDefault() {
  return (
    <Card className='w-full max-w-128'>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardBody>
        This is the card body content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
      </CardBody>
      <CardFooter className='flex justify-end gap-2'>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='primary'>Primary</Button>
      </CardFooter>
    </Card>
  )
}
