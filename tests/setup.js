// Mock WebSocket
const mockWebSocket = jest.fn().mockImplementation((url) => ({
    url,
    send: jest.fn(),
    onmessage: jest.fn(),
    onopen: jest.fn(),
    onclose: jest.fn(),
    onerror: jest.fn(),
    readyState: 1, // WebSocket.OPEN
    close: jest.fn()
}));

mockWebSocket.OPEN = 1;
mockWebSocket.CLOSED = 3;

global.WebSocket = mockWebSocket;

// Mock WebSocket Server
jest.mock('ws', () => {
    const mockWs = {
        Server: jest.fn().mockImplementation(() => ({
            on: jest.fn(),
            close: jest.fn(),
            clients: new Set()
        })),
        OPEN: 1,
        CLOSED: 3
    };
    return mockWs;
});

// Mock MediaSoup
const mockRouter = {
    rtpCapabilities: {},
    createWebRtcTransport: jest.fn().mockResolvedValue({
        id: 'test-transport-id',
        iceParameters: {},
        iceCandidates: [],
        dtlsParameters: {},
        connect: jest.fn().mockResolvedValue(true)
    })
};

const mockWorker = {
    on: jest.fn(),
    createRouter: jest.fn().mockResolvedValue(mockRouter)
};

jest.mock('mediasoup', () => ({
    createWorker: jest.fn().mockResolvedValue(mockWorker)
})); 