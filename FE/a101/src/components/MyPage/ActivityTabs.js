import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyPhotos from './MyPhotos';
import ScrollCalendar from '../ScrollCalendar/ScrollCalendar';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import FilterFramesOutlinedIcon from '@mui/icons-material/FilterFramesOutlined';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ActivityTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{display: 'flex',  justifyContent:'center'}}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label={<WindowOutlinedIcon />} {...a11yProps(0)} />
            <Tab label={<CalendarTodayOutlinedIcon />} {...a11yProps(1)} />
            <Tab label={<StarBorderPurple500OutlinedIcon />} {...a11yProps(2)} />
            <Tab label={<FilterFramesOutlinedIcon />} {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          내가 지금까지 올린 게시글
          <MyPhotos />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ScrollCalendar />
        </TabPanel>
        <TabPanel value={value} index={2}>
          즐겨찾기 목록
          <MyPhotos />
        </TabPanel>
        <TabPanel value={value} index={3}>
          내가 만든 프레임 목록
          <MyPhotos />
        </TabPanel>
      </Box>
    </div>
  );
}
