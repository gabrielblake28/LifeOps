import './task-card.scss';
import { Box, Grid, Stack, Typography, Chip, IconButton, Popper, Paper, ClickAwayListener, useMediaQuery } from '@mui/material';
import { RightOutlined, ExclamationOutlined, RiseOutlined, FallOutlined, CloseOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';

import { IndicatorColors } from 'utils/DataStatus';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { GetDateStatus } from 'utils/DataStatus';
import { ColumnName, Task } from '../../../Types/Task';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { CreateTask } from 'pages/dashboard/create-task/CreateTask';
import Transitions from 'components/@extended/Transitions';
import { usePopperStore } from 'zustand-store/PopperRef';

const HandleOnDrag = (e: React.DragEvent, id: string, status: string) => {
  e.dataTransfer.setData('id', id);
  e.dataTransfer.setData('status', status);
};

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { taskCardRef, taskAnchorRef: anchorRef } = usePopperStore();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const dueDate = dayjs()
    .add(task.points ?? 0, 'day')
    .format('MM/DD/YYYY');
  const dateDiff = dayjs(dayjs(dueDate)).diff(dayjs().format('MM/DD/YYYY'), 'day');

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
    <MainCard
      ref={taskCardRef}
      className="card-animation"
      draggable
      onDragStart={(e: any) => HandleOnDrag(e, task.id ?? '', task.status ?? '')}
      contentSX={{ p: 2.5 }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textPrimary">
          {task.title}
        </Typography>
        <Grid container alignItems="center">
          <div className="card-middle">
            <div className="status-points">
              <div className="card-status">
                <Typography variant="subtitle2" color="textSecondary">
                  {task.status}
                </Typography>
                <RightOutlined
                  style={{ verticalAlign: '-0.3em', color: IndicatorColors[task.status], fontSize: '10px', marginLeft: '3px' }}
                />
              </div>
              <div className="card-points">
                <Typography variant="subtitle2" color="textSecondary">
                  points: {task.points}
                </Typography>
              </div>
            </div>
            <div className="edit-card-button">
              <IconButton onClick={handleToggle} size="medium">
                <MoreVertIcon />
              </IconButton>
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
                          <CreateTask handleToggle={handleToggle} Task={task} />
                        </MainCard>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </Popper>
            </div>
          </div>
        </Grid>
      </Stack>
      <Box sx={{ paddingTop: 1 }}>
        {dueDate && task.status === ColumnName.ACTIVE ? (
          <Grid item>
            <Chip label={`${dueDate}`} size="small" />
            {<ExclamationOutlined style={{ color: GetDateStatus(dayjs().format('MM/DD/YYYY'), dueDate) }} />}
          </Grid>
        ) : (
          <></>
        )}
        {task.status === ColumnName.RESOLVED ? (
          <div className="card-total">
            {dateDiff >= 0 ? (
              <RiseOutlined
                style={{
                  verticalAlign: '-0.3em',
                  color: IndicatorColors['success'],
                  fontSize: '16px',
                  marginLeft: '3px'
                }}
              />
            ) : (
              <FallOutlined
                style={{
                  verticalAlign: '-0.3em',
                  color: IndicatorColors['danger'],
                  fontSize: '16px',
                  marginLeft: '3px'
                }}
              />
            )}
            {dateDiff}
          </div>
        ) : (
          <></>
        )}
      </Box>
    </MainCard>
  );
};

TaskCard.defaultProps = {
  color: 'primary'
};

export default TaskCard;
