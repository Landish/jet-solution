/**
 * Mocks the socket.io-client library
 */
export default jest.fn().mockReturnValue({
  connect: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  emit: jest.fn(),
})
