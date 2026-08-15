import type { ComponentType, ReactNode } from 'react'

import { createRoot } from 'react-dom/client'

import './styles.css'

import Calendar from '../src/components/calendar/examples/default'
import ColorArea from '../src/components/color-area/examples/default'
import ColorPicker from '../src/components/color-picker/examples/default'
import ColorSwatchPicker from '../src/components/color-swatch-picker/examples/default'
import ColorWheel from '../src/components/color-wheel/examples/default'
import DateField from '../src/components/date-field/examples/default'
import DatePicker from '../src/components/date-picker/examples/default'
import DateRangePicker from '../src/components/date-range-picker/examples/default'
import DropZone from '../src/components/drop-zone/examples/with-file-trigger'
import FileTrigger from '../src/components/file-trigger/examples/default'
import GridList from '../src/components/grid-list/examples/multiple-selection'
import Meter from '../src/components/meter/examples/default'
import NumberField from '../src/components/number-field/examples/default'
import ProgressBar from '../src/components/progress-bar/examples/default'
import RadioGroup from '../src/components/radio-group/examples/default'
import RangeCalendar from '../src/components/range-calendar/examples/default'
import Separator from '../src/components/separator/examples/default'
import Slider from '../src/components/slider/examples/default'
import Switch from '../src/components/switch/examples/default'
import TagGroup from '../src/components/tag-group/examples/removable'
import TimeField from '../src/components/time-field/examples/default'
import ToggleButton from '../src/components/toggle-button/examples/default'
import ToggleButtonGroup from '../src/components/toggle-button-group/examples/default'
import Toolbar from '../src/components/toolbar/examples/default'
import Tree from '../src/components/tree/examples/default'

/** Swap in whatever needs eyeballing; this file is the whole harness. */
const DEMOS: [name: string, demo: ComponentType][] = [
    ['switch', Switch],
    ['radio-group', RadioGroup],
    ['number-field', NumberField],
    ['slider', Slider],
    ['toggle-button', ToggleButton],
    ['toggle-button-group', ToggleButtonGroup],
    ['toolbar', Toolbar],
    ['progress-bar', ProgressBar],
    ['meter', Meter],
    ['separator', Separator],
    ['tag-group', TagGroup],
    ['grid-list', GridList],
    ['tree', Tree],
    ['date-field', DateField],
    ['time-field', TimeField],
    ['calendar', Calendar],
    ['range-calendar', RangeCalendar],
    ['date-picker', DatePicker],
    ['date-range-picker', DateRangePicker],
    ['color-area', ColorArea],
    ['color-wheel', ColorWheel],
    ['color-swatch-picker', ColorSwatchPicker],
    ['color-picker', ColorPicker],
    ['drop-zone', DropZone],
    ['file-trigger', FileTrigger],
]

/** `?from=N&to=M` renders a slice, so screenshots never need scrolling. */
const params = new URLSearchParams(window.location.search)
const from = Number(params.get('from') ?? 0)
const to = Number(params.get('to') ?? DEMOS.length)
const shown = DEMOS.slice(from, to)

function Panel({ children, scheme }: { children: ReactNode; scheme: 'dark' | 'light' }) {
    return (
        <div
            className='bg-base text-hi-contrast flex flex-col gap-6 p-6'
            style={{ colorScheme: scheme }}
        >
            {children}
        </div>
    )
}

function Preview() {
    return (
        <div className='grid min-h-dvh grid-cols-2'>
            {(['light', 'dark'] as const).map((scheme) => (
                <Panel
                    key={scheme}
                    scheme={scheme}
                >
                    {shown.map(([name, Demo]) => (
                        <section key={name}>
                            <p className='text-lo-contrast mb-2 text-xs'>{name}</p>
                            <Demo />
                        </section>
                    ))}
                </Panel>
            ))}
        </div>
    )
}

const container = document.getElementById('root')
if (container == null) throw new Error('missing #root')
createRoot(container).render(<Preview />)
