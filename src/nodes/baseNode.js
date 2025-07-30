import './baseNode.css'
import { Handle, Position } from 'reactflow';


// .nodeCard {
//     display: flex;
//     flex-direction: column;
//     max-width: 200px;
//     border-radius: 4px;
//     min-width: 250px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
// }

// .nodeTitleCon {
//     display: inline;
//     padding: 6px;
//     font-weight: bold;
//     display: flex;
//     justify-content: space-between;
//     font-size: 18px;
//     border-radius: 4px;
//     align-items: center;
//     background-color: #b4efe6;
// }

// .nodeContent {
//     padding: 12px;
// }

// .nodeCard.selected {
//     border: 2px solid rgba(142, 142, 171, 255);
// }

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
        <div    className={`
                flex flex-col
                max-w-[200px] min-w-[250px]
                rounded
                shadow-lg
                ${isSelected ? 'border-2 border-[rgba(142,142,171,255)]' : ''}
            `} onClick={onClick}>
            <div className="
                inline-flex
                justify-between
                items-center
                p-1.5
                font-bold
                text-lg
                rounded
                bg-[#b4efe6]
            ">
                {title}
            </div>
           <div className="p-3">
                {children}
            </div>
            {renderHandles()}
        </div>
    );
};

export default BaseNode;