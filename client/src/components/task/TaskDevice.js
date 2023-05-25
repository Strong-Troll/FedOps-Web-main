import React from 'react';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ButtonBase,
  Typography,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const TaskDevice = ({ device, index, isSelected, onSelect }) => {
  return (
    <Card
      sx={{
        minWidth: 480,
        minHeight: 75,
        maxHeight: 100,
        bgcolor: isSelected ? 'primary.light' : 'background.paper',
      }}
    >
      <ButtonBase
        onClick={() => onSelect(device, index)}
        sx={{ width: '100%', height: '100%' }}
      >
        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecordIcon
                  fontSize="small"
                  color={device.Device_online ? 'success' : 'disabled'}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    <Typography
                      variant="body1"
                      component="span"
                      fontWeight="bold"
                    >
                      {`Client ${index + 1}: `}
                    </Typography>
                    {`${device.Device_hostname} (${device.Device_mac})`}
                  </>
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};
