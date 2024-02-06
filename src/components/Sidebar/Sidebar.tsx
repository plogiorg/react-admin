import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import { closeSidebar, ColorSchemeToggle } from "../../utils/common.util.tsx";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">Pi Logistics.</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      <Input
        size="sm"
        startDecorator={<SearchRoundedIcon />}
        placeholder="Search"
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton  onClick={() => navigate("/home/services")}>
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Services</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => navigate("/home/users")}>
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Users</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {/*<ListItem nested>*/}
          {/*    <Toggler*/}
          {/*        renderToggle={({ open, setOpen }) => (*/}
          {/*            <ListItemButton onClick={() => setOpen(!open)}>*/}
          {/*                <AssignmentRoundedIcon />*/}
          {/*                <ListItemContent>*/}
          {/*                    <Typography level="title-sm">Tasks</Typography>*/}
          {/*                </ListItemContent>*/}
          {/*                <KeyboardArrowDownIcon*/}
          {/*                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}*/}
          {/*                />*/}
          {/*            </ListItemButton>*/}
          {/*        )}*/}
          {/*    >*/}
          {/*        <List sx={{ gap: 0.5 }}>*/}
          {/*            <ListItem sx={{ mt: 0.5 }}>*/}
          {/*                <ListItemButton>All tasks</ListItemButton>*/}
          {/*            </ListItem>*/}
          {/*            <ListItem>*/}
          {/*                <ListItemButton>Backlog</ListItemButton>*/}
          {/*            </ListItem>*/}
          {/*            <ListItem>*/}
          {/*                <ListItemButton>In progress</ListItemButton>*/}
          {/*            </ListItem>*/}
          {/*            <ListItem>*/}
          {/*                <ListItemButton>Done</ListItemButton>*/}
          {/*            </ListItem>*/}
          {/*        </List>*/}
          {/*    </Toggler>*/}
          {/*</ListItem>*/}
        </List>
      </Box>
      <Divider />
    </Sheet>
  );
}
