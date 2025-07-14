import { testDatabaseConnection } from "@/utils/actions/test";

export default async function Home() {
    const isConnected = await testDatabaseConnection();

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            {isConnected ? (
                <h2 className="text-lg text-green-500">
                    Banco de dados conectado com sucesso!
                </h2>
            ) : (
                <h2 className="text-lg text-red-500">
                    Banco de dados não conectado!
                </h2>
            )}
        </div>
    );
}
