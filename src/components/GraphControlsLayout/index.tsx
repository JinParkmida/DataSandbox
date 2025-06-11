import React from 'react';

type Props = {
    AsideComponent: React.ReactChild | React.ReactChildren | (() => JSX.Element),
    GraphComponent: React.ReactChild | React.ReactChildren | (() => JSX.Element)
}

export const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GraphControlsLayout({ AsideComponent, GraphComponent }: Props) {
    const componentsHandler = (component: typeof AsideComponent) => {
        return typeof component === "function" ? component() : component;
    }
    return (
        <div className='flex flex-col lg:flex-row space-y-20 lg:space-x-20 lg:space-y-0'>
            <aside className='grid md:grid-cols-2 lg:grid-cols-1 gap-14 lg:gap-16 flex-1 md:flex-none px-4'>
                {componentsHandler(AsideComponent)}
            </aside>
            <section className='graph-line_wrapper h-auto w-full min-w-0 aspect-video max-h-60 sm:max-h-max'>
                {componentsHandler(GraphComponent)}
            </section>
        </div>
    )
}

export default React.memo(GraphControlsLayout);