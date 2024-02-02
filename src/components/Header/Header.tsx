import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <LanguageIcon fontSize="large" />
          </IconButton>
          <Link to="/">
            <Typography color="#fff" variant="h4" component="div">
              Word Game
            </Typography>
          </Link>
          <IconButton
            color="inherit"
            id="menu-button"
            onClick={handleOpenMenu}
            aria-controls={open ? "menu-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* this place is menu of the Menu Icon button */}
      <Menu
        id="menu-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{ "aria-labelledby": "menu-button" }}
        onClose={handleClose}
      >
        <MenuItem>******</MenuItem>
      </Menu>
    </Box>
  );
}
