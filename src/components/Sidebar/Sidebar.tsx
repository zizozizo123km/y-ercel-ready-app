import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Button, Menu, MenuItem } from '@mui/material';
import { Home as HomeIcon, People as PeopleIcon, Group as GroupIcon, Store as StoreIcon, OndemandVideo as VideoIcon, History as HistoryIcon, Bookmark as BookmarkIcon, Flag as FlagIcon, Settings as SettingsIcon, Help as HelpIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const shortcutItems = [
  { icon: <HistoryIcon />, text: 'الذكريات' },
  { icon: <BookmarkIcon />, text: 'المحفوظات' },
  { icon: <FlagIcon />, text: 'الصفحات' },
];

const mainNavigationItems = [
  { icon: <PeopleIcon />, text: 'الأصدقاء', to: '/friends' },
  { icon: <GroupIcon />, text: 'المجموعات', to: '/groups' },
  { icon: <StoreIcon />, text: 'Marketplace', to: '/marketplace' },
  { icon: <VideoIcon />, text: 'Watch', to: '/watch' },
  { icon: <HistoryIcon />, text: 'الذكريات', to: '/memories' },
];

const Sidebar: React.FC = () => {
  const [showMore, setShowMore] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const visibleItems = showMore ? mainNavigationItems : mainNavigationItems.slice(0, 5);

  return (
    <Box
      sx={{
        width: 360,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 60, // Assuming Header height is 60px
        paddingTop: 2,
        paddingLeft: 2,
        paddingRight: 1,
        overflowY: 'auto',
        scrollbarWidth: 'none', // For Firefox
        '&::-webkit-scrollbar': {
          display: 'none', // For Chrome, Safari, and Opera
        },
        display: { xs: 'none', md: 'block' },
      }}
    >
      {/* User Profile and Main Navigation */}
      <List disablePadding>
        {/* User Profile Placeholder */}
        <ListItem button sx={{ borderRadius: 2 }}>
          <ListItemIcon>
            {/* Replace with actual User Avatar/Image */}
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              U
            </Box>
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 600 }}>اسم المستخدم</Typography>} />
        </ListItem>

        {/* Main Navigation Items */}
        {visibleItems.map((item) => (
          <ListItem button key={item.text} sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40, color: '#333' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 500 }}>{item.text}</Typography>} />
          </ListItem>
        ))}

        {/* See More/Less Button */}
        <ListItem button onClick={toggleShowMore} sx={{ borderRadius: 2 }}>
          <ListItemIcon sx={{ minWidth: 40, color: '#333' }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: '#e4e6eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ExpandMoreIcon sx={{ transform: showMore ? 'rotate(180deg)' : 'none' }} />
            </Box>
          </ListItemIcon>
          <ListItemText primary={showMore ? 'عرض أقل' : 'عرض المزيد'} />
        </ListItem>
      </List>

      <Divider sx={{ my: 1, mx: 1 }} />

      {/* Shortcuts Section */}
      <Box sx={{ p: 1 }}>
        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1, fontWeight: 600 }}>
          اختصاراتك
        </Typography>
        <List disablePadding>
          {shortcutItems.map((item) => (
            <ListItem button key={item.text} sx={{ borderRadius: 2 }}>
              <ListItemIcon sx={{ minWidth: 40, color: '#333' }}>
                {/* Custom icon handling for shortcuts if needed, otherwise use default */}
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={<Typography variant="body1">{item.text}</Typography>} />
            </ListItem>
          ))}
          {/* Example shortcut button (Can be expanded similarly to main nav) */}
          <ListItem button sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40, color: '#333' }}>
              <Box
                component="img"
                src="/path/to/shortcut-icon.png" // Placeholder for actual icon image
                alt="Shortcut"
                sx={{ width: 36, height: 36, borderRadius: 1 }}
              />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">اسم الاختصار</Typography>} />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 1, mx: 1 }} />

      {/* Footer Links (Privacy, Terms, Cookies, etc.) */}
      <Box sx={{ p: 2, fontSize: 12, color: 'text.secondary' }}>
        <Typography variant="caption" display="block">
          الخصوصية · الشروط · الإعلانات · خيارات الإعلانات · ملفات تعريف الارتباط · المزيد · Meta © 2024
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;