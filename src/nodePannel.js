// nodePannel.js - Side panel with tabs
'use client'
import './common.css'
import './nodePannel.css'
import { useState } from 'react';
import { useStore } from './store';
import Editor from '@monaco-editor/react';
import { IconArrowLeft } from '@tabler/icons-react';

export const NodePannel = () => {
    const { currentSelectId, nodes, edges, setCurrentSelectId, addChild, deleteNode } = useStore();
    const [activeTab, setActiveTab] = useState('details');

    const selectedNode = nodes.find((n) => n.id === currentSelectId);

    const renderDetails = () => {
        if (!selectedNode) return <div className="placeholder-text">Select a node to view details</div>;
        return (
            <div className="nodePannel-inner">
                <div className="nodePannel-header">
                    <IconArrowLeft stroke={1} size={24} onClick={() => setCurrentSelectId(null)} /> Node Details
                </div>
                <div><strong>Type:</strong> {selectedNode.type}</div>
                <div><strong>ID:</strong> {selectedNode.id}</div>
                <div className="nodePannel-details">
                    {selectedNode.type === 'account' && (
                        <>
                            <button className="pannel-btn primary" onClick={() => addChild(selectedNode.id, 'loan')}>Add Loan</button>
                            <button className="pannel-btn secondary" onClick={() => addChild(selectedNode.id, 'collateral')}>Add Collateral</button>
                        </>
                    )}
                    {selectedNode.type === 'loan' && (
                        <button className="pannel-btn secondary" onClick={() => addChild(selectedNode.id, 'collateral')}>Add Collateral</button>
                    )}
                    <button className="pannel-btn danger" onClick={() => deleteNode(selectedNode.id)}>Delete Node</button>
                </div>
            </div>
        );
    };

    const renderExport = () => (
        <div className="export-container">
            <Editor
                height="600px"
                defaultLanguage="json"
                options={{ readOnly: true, minimap: { enabled: false } }}
                value={JSON.stringify({ nodes, edges }, null, 2)}
            />
        </div>
    );

    return (
        <div className="nodePannel-con">
            <div className="tab-bar">
                <button className={activeTab === 'details' ? 'tab active' : 'tab'} onClick={() => setActiveTab('details')}>
                    Node Details
                </button>
                <button className={activeTab === 'export' ? 'tab active' : 'tab'} onClick={() => setActiveTab('export')}>
                    Tree Export
                </button>
            </div>
            {activeTab === 'details' ? renderDetails() : renderExport()}
        </div>
    );
};
