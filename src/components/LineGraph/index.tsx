import { ResponsiveLine } from '@nivo/line';
import { data } from '../../api/getYoutubeStatsData';
import { AxisTickProps } from '@nivo/axes'
import useDarkMode from '../../hooks/useDarkMode';
import useBreakpointValue from '../../hooks/useBreakpointValue';

type Props = {
}

export default function LineGraph({ }: Props) {
    const { isDarkMode } = useDarkMode();
    const ligthColor = getComputedStyle(document.documentElement).getPropertyValue('--color-cream');
    const darkColor = getComputedStyle(document.documentElement).getPropertyValue('--color-black');
    const lineGraphColor = isDarkMode ? `rgb(${ligthColor})` : `rgb(${darkColor})`;

    //Responsive graph props values
    const axisLeftBottomTickPadding = useBreakpointValue({ base: 20, md: 50, lg: 80 }, { fallback: 'lg' })
    const margin = useBreakpointValue({
        base: { top: 15, right: 15, bottom: 40, left: 40 },
        md: { top: 20, right: 50, bottom: 80, left: 80 },
        lg: { top: 20, right: 50, bottom: 120, left: 120 }
    }, { fallback: 'lg' })
    const pointSize = useBreakpointValue({ base: 12, lg: 24 }, { fallback: 'lg' })
    const lineWidth = useBreakpointValue({ base: 2, lg: 4 }, { fallback: 'lg' })
    const pointBorderWidth = useBreakpointValue({ base: 2, lg: 5 }, { fallback: 'lg' })

    return (
        <ResponsiveLine
            data={data}
            gridYValues={[0, 20, 40, 60]}
            margin={margin}
            animate={true}
            lineWidth={lineWidth}
            curve="monotoneX"
            colors={lineGraphColor}
            enableGridX={false}
            enableCrosshair={false}
            pointSize={pointSize}
            pointColor={lineGraphColor}
            pointBorderWidth={pointBorderWidth}
            pointBorderColor={lineGraphColor === `rgb(${ligthColor})` ? `rgb(${darkColor})` : `rgb(${ligthColor})`}
            yScale={{
                type: "linear",
                min: 0,
                max: 60
            }}
            axisLeft={{
                tickValues: [0, 20, 40, 60],
                format: value => Number(value) === 0 ? value : `${value}M`,
                tickSize: 0,
                tickPadding: axisLeftBottomTickPadding,
                renderTick: CustomTick
            }}
            axisBottom={{
                tickSize: 0,
                tickPadding: axisLeftBottomTickPadding,
                renderTick: CustomTick
            }}
            theme={{
                grid: {
                    line: {
                        opacity: 0.5,
                        stroke: lineGraphColor
                    }
                }
            }}
        />
    )
}

const CustomTick = (tick: AxisTickProps<string>) => {

    return (
        <g transform={`translate(${tick.x},${tick.y})`}>
            <text
                textAnchor="middle"
                dominantBaseline="middle"
                className='fill-black dark:fill-cream'
                style={{
                    fontFamily: "'Noto Serif Display', serif",
                    fontSize: "clamp(12px,2vw,32px)",
                }}
                transform={`translate(${tick.textX},${tick.textY})`}
            >
                {tick.format ? tick.format(tick.value) : tick.value}
            </text>
        </g>
    )
}