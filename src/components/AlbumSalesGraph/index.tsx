import React from 'react'
import { BsChevronDown } from 'react-icons/bs'
import ButtonGroup from '../ButtonGroup'
import GraphControlsLayout, { numberWithCommas } from '../GraphControlsLayout'
import LineGraph from '../LineGraph'
import Radio from '../Radio'

type Props = {}

export default function AlbumSalesGraph({ }: Props) {
    const [radioVal, setRadioVal] = React.useState('sales');

    return (
        <GraphControlsLayout
            AsideComponent={() => (
                <>
                    <div className=''>
                        <Radio.Group name="nums" onChange={setRadioVal} value={radioVal}>
                            <Radio.Button id="sales" value="sales">Sales</Radio.Button>
                        </Radio.Group>
                        <button className='relative flex w-full items-center changing-border rounded-md overflow-hidden h-12 lg:h-10 mb-8 disabled:opacity-70' disabled>
                            <BsChevronDown size={22} className='absolute right-0 top-0 bottom-0 self-center h-full mx-2' />
                            <span className='pl-3 pr-7 w-full inline-flex select-none text-ellipsis'>All-time</span>
                        </button>
                        <ButtonGroup
                            defaultIndex={0}
                            buttons={[
                                { label: "year", value: "year" },
                                { label: "month", value: "month" },
                                { label: "day", value: "day" },
                            ]}
                        />
                    </div>
                    <div className='space-y-8'>
                        <div className='grid text-left space-y-2 changing-border px-4 py-3 rounded-md'>
                            <label className='text-md tracking-wider'>First album release</label>
                            <span className='text-xl tracking-wide'>{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className='grid text-left space-y-2 changing-border px-4 py-3 rounded-md'>
                            <label className='text-md tracking-wider'>Total</label>
                            <span className='text-xl tracking-wide'>{numberWithCommas(75000000)}</span>
                        </div>
                        <div className='grid text-left space-y-2 changing-border px-4 py-3 rounded-md'>
                            <label className='text-md tracking-wider'>New today</label>
                            <span className='text-xl tracking-wide'>{numberWithCommas(75000000)}</span>
                        </div>
                    </div>
                </>
            )}
            GraphComponent={<LineGraph />}
        />
    )
}