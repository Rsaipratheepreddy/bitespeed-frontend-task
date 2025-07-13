// toolbar.js
'use client'
import './common.css'
import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { useState, useEffect } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';

export const NodePannel = () => {
    const { setCurrentSelectId, currentSelectId, nodes, updateNodeField } = useStore();

    const [data, setData] = useState('')

    useEffect(() => {
        const node = nodes.find((node) => node.id === currentSelectId)
        setData(node?.data);
    }, [currentSelectId])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentSelectId && data !== undefined) {
                updateNodeField(currentSelectId, data)
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [data, currentSelectId, updateNodeField])

    return (
        <div className="nodePannel-con">
            {currentSelectId ? <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className='nodePannel-con-title'> <IconArrowLeft stroke={1} size={24} onClick={() => setCurrentSelectId(null)} /> Message </div>
                <label>Text</label>
                <textarea value={data} onChange={(e) => setData(e.target.value)} />
            </div> : <DraggableNode type='text' label='Text' />}
        </div>
    );
};