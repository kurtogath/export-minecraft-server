import "./App.css";

async function runBackup() {
    try {
        // Llamamos al comando "run_backup" registrado en el backend (Rust)
        console.log("Backup");
    } catch (error) {
        console.error("Error al ejecutar el comando:", error);
    }
}

function App() {
    return (
        <main className="container">
            <div className="row">
                <div className="p-4">
                    <h1 className="text-2xl mb-4">
                        Exportador de Mundo Minecraft
                    </h1>
                    <button
                        onClick={runBackup}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Subir mundo a Drive
                    </button>
                </div>
            </div>
        </main>
    );
}

export default App;
