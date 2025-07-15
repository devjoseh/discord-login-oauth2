"use client";

import { ArrowLeft, Search, Filter, Users, Crown, Shield, Star, Grid3X3, List, SortAsc, SortDesc, LogOut } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Guild, getUserRoleInGuild, getImportantFeatures } from "@/utils/functions/guilds";
import { Button, Input, Badge, GuildCard, GuildListItem } from "@/components/index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import Link from "next/link";

type ViewMode = "grid" | "list";
type SortBy = "name" | "role" | "features";
type SortOrder = "asc" | "desc";
type FilterBy =
    | "all"
    | "owner"
    | "admin"
    | "verified"
    | "partnered"
    | "community"
    | "boosted";

interface ServersContentProps {
    guilds: Guild[];
}

export function ServersContent({ guilds }: ServersContentProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [sortBy, setSortBy] = useState<SortBy>("name");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [filterBy, setFilterBy] = useState<FilterBy>("all");

    const filteredAndSortedGuilds = useMemo(() => {
        const filtered = guilds.filter((guild) => {
            const matchesSearch = guild.name.toLowerCase().includes(searchQuery.toLowerCase());
            if (!matchesSearch) return false;

            // Category filter
            switch (filterBy) {
                case "owner":
                    return guild.owner;
                case "admin":
                    const role = getUserRoleInGuild(guild.permissions,guild.owner);
                    return role.role === "Administrator" || guild.owner;
                case "verified":
                    return guild.features.includes("VERIFIED");
                case "partnered":
                    return guild.features.includes("PARTNERED");
                case "community":
                    return guild.features.includes("COMMUNITY");
                case "boosted":
                    return guild.features.some((f) => f.includes("AUDIO_BITRATE") || f.includes("MAX_FILE_SIZE"));
                default:
                    return true;
            }
        });

        // Sort
        filtered.sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case "name":
                    comparison = a.name.localeCompare(b.name);
                    break;
                case "role":
                    const roleA = getUserRoleInGuild(a.permissions, a.owner);
                    const roleB = getUserRoleInGuild(b.permissions, b.owner);
                    const roleOrder = {
                        Owner: 4,
                        Administrator: 3,
                        Manager: 2,
                        Moderator: 1,
                        Member: 0,
                    };
                    comparison =
                        (roleOrder[roleB.role as keyof typeof roleOrder] || 0) -
                        (roleOrder[roleA.role as keyof typeof roleOrder] || 0);
                    break;
                case "features":
                    comparison = getImportantFeatures(b.features).length - getImportantFeatures(a.features).length;
                    break;
            }

            return sortOrder === "asc" ? comparison : -comparison;
        });

        return filtered;
    }, [guilds, searchQuery, filterBy, sortBy, sortOrder]);

    const getFilterCounts = () => {
        return {
            all: guilds.length,
            owner: guilds.filter((g) => g.owner).length,
            admin: guilds.filter((g) => {
                const role = getUserRoleInGuild(g.permissions, g.owner);
                return role.role === "Administrator" || g.owner;
            }).length,
            verified: guilds.filter((g) => g.features.includes("VERIFIED")).length,
            partnered: guilds.filter((g) => g.features.includes("PARTNERED")).length,
            community: guilds.filter((g) => g.features.includes("COMMUNITY")).length,
            boosted: guilds.filter((g) =>g.features.some((f) => f.includes("AUDIO_BITRATE") || f.includes("MAX_FILE_SIZE"))).length,
        };
    };

    const filterCounts = getFilterCounts();

    return (
        <div className="min-h-screen gradient-bg">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button asChild variant="ghost">
                            <Link href="/dashboard">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Voltar
                            </Link>
                        </Button>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                                Dashboard
                            </span>
                        </div>
                    </div>

                    <form>
                        <Button variant="destructive" type="submit">
                            <LogOut className="w-4 h-4 mr-2" />
                            Desconectar
                        </Button>
                    </form>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Page Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Servidores
                        </h1>
                        <p className="text-muted-foreground">
                            Explore os {guilds.length} servidores
                        </p>
                    </div>

                    {/* Search and Controls */}
                    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                        <CardHeader>
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                                <div className="flex-1 max-w-md">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                        <Input
                                            placeholder="Buscar servidor..."
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    {/* Sort Controls */}
                                    <Select
                                        value={sortBy}
                                        onValueChange={(value: SortBy) =>setSortBy(value)}
                                    >
                                        <SelectTrigger className="w-32">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="name">
                                                Nome
                                            </SelectItem>
                                            <SelectItem value="role">
                                                Cargo
                                            </SelectItem>
                                            <SelectItem value="features">
                                                Recursos
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                                        }
                                    >
                                        {sortOrder === "asc" ? (
                                            <SortAsc className="w-4 h-4" />
                                        ) : (
                                            <SortDesc className="w-4 h-4" />
                                        )}
                                    </Button>

                                    {/* View Mode Toggle */}
                                    <div className="flex border rounded-lg">
                                        <Button
                                            variant={
                                                viewMode === "grid"
                                                    ? "default"
                                                    : "ghost"
                                            }
                                            size="sm"
                                            onClick={() => setViewMode("grid")}
                                            className="rounded-r-none"
                                        >
                                            <Grid3X3 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant={
                                                viewMode === "list"
                                                    ? "default"
                                                    : "ghost"
                                            }
                                            size="sm"
                                            onClick={() => setViewMode("list")}
                                            className="rounded-l-none"
                                        >
                                            <List className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Filters */}
                    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                        <CardContent className="pt-6">
                            <Tabs
                                value={filterBy}
                                onValueChange={(value) => setFilterBy(value as FilterBy)}
                            >
                                <TabsList className="grid w-full grid-cols-7">
                                    <TabsTrigger
                                        value="all"
                                        className="flex items-center space-x-1"
                                    >
                                        <Users className="w-4 h-4" />
                                        <span>Todos</span>
                                        <Badge
                                            variant="secondary"
                                            className="ml-1"
                                        >
                                            {filterCounts.all}
                                        </Badge>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="owner"
                                        className="flex items-center space-x-1"
                                    >
                                        <Crown className="w-4 h-4" />
                                        <span>Dono</span>
                                        <Badge
                                            variant="secondary"
                                            className="ml-1"
                                        >
                                            {filterCounts.owner}
                                        </Badge>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="admin"
                                        className="flex items-center space-x-1"
                                    >
                                        <Shield className="w-4 h-4" />
                                        <span>Administrador</span>
                                        <Badge
                                            variant="secondary"
                                            className="ml-1"
                                        >
                                            {filterCounts.admin}
                                        </Badge>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="verified"
                                        className="flex items-center space-x-1"
                                    >
                                        <Shield className="w-4 h-4" />
                                        <span>Verificado</span>
                                        <Badge
                                            variant="secondary"
                                            className="ml-1"
                                        >
                                            {filterCounts.verified}
                                        </Badge>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="partnered"
                                        className="flex items-center space-x-1"
                                    >
                                        <Star className="w-4 h-4" />
                                        <span>Parceiro</span>
                                        <Badge
                                            variant="secondary"
                                            className="ml-1"
                                        >
                                            {filterCounts.partnered}
                                        </Badge>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="community"
                                        className="flex items-center space-x-1"
                                    >
                                        <Users className="w-4 h-4" />
                                        <span>Comunidade</span>
                                        <Badge
                                            variant="secondary"
                                            className="ml-1"
                                        >
                                            {filterCounts.community}
                                        </Badge>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="boosted"
                                        className="flex items-center space-x-1"
                                    >
                                        <Star className="w-4 h-4" />
                                        <span>Impulsionado</span>
                                        <Badge
                                            variant="secondary"
                                            className="ml-1"
                                        >
                                            {filterCounts.boosted}
                                        </Badge>
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <Filter className="w-5 h-5" />
                                    <span>
                                        {filteredAndSortedGuilds.length} de{" "}
                                        {guilds.length} servidores
                                    </span>
                                </CardTitle>
                                {searchQuery && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        Limpar busca
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {filteredAndSortedGuilds.length === 0 ? (
                                <div className="text-center py-12">
                                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        Nenhum servidor encontrado
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {searchQuery
                                            ? `Nenhum servidor coincide com "${searchQuery}"`
                                            : "Nenhum servidor coincide com filtros selecionados"}
                                    </p>
                                </div>
                            ) : viewMode === "grid" ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {filteredAndSortedGuilds.map((guild) => (
                                        <GuildCard
                                            key={guild.id}
                                            guild={guild}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {filteredAndSortedGuilds.map((guild) => (
                                        <GuildListItem
                                            key={guild.id}
                                            guild={guild}
                                        />
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Statistics */}
                    {guilds.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                                <CardContent className="p-4 text-center">
                                    <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold">
                                        {filterCounts.owner}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Servidores próprios
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                                <CardContent className="p-4 text-center">
                                    <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold">
                                        {filterCounts.verified}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Servidores Verificados
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                                <CardContent className="p-4 text-center">
                                    <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold">
                                        {filterCounts.community}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Servidores de Comunidade
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                                <CardContent className="p-4 text-center">
                                    <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold">
                                        {filterCounts.boosted}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Servidores Impulsionados
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
