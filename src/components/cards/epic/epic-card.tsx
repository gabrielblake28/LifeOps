import { IndicatorColors } from 'utils/DataStatus';
import './epic-card.scss';
import { useTheme } from '@mui/material/styles';

import { CloseOutlined, CrownOutlined } from '@ant-design/icons';
import { Epic, EpicStatus } from 'Types/Epic';
import { ClickAwayListener, IconButton, Paper, Popper, useMediaQuery } from '@mui/material';
import MainCard from 'components/MainCard';
import { CreateEpic } from 'pages/epics/create-epic';
import Transitions from 'components/@extended/Transitions';
import { useState } from 'react';
import { usePopperStore } from 'zustand-store/PopperRef';

type EpicCardProps = {
  epic: Epic;
};

export const EpicCard = ({ epic }: EpicCardProps) => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const { epicCardRef, epicAnchorRef: anchorRef } = usePopperStore();
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="epic-card-container">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="epic-card-content" onClick={handleToggle} ref={epicCardRef}>
        <CrownOutlined
          style={{
            verticalAlign: '-1em',
            fontSize: '18px',
            color: IndicatorColors[epic.status ?? EpicStatus.IN_PROGRESS],
            marginBottom: '4px'
          }}
        />
        <div className="epic-card-title">{epic.title}</div>
      </div>
      <Popper placement={matchesXs ? 'bottom' : 'bottom-end'} open={open} anchorEl={anchorRef.current} role={undefined} transition>
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Create"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <IconButton size="small" onClick={handleToggle}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                  <CreateEpic epic={epic} handleToggle={handleToggle} />
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </div>
  );
};
