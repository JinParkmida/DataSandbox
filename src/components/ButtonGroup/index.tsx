import cn from 'classnames';
import React from 'react';
import { isArray } from 'underscore';

type ButtonProps = {
    buttons: Record<string, any>[],
    onChange?: (args?: string) => void,
    defaultIndex?: number
}

const ButtonGroup = ({ buttons, onChange, defaultIndex }: ButtonProps) => {
    if (!isArray(buttons)) throw new Error("buttons prop should be an array");


    const [clickedId, setClickedId] = React.useState(defaultIndex ?? -1);

    const handleClick = (event: React.SyntheticEvent, index: number) => {
        let target = event.target as HTMLButtonElement;
        const callbackValue = target.getAttribute('data-value') ?? target.name;
        setClickedId(index);
        onChange && onChange(callbackValue);
    };

    return (
        <div className='flex items-center changing-border rounded-md divide-x overflow-hidden h-12 lg:h-10' role="group">
            {buttons.map((button, i) => (
                <button
                    key={i}
                    name={`${button.label}`}
                    onClick={(e) => handleClick(e, i)}
                    className={cn("h-full inline-flex flex-1 justify-center items-center py-1 px-3 select-none capitalize transition", { "bg-black dark:bg-cream text-cream dark:text-black": i === clickedId })}
                    data-value={button.value}
                >
                    {button?.label}
                </button>
            ))}
        </div>
    );

}
export default ButtonGroup;