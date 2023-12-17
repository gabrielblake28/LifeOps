import './dashboard.scss';
import { ColumnName } from '../../Types/Task';
import { useTaskStore } from 'zustand-store/TaskStore';
import { useEffect, useState } from 'react';
import { DashboardColumn } from './DashboardColumn';

export function DashboardDefault() {
  const { Tasks, FetchTasks, UpdateTask: UpdateTaskStatusForDashboard, GetTaskById } = useTaskStore();

  useEffect(() => {
    FetchTasks('1');
  }, [FetchTasks]);

  const HandleOnDrop = async (e: React.DragEvent, newStatus: ColumnName) => {
    const taskId = e.dataTransfer.getData('id');
    const task = await GetTaskById(taskId);

    if (task && task.status !== newStatus) {
      UpdateTaskStatusForDashboard(task, newStatus);
    }
  };

  const HandleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="dashboard-container">
      {Object.entries(Tasks).map(([key, value]) => {
        return <DashboardColumn key={key} title={key} value={value} HandleOnDrop={HandleOnDrop} HandleDragOver={HandleDragOver} />;
      })}
    </div>
  );
}

export default DashboardDefault;
