import Link from 'next/link';
import React from 'react';
import { localize } from '../../../public/locales/localize';
import styles from './MenuItem.module.scss';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
const MenuItem = ({ link, children, title, currentPath, icon }) => {
  const { locale } = useRouter();
  const { data: session } = useSession();
  return (
    <>
      <li>
        <Link href={'/admin' + link}>
          <a class={currentPath === '/admin' + link && 'mm-active'}>
            {icon && <i class={icon}></i>}

            {localize[locale].menu[title]}
          </a>
        </Link>
        {children && children?.length !== 0 && (
          <ul>
            {children.map((child) =>
              child.link == '/user' || child.link == '/role' ? (
                session.user.role === 'Администратор' && (
                  <li>
                    <Link href={'/admin' + child.link}>
                      <a class={currentPath === '/admin' + child.link && 'mm-active'}> {localize[locale].menu[child.title]}</a>
                    </Link>
                  </li>
                )
              ) : (
                <li>
                  <Link href={'/admin' + child.link}>
                    <a class={currentPath === '/admin' + child.link && 'mm-active'}> {localize[locale].menu[child.title]}</a>
                  </Link>
                </li>
              ),
            )}
          </ul>
        )}
      </li>
    </>
  );
};

export default MenuItem;
