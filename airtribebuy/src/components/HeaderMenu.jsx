import cx from 'clsx';
import { Menu, Group, Image, Container, rem, UnstyledButton, useMantineTheme } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout2, IconChevronDown } from '@tabler/icons-react';
import classes from './HeaderMenu.module.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export function HeaderMenu() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Image 
            src={"https://media.airtribe.live/Frame_44902_482e824a03.png"} 
            alt="AirtribeBuy Logo"
            style={{
              width: rem(200),
              height: 'auto',
            }}
            />
          <Group spacing="md" className="nav-links">
            <NavLink to="/products" className={classes.link}>Products</NavLink>
            <NavLink to="/wishlist" className={classes.link}>Wishlist</NavLink>
            <NavLink to="/cart" className={classes.link}>Cart</NavLink>
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <IconUserCircle size="1.5rem" stroke={1.5} />
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => {
                localStorage.removeItem('airtribe-user-cart');
                localStorage.removeItem('airtribe-user-wishlist');
                localStorage.removeItem('airtribe-user-auth');
                window.location.reload();
              }}
                leftSection={
                  <IconLogout2
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                    
                  />
                }
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          </Group>
        
          {/* <Burger opened={opened} onClick={toggle} title={title} className="burger" /> */}
        </div>
      </Container>
    </header>
  );
}
