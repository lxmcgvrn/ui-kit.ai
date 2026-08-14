import { useEffect, useState } from 'react'
import { tv } from 'tailwind-variants'

import { Loader } from '../loader'

/**
 * Get the initials from a given name.
 * @example
 * getInitials("Foo") // "F"
 * getInitials("Foo Bar") // "FB"
 */
export function getInitials(name?: string) {
    if (name == null) {
        return '?'
    }

    const [first, last] = name.split(' ')

    if (first == null) {
        return '?'
    }
    if (last == null) {
        return first[0]
    }
    return `${first[0] ?? ''}${last[0] ?? ''}`
}
getInitials.displayName = 'getInitials'

const avatarStyles = tv({
    base: `accent bg-tint border-default color-tint-fg text-md flex size-12 shrink-0 items-center
    justify-center uppercase`,
    variants: {
        variant: {
            circle: 'rounded-full',
            square: 'rounded-md',
        },
    },
})

export interface AvatarProps {
    /** Optional className */
    className?: string

    /** Renders a loading spinner in place of the avatar. */
    isLoading?: boolean

    /** Renders as initials when `src` is absent. Pass `name` or `src`. */
    name?: string

    /** A pixel value for the height and width of the avatar. */
    size?: number

    /** Image URL, remote or `data:`. Pass this when `name` is absent. */
    src?: string

    /** Controls the shape of the avatar. */
    variant?: 'circle' | 'square'
}

/** Renders an avatar, falling back to initials when there is no image. */
export function Avatar({ className, isLoading, name, src, variant = 'circle' }: AvatarProps) {
    const initials: string | undefined = getInitials(name)

    const [img_src, setImgSrc] = useState(src)

    useEffect(() => {
        if (src != null) {
            const img = new Image()
            img.src = src
            img.onload = () => {
                setImgSrc(src)
            }
        }
    }, [src])

    if (isLoading === true) {
        return (
            <div
                className={avatarStyles({
                    className,
                    variant,
                })}
            >
                <Loader />
            </div>
        )
    }

    if (img_src != null) {
        return (
            <img
                alt='avatar'
                className={avatarStyles({
                    className,
                    variant,
                })}
                src={img_src}
            />
        )
    }

    if (initials == null) {
        return (
            <div
                className={avatarStyles({
                    className,
                    variant,
                })}
            />
        )
    }

    return (
        <div
            className={avatarStyles({
                className,
                variant,
            })}
        >
            {initials}
        </div>
    )
}
Avatar.displayName = 'Avatar'
