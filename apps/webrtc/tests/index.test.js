const WebSocket = require('ws');
const { MediaSoupSFU } = require('../src/manager/MediaSoupSFU');
const { User } = require('../src/manager/User');

describe('WebRTC Tests', () => {
    let mediaSoupSFU;
    let mockWs;
    let user;

    beforeEach(() => {
        // Mock WebSocket
        mockWs = {
            send: jest.fn(),
            on: jest.fn(),
            close: jest.fn()
        };

        // Initialize MediaSoupSFU
        mediaSoupSFU = MediaSoupSFU.getInstance();
        
        // Create a new user for each test
        user = new User(mockWs);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('MediaSoupSFU', () => {
        test('should initialize MediaSoup worker', async () => {
            await mediaSoupSFU.init();
            expect(mediaSoupSFU.worker).toBeDefined();
        });

        test('should create or join room', async () => {
            const roomId = 'test-room';
            await mediaSoupSFU.createOrJoinRoom(user, roomId);
            
            // Verify room was created and user was added
            const room = mediaSoupSFU.rooms.get(roomId);
            expect(room).toBeDefined();
            expect(room.users.has(user)).toBe(true);
            
            // Verify user received roomJoined message
            expect(mockWs.send).toHaveBeenCalledWith(
                expect.stringContaining('roomJoined')
            );
        });

        test('should create send transport', async () => {
            const roomId = 'test-room';
            await mediaSoupSFU.createOrJoinRoom(user, roomId);
            await mediaSoupSFU.createSendWebRTCTransport(user);

            // Verify transport was created and user received message
            expect(mockWs.send).toHaveBeenCalledWith(
                expect.stringContaining('sendTransportCreated')
            );
        });

        test('should create receive transport', async () => {
            const roomId = 'test-room';
            await mediaSoupSFU.createOrJoinRoom(user, roomId);
            await mediaSoupSFU.createReceiveWebRTCTransport(user);

            // Verify transport was created and user received message
            expect(mockWs.send).toHaveBeenCalledWith(
                expect.stringContaining('receiveTransportCreated')
            );
        });
    });

    describe('User', () => {
        test('should handle WebSocket messages', () => {
            const messageHandler = mockWs.on.mock.calls.find(
                call => call[0] === 'message'
            )[1];

            // Simulate receiving a message
            const testMessage = JSON.stringify({
                type: 'joinRoom',
                roomId: 'test-room'
            });
            messageHandler(testMessage);

            // Verify message was processed
            expect(mockWs.send).toHaveBeenCalled();
        });

        test('should cleanup on close', () => {
            const closeHandler = mockWs.on.mock.calls.find(
                call => call[0] === 'close'
            )[1];

            // Simulate WebSocket close
            closeHandler();

            // Verify cleanup was performed
            expect(mediaSoupSFU.rooms.size).toBe(0);
        });
    });

    describe('WebSocket Server', () => {
        test('should handle client connections', () => {
            const wss = new WebSocket.Server({ port: 8081 });
            
            // Simulate client connection
            const client = new WebSocket('ws://localhost:8081');
            
            client.on('open', () => {
                expect(client.readyState).toBe(WebSocket.OPEN);
                client.close();
            });
        });
    });
}); 