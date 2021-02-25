import { Button } from "@blueprintjs/core/lib/esm/components/button/buttons";
import { Navbar } from "@blueprintjs/core/lib/esm/components/navbar/navbar";
import { NavbarDivider } from "@blueprintjs/core/lib/esm/components/navbar/navbarDivider";
import { NavbarGroup } from "@blueprintjs/core/lib/esm/components/navbar/navbarGroup";
import { NavbarHeading } from "@blueprintjs/core/lib/esm/components/navbar/navbarHeading";
import { Link } from "@reach/router";
import React from "react";

export default function TopNav() {
  return (
    <Navbar>
      <NavbarGroup align="right">
        <NavbarHeading>Wait Watcher</NavbarHeading>
        <NavbarDivider />
        <Link to="/">
          <Button className="bp3-minimal" icon="home" text="Home" />
        </Link>
        <Link to="/days">
          <Button className="bp3-minimal" icon="document" text="Files" />
        </Link>
      </NavbarGroup>
    </Navbar>
  );
}
