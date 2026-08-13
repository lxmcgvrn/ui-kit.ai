import { GITHUB_URL } from '@/lib/layout.shared'
import {
    FieldGroup,
    Heading,
    Input,
    LinkButton,
    TextField,
    TextFieldCopyButton,
} from '@ui-kit.ai/components'
import { ChevronRightIcon } from 'lucide-react'

export default function HomePage() {
    return (
        <main
            className={`relative flex flex-1 flex-col justify-center bg-radial-[at_100%_0%]
                from-[var(--theme-error-bg-tint)] via-[var(--theme-info-bg-tint)] via-40% to-transparent to-70%`}
        >
            <div className='mx-auto w-full max-w-3xl px-6 py-24'>
                <Heading
                    className='mb-6 text-5xl font-bold tracking-tight text-balance md:text-6xl'
                    level={1}
                >
                    Beautiful UI components
                    <br />
                    for
                    <span
                        className={`bg-gradient-to-br from-[var(--theme-error-text-placeholder)]
                            via-[var(--theme-info-text-lo-contrast)] to-[var(--theme-info-text-hi-contrast)] bg-clip-text
                            text-transparent`}
                    >
                        {' '}
                        AI-powered
                    </span>{' '}
                    apps
                </Heading>

                <p className='mb-8 max-w-xl text-xl text-balance'>
                    Professionally designed components, optimized for fast iteration in AI
                    workflows. Accessible, customizable, and ready for production.
                </p>

                <div className='flex flex-wrap items-center gap-2'>
                    <LinkButton
                        className='!h-10'
                        href='/docs'
                        slotRight={<ChevronRightIcon />}
                    >
                        Get started
                    </LinkButton>
                    <LinkButton
                        className='!h-10'
                        href={GITHUB_URL}
                        target='_blank'
                        variant='secondary'
                    >
                        GitHub
                    </LinkButton>
                    <TextField
                        aria-label='Install command'
                        className='hidden min-w-64 shrink-0 md:block'
                        isReadOnly
                        value='npm i @ui-kit.ai/components'
                    >
                        <FieldGroup className='!h-10'>
                            <Input
                                className='font-mono'
                                isBorderless
                            />
                            <TextFieldCopyButton className='!size-7.5' />
                        </FieldGroup>
                    </TextField>
                </div>
            </div>
        </main>
    )
}
