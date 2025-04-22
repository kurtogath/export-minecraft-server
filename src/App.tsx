import { useState } from "react";
import "./styles/main.scss";

function App() {
    const [filePath, setFilePath] = useState<string | null>(null);

    const handleClick = async () => {
        const fileSelected = await window.ipcRenderer.openFileDialog();
        setFilePath(fileSelected);
    };

    return (
        <>
            <div className="main-test">
                <img
                    src={"./src/assets/Caracol.webp"}
                    className="logo"
                    alt="logo"
                />
            </div>
            <h1>Exportar Mundo de maincrah</h1>
            <div className="card">
                <button onClick={handleClick}>Abrir archivo</button>
                <br />
                <span> Archivo seleccionado: {filePath}</span>
            </div>
        </>
    );
}

export default App;
