import { ClientAdapters } from 'alpheios-client-adapters'
import { ViewSetFactory } from 'alpheios-inflection-tables'
import { PsEvent } from 'alpheios-data-models'

export default class GetHomonymData {
  static async getHomonym (targetWord, languageID, getShortDefs = true) {
    // const langCode = LMF.getLanguageCodeFromId(languageID)
    const adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: languageID,
        word: targetWord
      }
    })

    if (getShortDefs && adapterTuftsRes.result) {
      await GetHomonymData.getShortDefinitions(adapterTuftsRes.result)
    }
    return adapterTuftsRes
  }

  static getInflectionSet (homonym) {
    const locale = 'en-US'
    const inflectionsViewSet = ViewSetFactory.create(homonym, locale)
    return inflectionsViewSet
  }

  static async getShortDefinitions (homonym) {
    const lexiconFullOpts = GetHomonymData.getLexiconOptions('lexicons', homonym.languageID)
    await ClientAdapters.lexicon.alpheios({
      method: 'fetchShortDefs',
      clientId: 'alpheios-dev',
      params: {
        opts: lexiconFullOpts,
        homonym: homonym,
        callBackEvtSuccess: GetHomonymData.evt.SHORT_DEFS_READY,
        callBackEvtFailed: GetHomonymData.evt.SHORT_DEFS_NOT_FOUND
      }
    })
  }

  static getLexiconOptions (lexiconKey, languageID) {
    return { allow: ['https://github.com/alpheios-project/lsj'] }
  }

  static onShortDefinitionsReady (data) {
    // console.info('onShortDefinitionsReady data', data)
  }
}

GetHomonymData.evt = {
  SHORT_DEFS_READY: new PsEvent('Short Definitions Data is Ready', GetHomonymData),
  SHORT_DEFS_NOT_FOUND: new PsEvent('Short Definitions Data is Not Found', GetHomonymData)
}
GetHomonymData.evt.SHORT_DEFS_READY.sub(GetHomonymData.onShortDefinitionsReady.bind(GetHomonymData))
