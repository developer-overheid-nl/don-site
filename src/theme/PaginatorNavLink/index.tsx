import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/PaginatorNavLink';
import IconDeltaNaarLinksInline from '../icons/IconDeltaNaarLinksInline';
import IconDeltaNaarRechtsInline from '../icons/IconDeltaNaarRechtsInline';

export default function PaginatorNavLink(props: Props): ReactNode {
  const {permalink, title, subLabel, isNext} = props;
  return (
    <Link
      className={clsx(
        'pagination-nav__link',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
      )}
      to={permalink}>
      {subLabel && <div className="pagination-nav__sublabel">{subLabel}<span className="visual-hidden">:</span></div>}
      <div className="pagination-nav__label">{
          !isNext ? <IconDeltaNaarLinksInline aria-hidden={true} /> : null
        }
        {
          title
        }
        {
          isNext ? <IconDeltaNaarRechtsInline aria-hidden={true} /> : null
        }</div>
    </Link>
  );
}
