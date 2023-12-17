import './dashboard.scss';
import { ColumnName } from '../../Types/Task';
import { SectionHeader } from 'components/cards/headers/SectionHeader';
import { RenderTaskComponent } from 'utils/RenderComponent';
import { CaretRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useTaskStore } from 'zustand-store/TaskStore';
import { useEffect } from 'react';

export function DashboardDefault() {
  const { Tasks, FetchTasks, UpdateTaskStatusForDashboard, GetTaskById } = useTaskStore();

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
      <div
        className="dashboard-column"
        onDrop={(e: React.DragEvent) => {
          HandleOnDrop(e, ColumnName.NEW);
        }}
        onDragOver={HandleDragOver}
      >
        <SectionHeader title="New" icon={<CaretRightOutlined style={{ verticalAlign: '-0.3em', color: '#00A7FA' }} />} />
        <div className="droppable-column">{RenderTaskComponent(Tasks.new)}</div>
      </div>
      <div className="dashboard-column">
        <SectionHeader title="Committed" icon={<CaretRightOutlined style={{ verticalAlign: '-0.3em', color: '#bc85fa' }} />} />
        <div
          className="droppable-column"
          onDrop={(e: React.DragEvent) => {
            HandleOnDrop(e, ColumnName.COMMITTED);
          }}
          onDragOver={HandleDragOver}
        >
          {RenderTaskComponent(Tasks.committed)}
        </div>
      </div>
      <div className="dashboard-column">
        <SectionHeader title="Active" icon={<CaretRightOutlined style={{ verticalAlign: '-0.3em', color: '#F6A229' }} />} />
        <div
          className="droppable-column"
          onDrop={(e: React.DragEvent) => {
            HandleOnDrop(e, ColumnName.ACTIVE);
          }}
          onDragOver={HandleDragOver}
        >
          {RenderTaskComponent(Tasks.active)}
        </div>
      </div>
      <div className="dashboard-column">
        <SectionHeader title="Resolved" icon={<CheckCircleOutlined style={{ verticalAlign: '-0.3em', color: '#48EB12' }} />} />
        <div
          className="droppable-column"
          onDrop={(e: React.DragEvent) => {
            HandleOnDrop(e, ColumnName.RESOLVED);
          }}
          onDragOver={HandleDragOver}
        >
          {RenderTaskComponent(Tasks.resolved)}
        </div>
      </div>
    </div>
  );
}

export default DashboardDefault;
