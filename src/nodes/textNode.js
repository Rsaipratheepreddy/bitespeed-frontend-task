// textNode.js

import { Handle, Position } from 'reactflow';
import BaseNode from './baseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {

  const { setCurrentSelectId, currentSelectId } = useStore();

  return (
    <BaseNode title="Send Message" isSelected={currentSelectId === id} onClick={() => setCurrentSelectId(id)}>
      <p style={{ color: 'black', fontSize: '18px', fontWeight: '400' }}>
        {data}
      </p>
      <Handle
        type='target'
        position={Position.Left}
        id={`text-input`}
      />
      <Handle

        type='source'
        position={Position.Right}
        id={`text-output`}
      />
    </BaseNode>
  );
}
