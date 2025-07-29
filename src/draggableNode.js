// draggableNode.js
import { IconMessage } from '@tabler/icons-react';

export const DraggableNode = ({ type, label }) => {

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '80px',
        height: '60px',
        maxWidth: '140px',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        alignItems: 'center',
        borderRadius: '8px',
        border: '1px solid #acb1cd',
        justifyContent: 'space-between',
        flexDirection: 'column'

      }}
      draggable
    >
      <IconMessage stroke={1} size={24} color="#9ca4e2" />
      <span style={{ color: '#9ca4e2' }}>{label}</span>
    </div>
  );
};
