import { ReactElement, FocusEvent, useState } from "react";
import styled from "styled-components";

type DropDownProps = {
  name: string;
  items: ReactElement[];
};

export default function DropDown({ name, items }: DropDownProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  function expand() {
    setOpen(true);
  }

  function close(event: FocusEvent<HTMLInputElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  }

  function select() {
    setOpen(false);
  }

  return (
    <DropdownWrapper tabIndex={0} onFocus={expand} onBlur={close}>
      <DropdownTitle>
        {name} <DropdownArrow open={isOpen} />
      </DropdownTitle>

      {isOpen ? (
        <DropdownLinkList>
          {items.map((item, index) => (
            <DropdownListItem
              withDivider={Boolean(items[index + 1])}
              key={item.key}
              onClick={select}
            >
              {item}
            </DropdownListItem>
          ))}
        </DropdownLinkList>
      ) : null}
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  cursor: pointer;
`;

const DropdownTitle = styled.p`
  margin: 0;
`;

type DropdownArrowProps = {
  open: boolean;
};

const DropdownArrow = styled.i<DropdownArrowProps>`
  border: solid ${(props) => props.theme.colors.fg};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  margin-bottom: ${(props) => (props.open ? "0" : "3px")};
  transform: ${(props) => (props.open ? "rotate(-135deg)" : "rotate(45deg)")};
`;

const DropdownLinkList = styled.ul`
  list-style: none;
  margin: 0;
  position: absolute;
  border: ${(props) => props.theme.sizes.s0} solid
    ${(props) => props.theme.colors.fg};
  padding: 0;
  background-color: ${(props) => props.theme.colors.bg};
  font-size: ${(props) => props.theme.sizes.s4};
`;

type DropdownListItemProps = {
  withDivider: boolean;
};

const DropdownListItem = styled.li<DropdownListItemProps>`
  padding: ${(props) => props.theme.sizes.s4};
  border-bottom: ${(props) =>
    props.withDivider
      ? `${props.theme.sizes.s0} solid ${props.theme.colors.fg}`
      : null};
`;
