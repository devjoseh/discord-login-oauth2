import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, DiscordIcon } from "@/components/index";
import { createAuthorizationURL } from "@/utils/functions/discord";
import { ArrowLeft, Shield, LogIn } from "lucide-react";
import Link from "next/link";

export default async function LoginPage() {
    const url = createAuthorizationURL();

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
                <Button asChild variant="ghost" className="mb-6">
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                    </Link>
                </Button>

                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 purple-glow">
                    <CardHeader className="text-center space-y-4">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold">
                            Seja Bem-Vindo(a)
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Faça login com sua conta do Discord para continuar
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <Link
                            href={url}
                        >
                            <Button
                                type="submit"
                                className="w-full text-lg py-6 bg-[#5865F2] hover:bg-[#4752C4] text-white"
                                size="lg"
                            >
                                <DiscordIcon className="w-6 h-6 mr-3" />
                                Continuar com Discord
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
