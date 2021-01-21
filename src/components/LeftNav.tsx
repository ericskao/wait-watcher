import { Button } from "@blueprintjs/core/lib/esm/components/button/buttons";
import { Navbar } from "@blueprintjs/core/lib/esm/components/navbar/navbar";
import { NavbarDivider } from "@blueprintjs/core/lib/esm/components/navbar/navbarDivider";
import { NavbarGroup } from "@blueprintjs/core/lib/esm/components/navbar/navbarGroup";
import { NavbarHeading } from "@blueprintjs/core/lib/esm/components/navbar/navbarHeading";
import React from "react";

export default function LeftNav() {
  return (
    <Navbar>
      <NavbarGroup align="right">
        <NavbarHeading>Blueprint</NavbarHeading>
        <NavbarDivider />
        <Button icon="home" text="Home" />
        <Button icon="document" text="Files" />
      </NavbarGroup>
    </Navbar>
  );
}
