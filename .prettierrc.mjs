/**
 * @type {import("prettier").Config}
 */
export default {
    customFunctions: ['tv', 'twMerge', 'composeTailwindRenderProps'],
    jsxSingleQuote: true,
    plugins: [
        'prettier-plugin-packagejson',
        'prettier-plugin-tailwindcss',
        'prettier-plugin-classnames',
        'prettier-plugin-merge',
    ],
    printWidth: 100,
    quoteProps: 'as-needed',
    semi: false,
    singleAttributePerLine: true,
    singleQuote: true,
    tabWidth: 4,
    tailwindFunctions: ['tv', 'twMerge', 'composeTailwindRenderProps'],
    trailingComma: 'es5',
    useTabs: false,
}
