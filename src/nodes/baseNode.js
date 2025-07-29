import './baseNode.css'
import { Handle, Position } from 'reactflow';
import { IconMessage, IconBrandWhatsapp } from '@tabler/icons-react';

const BaseNode = ({
    title,
    children,
    handles = [],
    isSelected = false,
    onClick,
}) => {
    const renderHandles = () => {
        return handles.map((handle, index) => (
            <Handle
                key={`${handle.id || index}`}
                type={handle.type || 'source'}
                position={handle.position || Position.Right}
                id={handle.id || `handle-${index}`}
                style={handle.style || {}}
            />
        ));
    };

    return (
        <div className={isSelected ? "nodeCard selected" : "nodeCard"} onClick={onClick}>
            <div className="nodeTitleCon">
                {title}
            </div>
            <div className="nodeContent">
                {children}
            </div>
            {renderHandles()}
        </div>
    );
};

export default BaseNode;