import MusicBot from '../src/MusicBot'
import Message from '../src/Message'
import ChatRoom from '../src/ChatRoom'

jest.mock('../src/ChatRoom')

// Our test specific implementation of a ChatRoom instance
ChatRoom.mockImplementation(() => {
    return {
        sendMessage: jest.fn()
    }
})

 
describe("MusicBot", ()=> {
    let bot;
    let ChatRoom;

    // Runs before each test. Used for cleaning up mocks and setting up variables that are often used
    beforeEach(()=> {
        // Resets the mocks (clears all calls to functions, etc)
        ChatRoom.mockClear();

        bot = new MusicBot();
        chatRoom = new ChatRoom(); // Resets the mocks (clears all calls to functions, etc)
    })
    test('!ping message should respond with "pong"', () => {
        const messageContent = '!ping';
        const expectedResponse = 'pong';

        const message = new Message(chatRoom, messageContent);

        bot.handleMessage(message);

        // Only one message should be sent
        expect(chatRoom.sendMessage).toBeCalledTimes(1);
        // The message sent should be 'pong'
        expect(chatRoom.sendMessage).toBeCalledWith(expectedResponse);
    })
})

