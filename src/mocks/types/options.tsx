import type { OptionsSchema } from '@ui-kit.ai/components'

import { LucideApple, LucideBanana, LucideCarrot, LucideLeafyGreen } from 'lucide-react'

type Options = {
    withIcon?: boolean
    withSections?: boolean
}

const getItems = ({ withIcon }: Options) => ({
    apple: {
        icon: withIcon === true ? <LucideApple /> : undefined,
        id: 'apple',
        textValue: 'Apple',
    },
    banana: {
        icon: withIcon === true ? <LucideBanana /> : undefined,
        id: 'banana',
        textValue: 'Banana',
    },
    carrot: {
        icon: withIcon === true ? <LucideCarrot /> : undefined,
        id: 'carrot',
        textValue: 'Carrot',
    },
    spinach: {
        icon: withIcon === true ? <LucideLeafyGreen /> : undefined,
        id: 'spinach',
        textValue: 'Spinach',
    },
})

export function getMockOptions<TType extends 'listbox' | 'menu'>(
    options: Options = {}
): OptionsSchema<TType>[] {
    const { apple, banana, carrot, spinach } = getItems(options)

    return options.withSections === true
        ? [
              {
                  id: 'fruits',
                  items: [banana, apple],
                  textValue: 'Fruits',
              },
              {
                  id: 'vegetables',
                  items: [carrot, spinach],
                  textValue: 'Vegetables',
              },
          ]
        : [apple, banana, carrot, spinach]
}
