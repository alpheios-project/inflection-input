import { ClientAdapters } from 'alpheios-client-adapters'
import { ViewSetFactory } from 'alpheios-inflection-tables'
// import { LanguageModelFactory as LMF } from 'alpheios-data-models'

export default class GetHomonymData {
  static async getHomonym (targetWord, languageID) {
    // const langCode = LMF.getLanguageCodeFromId(languageID)
    const adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: languageID,
        word: targetWord
      }
    })
    return adapterTuftsRes
  }

  static getInflectionSet (homonym) {
    const locale = 'en-US'
    const inflectionsViewSet = ViewSetFactory.create(homonym, locale)
    return inflectionsViewSet
  }
}
