// Mock WebSocket server
jest.mock('ws', () => {
    const mockWs = {
        Server: jest.fn().mockImplementation(() => ({
            on: jest.fn(),
            close: jest.fn()
        })),
        OPEN: 1,
        CLOSED: 3
    };
    return mockWs;
});

// Mock MediaSoup
jest.mock('mediasoup', () => ({
    createWorker: jest.fn().mockResolvedValue({
        on: jest.fn(),
        createRouter: jest.fn().mockResolvedValue({
            rtpCapabilities: {},
            createWebRtcTransport: jest.fn().mockResolvedValue({
                id: 'test-transport-id',
                iceParameters: {},
                iceCandidates: [],
                dtlsParameters: {},
                connect: jest.fn().mockResolvedValue(true)
            })
        })
    })
})); 