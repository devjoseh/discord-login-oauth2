import { Globe, Music, Gamepad2, ShoppingCart, Video, Users, Zap, Twitter, Instagram, Twitch, Youtube, Github, Facebook } from "lucide-react";

export interface Connection {
    id: string;
    name: string;
    type: string;
    friend_sync: boolean;
    metadata_visibility: number;
    show_activity: boolean;
    two_way_link: boolean;
    verified: boolean;
    visibility: number;
}

export function getConnectionIcon(type: string) {
    switch (type) {
        case "github":
            return <Github className="w-5 h-5" />;
            // return (
            //     <svg
            //         className="w-5 h-5"
            //         fill="currentColor"
            //         viewBox="0 0 24 24"
            //     >
            //         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            //     </svg>
            // );
        case "youtube":
            return <Youtube className="w-5 h-5" />;
            // return (
            //     <svg
            //         className="w-5 h-5"
            //         fill="currentColor"
            //         viewBox="0 0 24 24"
            //     >
            //         <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            //     </svg>
            // );
        case "twitch":
            return <Twitch className="w-5 h-5" />;
            // return (
            //     <svg
            //         className="w-5 h-5"
            //         fill="currentColor"
            //         viewBox="0 0 24 24"
            //     >
            //         <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            //     </svg>
            // );
        case "instagram":
            return <Instagram className="w-5 h-5" />;
            // return (
            //     <svg
            //         className="w-5 h-5"
            //         fill="currentColor"
            //         viewBox="0 0 24 24"
            //     >
            //         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            //     </svg>
            // );
        case "spotify":
            return (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
            );
        case "twitter":
            return <Twitter className="w-5 h-5" />;
        case "x":
            return <Twitter className="w-5 h-5" />;
            // return (
            //     <svg
            //         className="w-5 h-5"
            //         fill="currentColor"
            //         viewBox="0 0 24 24"
            //     >
            //         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            //     </svg>
            // );
        case "reddit":
            return (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
            );
        case "steam":
            return (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.624 0 11.979-5.354 11.979-11.979C23.958 5.354 18.603.001 11.979.001zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
                </svg>
            );
        case "tiktok":
            return (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
            );
        case "bluesky":
            return (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
                </svg>
            );
        case "paypal":
            return (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.26-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.75.75 0 0 0-.741.63l-1.389 8.811a.641.641 0 0 0 .633.74h4.247c.524 0 .968-.382 1.05-.9l.048-.302 1.013-6.41.065-.35A1.064 1.064 0 0 1 14.223 15h.692c3.613 0 6.44-1.467 7.26-5.734.343-1.79.166-3.286-.953-4.349z" />
                </svg>
            );
        case "ebay":
            return <ShoppingCart className="w-5 h-5" />;
        case "crunchyroll":
            return <Video className="w-5 h-5" />;
        case "playstation":
            return <Gamepad2 className="w-5 h-5" />;
        case "xbox":
            return <Gamepad2 className="w-5 h-5" />;
        case "amazon_music":
            return <Music className="w-5 h-5" />;
        case "battlenet":
            return <Zap className="w-5 h-5" />;
        case "bungie":
            return <Gamepad2 className="w-5 h-5" />;
        case "epic_games":
            return <Gamepad2 className="w-5 h-5" />;
        case "facebook":
            return <Facebook className="w-5 h-5" />;
        case "league_of_legends":
            return <Gamepad2 className="w-5 h-5" />;
        case "riot_games":
            return <Gamepad2 className="w-5 h-5" />;
        case "roblox":
            return <Gamepad2 className="w-5 h-5" />;
        case "domain":
            return <Globe className="w-5 h-5" />;
        default:
            return <Globe className="w-5 h-5" />;
    }
}

export function getConnectionColor(type: string) {
    switch (type) {
        case "github":
            return "bg-gray-800 hover:bg-gray-700 text-white";
        case "youtube":
            return "bg-red-600 hover:bg-red-500 text-white";
        case "twitch":
            return "bg-purple-600 hover:bg-purple-500 text-white";
        case "instagram":
            return "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white";
        case "spotify":
            return "bg-green-500 hover:bg-green-400 text-white";
        case "twitter":
        case "x":
            return "bg-black hover:bg-gray-900 text-white";
        case "reddit":
            return "bg-orange-600 hover:bg-orange-500 text-white";
        case "steam":
            return "bg-blue-900 hover:bg-blue-800 text-white";
        case "tiktok":
            return "bg-black hover:bg-gray-900 text-white";
        case "bluesky":
            return "bg-sky-500 hover:bg-sky-400 text-white";
        case "paypal":
            return "bg-blue-600 hover:bg-blue-500 text-white";
        case "ebay":
            return "bg-yellow-500 hover:bg-yellow-400 text-black";
        case "crunchyroll":
            return "bg-orange-500 hover:bg-orange-400 text-white";
        case "playstation":
            return "bg-blue-700 hover:bg-blue-600 text-white";
        case "xbox":
            return "bg-green-600 hover:bg-green-500 text-white";
        case "amazon_music":
            return "bg-blue-500 hover:bg-blue-400 text-white";
        case "battlenet":
            return "bg-blue-800 hover:bg-blue-700 text-white";
        case "bungie":
            return "bg-gray-700 hover:bg-gray-600 text-white";
        case "epic_games":
            return "bg-gray-900 hover:bg-gray-800 text-white";
        case "facebook":
            return "bg-blue-600 hover:bg-blue-500 text-white";
        case "league_of_legends":
            return "bg-yellow-600 hover:bg-yellow-500 text-black";
        case "riot_games":
            return "bg-red-600 hover:bg-red-500 text-white";
        case "roblox":
            return "bg-green-500 hover:bg-green-400 text-white";
        case "domain":
            return "bg-blue-600 hover:bg-blue-500 text-white";
        default:
            return "bg-gray-600 hover:bg-gray-500 text-white";
    }
}

export function getConnectionUrl(connection: Connection) {
    switch (connection.type) {
        case "github":
            return `https://github.com/${connection.name}`;
        case "youtube":
            return `https://youtube.com/channel/${connection.id}`;
        case "twitch":
            return `https://twitch.tv/${connection.name}`;
        case "instagram":
            return `https://instagram.com/${connection.name}`;
        case "spotify":
            return `https://open.spotify.com/user/${connection.id}`;
        case "twitter":
        case "x":
            return `https://twitter.com/${connection.name}`;
        case "reddit":
            return `https://reddit.com/user/${connection.name}`;
        case "steam":
            return `https://steamcommunity.com/profiles/${connection.id}`;
        case "tiktok":
            return `https://tiktok.com/@${connection.name}`;
        case "bluesky":
            return `https://bsky.app/profile/${connection.name}`;
        case "paypal":
            return `https://paypal.me/${connection.name}`;
        case "ebay":
            return `https://ebay.com/usr/${connection.name}`;
        case "crunchyroll":
            return `https://crunchyroll.com/user/${connection.name}`;
        case "playstation":
            return `https://psnprofiles.com/${connection.name}`;
        case "xbox":
            return `https://account.xbox.com/profile?gamertag=${connection.name}`;
        case "amazon_music":
            return `https://music.amazon.com/profiles/${connection.id}`;
        case "battlenet":
            return `https://battle.net`;
        case "bungie":
            return `https://bungie.net/7/en/User/Profile/${connection.id}`;
        case "epic_games":
            return `https://epicgames.com`;
        case "facebook":
            return `https://facebook.com/${connection.name}`;
        case "league_of_legends":
            return `https://op.gg/summoners/${connection.name}`;
        case "riot_games":
            return `https://riot.com`;
        case "roblox":
            return `https://roblox.com/users/${connection.id}/profile`;
        case "domain":
            return `https://${connection.name}`;
        default:
            return "#";
    }
}

export function getConnectionDisplayName(type: string) {
    switch (type) {
        case "github":
            return "GitHub";
        case "youtube":
            return "YouTube";
        case "twitch":
            return "Twitch";
        case "instagram":
            return "Instagram";
        case "spotify":
            return "Spotify";
        case "twitter":
        case "x":
            return "X (Twitter)";
        case "reddit":
            return "Reddit";
        case "steam":
            return "Steam";
        case "tiktok":
            return "TikTok";
        case "bluesky":
            return "Bluesky";
        case "paypal":
            return "PayPal";
        case "ebay":
            return "eBay";
        case "crunchyroll":
            return "Crunchyroll";
        case "playstation":
            return "PlayStation";
        case "xbox":
            return "Xbox";
        case "amazon_music":
            return "Amazon Music";
        case "battlenet":
            return "Battle.net";
        case "bungie":
            return "Bungie.net";
        case "epic_games":
            return "Epic Games";
        case "facebook":
            return "Facebook";
        case "league_of_legends":
            return "League of Legends";
        case "riot_games":
            return "Riot Games";
        case "roblox":
            return "Roblox";
        case "domain":
            return "Custom Domain";
        default:
            return type.charAt(0).toUpperCase() + type.slice(1);
    }
}
