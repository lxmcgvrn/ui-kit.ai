'use client'

import {
    Card,
    CardBody,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    FieldGroup,
    Form,
    FormSubmitButton,
    FormTextField,
    Input,
    Label,
    TextFieldClearButton,
} from '@ui-kit.ai/components'

export default function CardWithForm() {
    return (
        <Card className='w-full max-w-128'>
            <Form onSubmit={() => {}}>
                <CardHeader>
                    <CardTitle>Card title</CardTitle>
                    <CardDescription>Card description</CardDescription>
                </CardHeader>
                <CardBody>
                    <FormTextField
                        className='mb-4'
                        name='username'
                        type='username'
                    >
                        <Label>Username</Label>
                        <FieldGroup>
                            <Input isBorderless />
                            <TextFieldClearButton />
                        </FieldGroup>
                    </FormTextField>
                    <FormTextField
                        className='mb-4'
                        name='email'
                        type='email'
                    >
                        <Label>Email address</Label>
                        <FieldGroup>
                            <Input isBorderless />
                            <TextFieldClearButton />
                        </FieldGroup>
                    </FormTextField>
                </CardBody>
                <CardFooter className='flex justify-end gap-2'>
                    <FormSubmitButton>Submit</FormSubmitButton>
                </CardFooter>
            </Form>
        </Card>
    )
}
