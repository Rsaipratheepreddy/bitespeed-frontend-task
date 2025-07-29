import { PipelineUI } from './ui';
import { Header } from './header';
import { NodePannel } from './nodePannel';

function App() {
  return (
    <div>
      <Header />
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
