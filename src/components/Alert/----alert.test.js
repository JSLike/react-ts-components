const mockCallback = jest.fn(x => 42 + x);

function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
        callback(items[index]);
    }
}

forEach([0, 1], mockCallback)
new mockCallback(111)
new mockCallback('aaa')

test('my test template ', () => {
    let mockItem = mockCallback.mock;
    console.log("mockItem-----", mockItem)

// The mock function is called twice
    expect(mockItem.calls.length).toBe(4);

// The first argument of the first call to the function was 0
    expect(mockItem.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
    expect(mockItem.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
    expect(mockItem.results[0].value).toBe(42);

//the instances times but cannot know isTrue
    expect(mockItem.instances.length).toBe(4)
})
