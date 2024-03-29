import Link from "next/link";
import React from "react";
import styled from "styled-components";
import DropDown from "./DropDown";
import { MoonIcon, SunIcon } from "./icons";
import { useTheme } from "./theme/ThemeProvider";

const StyledNav = styled.nav`
  position: sticky;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.sizes.s6};
  padding-block: ${(props) => props.theme.sizes.s6};
  border-bottom: ${(props) => props.theme.sizes.s1} dashed
    ${(props) => props.theme.colors.fg};
  background-color: ${(props) => props.theme.colors.bg};
  transition: background-color 0.3s;

  & > svg {
    position: absolute;
    right: ${(props) => props.theme.sizes.s7};
    cursor: pointer;
    visibility: hidden;
    opacity: 0;

    &.visible {
      visibility: visible;
      opacity: 1;
    }
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  }
`;

const NavLink = styled.a`
  color: ${(props) => props.theme.colors.fg};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

export default function Navbar() {
  const { selectedTheme, switchTheme } = useTheme();

  return (
    <StyledNav>
      <Link href="/" passHref>
        <NavLink>Home</NavLink>
      </Link>

      <DropDown
        name="Tools"
        items={[
          <Link
            key={"density_altitude_list_item"}
            href={"/tools/density-altitude"}
            passHref
          >
            <NavLink>Density altitude</NavLink>
          </Link>,
          <Link
            key={"body_energy_consumption_list_item"}
            href={"/tools/body-energy-consumption"}
            passHref
          >
            <NavLink>Body energy consumption</NavLink>
          </Link>,
          <Link
            key={"pain_cave_monitor"}
            href={"/tools/pain-cave-monitor"}
            passHref
          >
            <NavLink>Pain cave monitor</NavLink>
          </Link>,
        ]}
      />

      <MoonIcon
        className={selectedTheme === "light" ? "visible" : ""}
        onClick={() => switchTheme()}
      />

      <SunIcon
        className={selectedTheme === "dark" ? "visible" : ""}
        onClick={() => switchTheme()}
      />
    </StyledNav>
  );
}
