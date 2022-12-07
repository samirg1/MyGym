import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBarIconText from "./AppBarIconText";

const APP_NAME = "MD FITNESS";

const settings = ["Account", "Logout"];

const ResponsiveAppBar = ({ pages }: { pages: string[] }) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    /**
     * Opens the navigation menu
     * @param event The event that caused this function
     */
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    /**
     * Opens the user menu
     * @param event The event that caused this function
     */
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    /**
     * Closes the navigation menu
     */
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    /**
     * Closes the user menu
     */
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    /**
     * Changes the current page of the app.
     * @param page the page to switch to.
     */
    const changePage = (page: string) => {
        navigate(`/${page.toLowerCase()}`);
        handleCloseNavMenu();
    };

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AppBarIconText large name={APP_NAME} />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => changePage(page)}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AppBarIconText large={false} name={APP_NAME} />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => changePage(page)}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            sx={{ color: "white" }}
                            onClick={() => changePage("login-signup")}
                        >
                            Login / Signup
                        </Button>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <SettingsIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
