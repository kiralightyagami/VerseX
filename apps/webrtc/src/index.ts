import { WebSocketServer } from 'ws';
import { User } from './manager/User';
import { MediaSoupSFU } from './manager/MediaSoupSFU';

const wss = new WebSocketServer({ port: 8081 });
const mediaSoupSFU = MediaSoupSFU.getInstance();

async function main() {
    try {
        console.log('Initializing MediaSoup SFU...');
        await mediaSoupSFU.init();
        console.log('MediaSoup SFU initialized successfully');

        wss.on('connection', (ws) => {
            console.log('New WebSocket connection');
            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
            });

            const user = new User(ws);

            ws.on('close', () => {
                console.log('Client disconnected');
                mediaSoupSFU.removeUserFromRoom(user);
                user.cleanup();
            });
        });

        console.log('WebSocket server listening on port 8081');
    } catch (error) {
        console.error('Failed to initialize server:', error);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
});