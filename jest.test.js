test('test common matcher',()=>{
    expect(2 + 2 ).toBe(4)
    expect(2 + 2 ).not.toBe(5)

})

test('test tp be true or false',()=>{
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
})

test('test number', ()=>{
    expect(4).toBeGreaterThan(3);
    expect(2).toBeLessThan(3);
})


test('test object',()=>{
    expect({name:'like'}).toEqual({name:'like'})
})

const shoppingList = [
    {'diapers': 'name111'},
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
];

test('the shopping list has beer on it', () => {
    // expect(shoppingList).toContain('beer');
    expect(new Set(shoppingList)).toContainEqual({'diapers':'name111'});
});
