import * as React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Pending as PendingIcon } from "@mui/icons-material";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import { Done as DoneIcon } from "@mui/icons-material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

const mainListItems = [
  { text: "Contratos", icon: <AssignmentRoundedIcon /> },
  { text: "Em Andamento", icon: <PendingIcon /> },
  { text: "Finalizados", icon: <DoneIcon /> },
];

const secondaryListItems = [
  { text: "Ajuda", icon: <InfoRoundedIcon /> },
  { text: "Feedback", icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense={true}>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding={true} sx={{ display: "block" }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense={true}>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding={true} sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
