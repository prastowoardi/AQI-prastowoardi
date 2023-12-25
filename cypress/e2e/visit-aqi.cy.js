describe('template spec', () => {
  beforeEach ('', () => {
    cy.visit('')
  })

  afterEach ('Screenshoot ketika tes gagal',function (){
    if (this.currentTest.state === "failed") {
        const testName = this.currentTest.title.replace(/\s+/g, '-')
        cy.log('TEST FAILED')
        cy.screenshot(testName, { capture: 'runner' })
    }
  })

  it('Membaca teks bahasa inggris jika pada URL terdapat "/en/"', () => {
    cy.url().should('eq', 'https://www.asia-quest.jp/en/')
    cy.url().should('include', '/en/')

    cy.get('#hs-eu-policy-wording').invoke('text').then((text) => {
      if (!Cypress.config().baseUrl.includes('/en/') && !text.toLowerCase().includes('setting cookie')) {
        throw new Error('Teks pada pengaturan cookie bukan dalam bahasa Inggris')
      }
    })
  })

  it('Melihat misi perusahaan', () => {
    cy.get('.header__container_inner').contains('Company').click()
    cy.get('.hs-menu-children-wrapper > li').contains('Corporate').should('be.visible').click()
  
    cy.url().should('eq', 'https://www.asia-quest.jp/en/corp-message')
  
    cy.get('.corp-message-section-four').invoke('text').then((text) => {
      const start = text.indexOf('Mission')
      if (start !== -1) {
        const missionText = text.substring(start)
        cy.log(missionText)
      } else {
        throw new Error("Mission text not found")
      }
    })
  })  
})