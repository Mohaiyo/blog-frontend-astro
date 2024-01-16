describe('import vue components', () => {
  test('normal imports as expected', async () => {
    const cmp = await import('../src/components/Label.vue')
    expect(cmp).toBeDefined()
  })
})
