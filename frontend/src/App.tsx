import '@xyflow/react/dist/style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Workflow from './components/Workflow';

export default function App() {

  return <div>
  <BrowserRouter>
    <Routes>
      <Route path="/create-workflow" element={<Workflow/>}/>
    </Routes>
  </BrowserRouter>
</div>
}