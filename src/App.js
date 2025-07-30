import { PipelineUI } from './ui';
import { NodePannel } from './nodePannel';

function App() {
  return (
    <div>
      <div style={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}>
        <PipelineUI />
        <NodePannel />
      </div>
    </div>
  );
}

export default App;
