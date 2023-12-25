describe('template spec', () => {
  afterEach ('Screenshoot ketika tes gagal',function (){
    if (this.currentTest.state === "failed") {
        const testName = this.currentTest.title.replace(/\s+/g, '-')
        cy.log('TEST FAILED')
        cy.screenshot(testName, { capture: 'runner' })
    }
  })

  it('Membaca teks bahasa inggris jika pada URL terdapat "/en/"', () => {
    cy.visit('')
    cy.url().should('eq', 'https://www.asia-quest.jp/en/')
    cy.url().should('include', '/en/')

    cy.get('#hs-eu-policy-wording').invoke('text').then((text) => {
      if (!Cypress.config().baseUrl.includes('/en/') && !text.toLowerCase().includes('setting cookie')) {
        throw new Error('Teks pada pengaturan cookie bukan dalam bahasa Inggris')
      }
    })
  })
})