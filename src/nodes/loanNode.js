// loanNode.js

import { Handle, Position } from 'reactflow';
import BaseNode from './baseNode';
import { useStore } from '../store';
import { IconReceipt2 } from '@tabler/icons-react';

export const LoanNode = ({ id, data }) => {
  const { setCurrentSelectId, currentSelectId } = useStore();

  return (
    <BaseNode
      title="Loan"
      icon={<IconReceipt2 stroke={2} size={20} />}
      isSelected={currentSelectId === id}
      onClick={() => setCurrentSelectId(id)}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` },
        { type: 'source', position: Position.Right, id: `${id}-out` },
      ]}
    >
      <p style={{ color: 'black', fontSize: '16px' }}>{data}</p>
    </BaseNode>
  );
};
