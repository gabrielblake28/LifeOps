import { CaretRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { ColumnName, Task } from 'Types/Task';
import { SectionHeader } from 'components/cards/headers/SectionHeader';
import { RenderTaskComponent } from 'utils/RenderComponent';
import { TitleCase } from 'utils/TitleCase';

type DashboardColumnProps = {
  title: string;
  value: Task[];
  HandleOnDrop: (e: React.DragEvent, newStatus: ColumnName) => void;
  HandleDragOver: (e: React.DragEvent) => void;
};

export function DashboardColumn({ title, value, HandleOnDrop, HandleDragOver }: DashboardColumnProps): JSX.Element {
  return (
    <div
      className="dashboard-column"
      onDrop={(e: React.DragEvent) => {
        HandleOnDrop(e, title as ColumnName);
      }}
      onDragOver={HandleDragOver}
    >
      <SectionHeader
        title={TitleCase(title as ColumnName)}
        icon={
          title !== ColumnName.RESOLVED ? (
            <CaretRightOutlined style={{ verticalAlign: '-0.3em', color: '#00A7FA' }} />
          ) : (
            <CheckCircleOutlined style={{ verticalAlign: '-0.3em', color: 'rgb(72, 235, 18)' }} />
          )
        }
      />
      <div className={'droppable-column'}>{RenderTaskComponent(value)}</div>
    </div>
  );
}
