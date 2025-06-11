import React from 'react';
import { isArray } from 'underscore';

type ButtonProps = {
    id: string,
    value: string,
    props?: Partial<Record<any, any>>
}

const Button: React.FC<ButtonProps> = ({ children, id, value, ...props }) => (
    <li className='overflow-hidden rounded-full inline-flex justify-center'>
        <input type="radio" id={id} value={value} {...props} className="hidden peer" required />
        <label htmlFor={id} className="btn-radio--outline peer-checked:btn-radio transition">
            {children}
        </label>
    </li>
)

type GroupProps = {
    name: string,
    onChange: (args: string) => void,
    value: string,
    children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[],
}

const Group = ({ children, name, onChange, value }: GroupProps) => {
    if (!children) throw new Error("Radio group need at least one children");
    return (
        <ul className='grid grid-columns-auto-fit gap-10 mb-10 md:mb-16'>
            {(isArray(children)) ? React.Children.map(children, (child: React.ReactElement) => {
                if (!child) throw new Error("Radio group need at least one children");
                return React.cloneElement(child, {
                    ...child.props,
                    name,
                    checked: value === child.props.value,
                    onChange: (e: React.SyntheticEvent<HTMLInputElement>): void => {
                        let target = e.target as HTMLInputElement;
                        onChange(target.value)
                    }
                })
            }) : React.cloneElement(children as React.ReactElement, {
                ...children.props,
                name,
                checked: value === children.props.value,
                onChange: (e: React.SyntheticEvent<HTMLInputElement>): void => {
                    let target = e.target as HTMLInputElement;
                    onChange(target.value)
                }
            })}
        </ul>
    )
}

export default {
    Button,
    Group
}