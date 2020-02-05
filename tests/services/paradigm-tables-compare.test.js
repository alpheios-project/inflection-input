/* eslint-env jest */
/* eslint-disable no-unused-vars */
import ParadigmTablesCompare from '@/services/paradigm-tables-compare.js'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants } from 'alpheios-data-models'

describe('paradigm-tables-compare.test.js', () => {
  let testHomonym
  beforeAll(async () => {
    let targetWord1 = 'βουλεύσοιτο'
    let targetWord2 = 'λελύσῃ'
    let targetWord3 = 'ἰοίην'
    let targetWord4 = 'ἐλῴη'

    let adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: targetWord4
      }
    })

    testHomonym = adapterTuftsRes.result
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1.ParadigmTablesCompare - ', async () => {
    let adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'βουλεύσοιτο'
      }
    })

    let testHomonym = adapterTuftsRes.result

    let checkInfl = testHomonym.lexemes[0].inflections[0]
    let matchedRules = ParadigmTablesCompare.compareInflectionWithParadigms(checkInfl)

    expect(matchedRules['verbParadigmTables']).toBeDefined()
    expect(matchedRules['verbParadigmTables'].length).toEqual(2)

    expect(matchedRules['verbParadigmTables'][0].paradigmID).toEqual('verbpdgm3')
    expect(matchedRules['verbParadigmTables'][1].paradigmID).toEqual('verbpdgm4')
  })

  it('2.ParadigmTablesCompare - ', async () => {
    let adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'λελύσῃ'
      }
    })

    let testHomonym = adapterTuftsRes.result
    // console.info('testHomonym - ', testHomonym.inflections)

    let finalMatchedRules = ParadigmTablesCompare.compareHomonymWithParadigms(testHomonym)
    // console.info('finalMatchedRules - ', finalMatchedRules['Lexeme 1'])

    expect(finalMatchedRules['Lexeme 1']).toBeDefined()
    expect(finalMatchedRules['Lexeme 1']['Inflection 1']).toBeDefined()
    expect(finalMatchedRules['Lexeme 1']['Inflection 1']['verbParadigmTables']).toBeDefined()
    expect(finalMatchedRules['Lexeme 1']['Inflection 1']['verbParadigmTables'].length).toEqual(1)
    expect(finalMatchedRules['Lexeme 1']['Inflection 1']['verbParadigmTables'][0].paradigmID).toEqual('verbpdgm16')
  })

  it('3.ParadigmTablesCompare - ', async () => {
    let adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'ἐλῴη'
      }
    })

    let testHomonym = adapterTuftsRes.result

    let matchedRules = ParadigmTablesCompare.compareInflectionWithParadigms(testHomonym.inflections[0])

    Object.keys(matchedRules).forEach(typeTable => {
      ParadigmTablesCompare.markFinalRules(matchedRules[typeTable])
    })

    // console.info('matchedRules - ', matchedRules)
    expect(matchedRules['verbParadigmTables'][0].chosen).not.toBeTruthy()
    expect(matchedRules['verbParadigmTables'][1].chosen).toBeTruthy()
  })
})
