import React from 'react';
import Link from 'next/link';

export interface BreadcrumbProps {
  items: { text: string; link: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="breadcrumb">
      <ol className="list-reset flex">
        {items.map((item, index) => (
          <li key={index} className="mr-2">
            <Link href={item.link} className="text-blue-600 hover:underline">
              {item.text}
            </Link>
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
