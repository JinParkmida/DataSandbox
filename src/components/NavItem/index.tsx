import React from 'react';

interface NavItemProps {
  link: string,
  label: string,
  caption?: string
}

export const NavItem = ({ item } : { item: NavItemProps }) => {
  return (
    <li data-to-scrollspy-id={item.link}>
      <a href={`#${item.link}`} className="relative h-28 py-4 px-6 flex flex-col place-content-center items-center whitespace-nowrap bg-cream dark:bg-black">
        <p className="text-xl">{item.label}</p>
        {item.caption && <small className="text-sm">{item.caption}</small>}
      </a>
    </li>
  )
}

export default NavItem;
