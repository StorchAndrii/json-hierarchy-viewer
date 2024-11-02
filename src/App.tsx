import { ChangeEvent, useCallback, useState } from "react";
import "./styles/App.scss";
import { buildHierarchy, filterHierarchy } from "./utils/utils";
import { ITreeNodeData } from "./interface/treeNodeData.interface";
import TreeNode from "./components/TreeNode";

function App() {
  const [fileData, setFileData] = useState<ITreeNodeData[] | null>(null);
  const [filteredData, setFilteredData] = useState<ITreeNodeData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleProcessData = useCallback(() => {
    if (fileData) {
      const hierarchy = buildHierarchy(fileData);
      const filteredHierarchy = filterHierarchy(hierarchy);
      setFilteredData(filteredHierarchy);
    } else {
      setError("Please upload a file before processing!");
    }
  }, [fileData]);

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(
            e.target?.result as string,
          ) as ITreeNodeData[];
          setFileData(data);
        } catch (error) {
          setError("Invalid JSON format");
        }
      };
      reader.readAsText(file);
    },
    [],
  );

  return (
    <div className="app">
      <h1>Json Hierarchy Viewer</h1>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      <button className="app__button" onClick={handleProcessData}>
        Process
      </button>
      <div className="app__error">{error}</div>
      <div className="app__resultContainer">
        {filteredData.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}

export default App;
