import './CreateTask.scss';
import { useEffect, useState } from 'react';
import { Grid, Stack, Typography, SelectChangeEvent, Button } from '@mui/material';
import { CustomInput } from 'components/CustomInput';
import { ChangeEvent } from 'react';
import { CustomSelect } from 'components/CustomSelect';
import { ColumnName, Task } from '../../../Types/Task';
import { useEpicStore } from 'zustand-store/EpicStore';
import { EpicStatus } from '../../../Types/Epic';
import { useTaskStore } from 'zustand-store/TaskStore';
import { EpicApi } from 'Api/Epic/impl/EpicApi';

type CreateTaskProps = {
  handleToggle: () => void;
  Task?: Task;
};

export const epicDescription =
  'In LifeOps an "epic" transcends the conventional concept of a product goal and becomes a manifestation of a grander life pursuit. An epic represents a strategic and profound objective, a monumental journey that unfolds over time.';

export const CreateTask = ({ handleToggle, Task }: CreateTaskProps) => {
  const [epic, setEpic] = useState(Task ? Task.epic_id : '');
  const [epicName, setEpicName] = useState(Task ? Task.epic_id : '');
  const [taskName, setTaskName] = useState(Task ? Task.title : '');
  const [taskStatus, setTaskStatus] = useState<ColumnName>(Task ? (Task.status as ColumnName) : ColumnName.NEW);
  const [taskPoints, setTaskPoints] = useState(Task ? Task.points : 1);
  const [isTaskValid, setIsTaskValid] = useState(true);
  const [isEpicValid, setIsEpicValid] = useState(true);

  const { Epics, FetchEpics: fetchEpics, AddEpic } = useEpicStore();
  const { AddTask, UpdateTask, DeleteTask } = useTaskStore();

  useEffect(() => {
    fetchEpics('1');
  }, [fetchEpics]);

  useEffect(() => {
    if (!Task) {
      if (epic && taskName && taskStatus && taskPoints) {
        setIsTaskValid(false);
      } else {
        setIsTaskValid(true);
      }
    } else {
      if (taskName && epic && taskPoints) {
        setIsTaskValid(false);
      } else {
        setIsTaskValid(true);
      }
    }
  }, [epic, taskName, taskStatus, taskPoints, Task]);

  useEffect(() => {
    if (epicName) {
      setIsEpicValid(false);
    } else {
      setIsEpicValid(true);
    }
  }, [epicName]);

  const handleEpicNameChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    setEpic(event.target.value as string);
  };

  const handleTaskNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };
  const handleFirstEpicNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEpicName(e.target.value);
  };

  const handlePointsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskPoints(Number(e.target.value));
  };

  const handleStatusChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    setTaskStatus(event.target.value as ColumnName);
  };

  const Create = async () => {
    Task
      ? UpdateTask({ ...Task, title: taskName, status: taskStatus, points: taskPoints, epic_id: epic })
      : Epics.length
      ? AddTask({ title: taskName, status: taskStatus, points: taskPoints, epic_id: epic, user_id: '1' })
      : AddEpic({ title: epicName, status: EpicStatus.IN_PROGRESS, user_id: '1' });

    handleToggle();
  };

  return (
    <Grid container spacing={3} padding={3} paddingTop={0}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: -1 } }}>
          <Typography variant="h3"> {Task ? 'Edit Task' : Epics.length ? 'Create a Task' : 'Create your first epic'}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {Epics?.length ? (
          <>
            <CustomSelect title="Epic" placeholder="Select an epic" value={epic} options={Epics} handleChange={handleEpicNameChange} />
            <CustomInput title="Title" placeholder="Enter task title" value={taskName} handleChange={handleTaskNameChange} />
            <div className="status-points-container">
              {!Task ? (
                <CustomSelect
                  title="Status"
                  placeholder="select task status"
                  value={taskStatus}
                  options={[
                    { title: 'New', id: ColumnName.NEW },
                    { title: 'Committed', id: ColumnName.COMMITTED },
                    { title: 'Active', id: ColumnName.ACTIVE }
                  ]}
                  handleChange={handleStatusChange}
                />
              ) : (
                <></>
              )}
              <CustomInput title="Points" placeholder="# of days" value={taskPoints} handleChange={handlePointsChange} />
            </div>
          </>
        ) : (
          <div className="epic-info-container">
            <Typography variant="caption" color="textSecondary">
              {epicDescription}
            </Typography>
            <CustomInput title="Create an epic" placeholder="Enter epic title" value={epicName} handleChange={handleFirstEpicNameChange} />
          </div>
        )}
        <div className="button-container">
          <Button
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            disabled={Epics.length ? isTaskValid : isEpicValid}
            onClick={Create}
          >
            {Task ? 'update task' : Epics.length ? 'create task' : 'create epic'}
          </Button>
          {Task ? (
            <Button
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="error"
              // sx={{ backgroundColor: 'red' }}
              disabled={Epics.length ? isTaskValid : isEpicValid}
              onClick={() => {
                DeleteTask(Task.id);
                handleToggle();
              }}
            >
              Delete Task
            </Button>
          ) : (
            <> </>
          )}
        </div>
      </Grid>
    </Grid>
  );
};
