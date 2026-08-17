import type { ForwardedRef } from 'react'
import type {
  SliderOutputProps as RACSliderOutputProps,
  SliderProps as RACSliderProps,
  SliderThumbProps as RACSliderThumbProps,
  SliderTrackProps as RACSliderTrackProps,
  SliderTrackRenderProps as RACSliderTrackRenderProps,
} from 'react-aria-components'

import {
  composeRenderProps,
  Slider as RACSlider,
  SliderOutput as RACSliderOutput,
  SliderThumb as RACSliderThumb,
  SliderTrack as RACSliderTrack,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

type SliderState = RACSliderTrackRenderProps['state']

const sliderStyles = tv({
  base: [
    'group flex flex-col',
    'orientation-horizontal:w-full',
    'orientation-vertical:w-fit orientation-vertical:items-center',
    'disabled:opacity-50',
  ],
})

const trackStyles = tv({
  base: ['relative', 'cursor-pointer', 'disabled:cursor-not-allowed'],
  variants: {
    orientation: {
      horizontal: 'h-6 w-full',
      // A vertical slider fills the height its container sets, rather than picking one.
      vertical: 'min-h-0 w-6 flex-1',
    },
  },
})

const railStyles = tv({
  base: ['bg-tint', 'absolute', 'rounded-full'],
  variants: {
    orientation: {
      horizontal: 'inset-x-0 top-1/2 h-1 -translate-y-1/2',
      vertical: 'inset-y-0 left-1/2 w-1 -translate-x-1/2',
    },
  },
})

const fillStyles = tv({
  base: ['bg-primary', 'absolute', 'rounded-full'],
  variants: {
    orientation: {
      horizontal: 'top-1/2 h-1 -translate-y-1/2',
      vertical: 'left-1/2 w-1 -translate-x-1/2',
    },
  },
})

const thumbStyles = tv({
  base: [
    'bg-base',
    'border-field border',
    'size-4',
    'rounded-full',
    'shadow-xs',
    'transition-colors',
    'dragging:cursor-grabbing cursor-grab',
    'hover:border-field-hover',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  variants: {
    orientation: {
      horizontal: 'top-1/2',
      vertical: 'left-1/2',
    },
  },
})

const outputStyles = tv({
  base: ['text-lo-contrast text-sm font-medium tabular-nums'],
})

/** Runs from the track start to the single thumb, or between two thumbs. */
const fillPosition = (state: SliderState) => {
  const percents = state.values.map((_, index) => state.getThumbPercent(index))

  if (percents.length === 0) return { size: '0%', start: '0%' }

  const start = percents.length > 1 ? Math.min(...percents) : 0
  const end = Math.max(...percents)

  return { size: `${String((end - start) * 100)}%`, start: `${String(start * 100)}%` }
}

export interface SliderProps<T extends number | number[] = number> extends RACSliderProps<T> {
  ref?: ForwardedRef<HTMLDivElement>
}

/** Picks one value, or a range, by dragging along a track. */
export function Slider<T extends number | number[] = number>({ ref, ...props }: SliderProps<T>) {
  return (
    <RACSlider<T>
      {...props}
      className={composeRenderProps(props.className, (className) =>
        sliderStyles({
          className,
        })
      )}
      ref={ref}
    />
  )
}
Slider.displayName = 'Slider'

export interface SliderTrackProps extends RACSliderTrackProps {
  ref?: ForwardedRef<HTMLDivElement>
}

/** The bar a {@link SliderThumb} travels along. Draws its own rail and fill. */
export function SliderTrack({ children, ref, ...props }: SliderTrackProps) {
  return (
    <RACSliderTrack
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        trackStyles({
          className,
          orientation: renderProps.orientation,
        })
      )}
      ref={ref}
    >
      {(renderProps) => {
        const fill = fillPosition(renderProps.state)

        return (
          <>
            <div className={railStyles({ orientation: renderProps.orientation })} />
            <div
              className={fillStyles({ orientation: renderProps.orientation })}
              style={
                renderProps.orientation === 'vertical'
                  ? { bottom: fill.start, height: fill.size }
                  : { insetInlineStart: fill.start, width: fill.size }
              }
            />
            {typeof children === 'function' ? children(renderProps) : children}
          </>
        )
      }}
    </RACSliderTrack>
  )
}
SliderTrack.displayName = 'SliderTrack'

export interface SliderThumbProps extends RACSliderThumbProps {
  ref?: ForwardedRef<HTMLDivElement>
}

/** A draggable handle representing one value on a {@link SliderTrack}. */
export function SliderThumb({ ref, ...props }: SliderThumbProps) {
  return (
    <RACSliderThumb
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        thumbStyles({
          className,
          orientation: renderProps.state.orientation,
        })
      )}
      ref={ref}
    />
  )
}
SliderThumb.displayName = 'SliderThumb'

export interface SliderOutputProps extends RACSliderOutputProps {
  ref?: ForwardedRef<HTMLOutputElement>
}

/** Displays the {@link Slider}'s current value as text. */
export function SliderOutput({ ref, ...props }: SliderOutputProps) {
  return (
    <RACSliderOutput
      {...props}
      className={composeRenderProps(props.className, (className) =>
        outputStyles({
          className,
        })
      )}
      ref={ref}
    />
  )
}
SliderOutput.displayName = 'SliderOutput'
