import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GitHubIcon from "@material-ui/icons/GitHub";
import SearchIcon from "@material-ui/icons/Search";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import MoreIcon from "@material-ui/icons/MoreVert";
import "@fortawesome/fontawesome-free/css/all.css";
import "../AppBar.css";
import { pink } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
    marginLeft: "0.5em",
    fontFamily: "Great Vibes",
    fontSize: "1.5em",
    fontWeight: "300",
    position: "relative",
    top: "0.08em",
    left: "-0.1em",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "130ch",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
      width: "130ch",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function AppBarAlternative({
  searchString,
  setSearchString,
  darkState,
  setDarkState,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link
          to="/favorites"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <IconButton aria-label="favorites" color="inherit">
            <FavoriteIcon />
          </IconButton>
          <span>Favorites</span>
        </Link>
      </MenuItem>

      <MenuItem>
        <div onClick={() => setDarkState(!darkState)}>
          <IconButton aria-label="toggle theme" color="inherit">
            {darkState ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <p>Toggle Light/Dark</p>
        </div>
      </MenuItem>
      <MenuItem>
        <a
          href="https://github.com/priya28139/biscotti"
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <IconButton aria-label="github" color="inherit">
            <GitHubIcon />
          </IconButton>
          <span>Github</span>
        </a>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: pink[500] }}>
        <Toolbar>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <i className="fas fa-stroopwafel fa-lg"></i>
              <Typography className={classes.title} variant="h6" noWrap>
                Biscotti
              </Typography>
            </IconButton>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search???"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchString}
              onChange={(event) =>
                setSearchString(event.target.value.toLowerCase())
              }
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="favorites" color="inherit">
              <Link to="/favorites" style={{ color: "inherit" }}>
                <FavoriteIcon />
              </Link>
            </IconButton>
            <div onClick={() => setDarkState(!darkState)}>
              <IconButton aria-label="toggle theme" color="inherit">
                <a>{darkState ? <Brightness7Icon /> : <Brightness4Icon />}</a>
              </IconButton>
            </div>
            <IconButton aria-label="github" color="inherit">
              <a
                href="https://github.com/priya28139/biscotti"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "inline",
                }}
              >
                <GitHubIcon />
              </a>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
