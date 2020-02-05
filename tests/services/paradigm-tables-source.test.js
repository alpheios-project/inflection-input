/* eslint-env jest */
import ParadigmTablesSource from '@/services/paradigm-tables-source.js'

describe('paradigm-tables-source.test.js', () => {
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

  it('1.ParadigmTablesSource - static verbParadigmRulesCSVData returns object with all rules for verb paradigms', () => {
    let spy = jest.spyOn(ParadigmTablesSource, 'uploadRules')
    expect(ParadigmTablesSource.verbParadigmRulesCSVData).toBeDefined()
    expect(ParadigmTablesSource.uploadRules).toHaveBeenCalledTimes(1)
    spy.mockClear()
  })

  it('2.ParadigmTablesSource - static verbParticipleParadigmRulesCSVData returns object with all rules for verb participle paradigms', () => {
    let spy = jest.spyOn(ParadigmTablesSource, 'uploadRules')
    expect(ParadigmTablesSource.verbParticipleParadigmRulesCSVData).toBeDefined()
    expect(ParadigmTablesSource.uploadRules).toHaveBeenCalledTimes(1)
    spy.mockClear()
  })

  it('3.ParadigmTablesSource - static verbParadigmTables returns object with all verb paradigms tables', () => {
    expect(ParadigmTablesSource.verbParadigmTables).toBeDefined()
    expect(ParadigmTablesSource.verbParadigmTables.tables['verbpdgm1']).toBeDefined()
    expect(ParadigmTablesSource.verbParadigmTables.rules).toBeDefined()
    expect(ParadigmTablesSource.verbParadigmTables.partOfSpeech).toEqual('verb')
  })

  it('4.ParadigmTablesSource - static verbParticipleParadigmTables returns object with all verb participle paradigms tables', () => {
    expect(ParadigmTablesSource.verbParticipleParadigmTables).toBeDefined()
    expect(ParadigmTablesSource.verbParticipleParadigmTables.tables['verbpdgm54']).toBeDefined()
    expect(ParadigmTablesSource.verbParticipleParadigmTables.rules).toBeDefined()
    expect(ParadigmTablesSource.verbParticipleParadigmTables.partOfSpeech).toEqual('verb_participle')
  })
})
