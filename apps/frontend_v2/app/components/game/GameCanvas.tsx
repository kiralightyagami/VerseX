import Phaser from "phaser";
import { useEffect, useRef } from "react";
import Preloader from "../../lib/Preloaader";
import MultiplayerGame from "../../lib/Multiplayer";    
import { useParams } from "next/navigation";
import { VideoCall } from "../VideoCall";

function GameCanvas() {
    const params = useParams();
    const gameContainerRef = useRef(null)

    useEffect(() => {
        const game = new Phaser.Game({
            type: Phaser.AUTO,
            parent: 'phaser-game',
            width: 1024,
            height: 768,
            scene: [Preloader, new MultiplayerGame(params.id as string)],
            scale: {
                zoom: 1
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { x: 0, y: 0 }
                }
            }
        });

        return () => {
            game.destroy(true);
        }
    }, [])

    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
                <div id="phaser-game" key='phaser-gamer' ref={gameContainerRef} />
                <VideoCall />
            </div>
        </>
    )
}

export default GameCanvas