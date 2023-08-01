import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { authActions } from "../../store/auth-slice";
import { getImage } from "../../services/image.service";
import { alertActions } from "../../store/alert-slice";
import { errorMessageFromAxiosError } from "../../utils/helpers";

const title = "Forum";

const navButtons: { title: string; url: string; logged: boolean }[] = [
  { title: "Home", url: "/", logged: false },
];

const profileButtons: { title: string; url: string; admin: boolean }[] = [
  { title: "Profile", url: "/profile", admin: false },
  { title: "Logout", url: "/logout", admin: false },
];

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const [currentProfilePictureUrl, setCurrentProfilePictureUrl] =
    React.useState<string | null>(null);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const onHandleNavMenuPress = (address: string) => {
    navigate(address);
    handleCloseNavMenu();
  };

  const onHandleUserMenuPress = (address: string) => {
    navigate(address);
    handleCloseUserMenu();
  };

  React.useEffect(() => {
    const abortController = new AbortController();
    if (user) {
      if (user.profilePictureUrl) {
        const img = new Image();
        img.onload = () => {
          setCurrentProfilePictureUrl(user.profilePictureUrl);
        };
        img.onerror = () => {
          getImage(user.profilePictureId, abortController.signal)
            .then((res) => {
              const blob = new Blob([res], {
                type: "image/jpeg",
              });
              const imageUrl = URL.createObjectURL(blob);
              dispatch(authActions.changeProfilePictureUrl(imageUrl));
              setCurrentProfilePictureUrl(imageUrl);
            })
            .catch((e) => {
              dispatch(
                alertActions.changeAlert({
                  type: "error",
                  message: errorMessageFromAxiosError(e),
                })
              );
            });
        };
        img.src = user.profilePictureUrl;
      }
    }
    return () => abortController.abort();
  }, []);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        top: 0,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        color: "#3d3d3d",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DescriptionIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {navButtons.map((item) => (
                <MenuItem
                  key={item.title}
                  onClick={() => onHandleNavMenuPress(item.url)}
                >
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <DescriptionIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navButtons.map((item) => (
              <Button
                key={item.title}
                onClick={() => onHandleNavMenuPress(item.url)}
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.username} src={user?.profilePictureUrl} />
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
                {profileButtons.map((item) => (
                  <MenuItem
                    key={item.title}
                    onClick={() => onHandleUserMenuPress(item.url)}
                  >
                    <Typography textAlign="center">{item.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          {!user && (
            <Box sx={{ flexGrow: 0, flexDirection: "row" }}>
              <Button
                key="login"
                sx={{ my: 2, color: "black" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                key="register"
                sx={{
                  my: 2,
                  color: "black",
                  display: { xs: "none", md: "inline-flex" },
                }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
