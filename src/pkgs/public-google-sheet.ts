// import { nodeFetch } from "..";
const nodeFetch = async (url:string ) => {
    const moduleR = url.startsWith('https:') ? await import('https') : await import('http')
        return new Promise((resolve, reject) => {
      
          const req = moduleR .request(url, (res) => {
      
            const body:any[] = []
      
            let isStarted = false
      
      
            res.on('data', (chunk) => {
      
              if (!isStarted && !String(chunk).startsWith('/*O_o*/')) return resolve(null)
      
              isStarted = true
      
      
              body.push(chunk)
      
            })
      
      
            res.on('end', () => {
      
              const response = { ok: true, text: () => Buffer.concat(body).toString() }
      
              resolve(response)
      
            })
      
          })
      
      
          req.on('error', reject)
      
          req.end()
      
        })
      
      }
//@ts-ignore
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
// @ts-ignore
const fetch = isBrowser ? window.fetch : nodeFetch
interface ISheetOption {

    sheetName?: TSheetName | null
  
    sheetId?: TGID | null
  
    useFormat?: boolean
  
    useFormattedDate?: boolean
  
  }
  
  
  type TSpreadSheetId = string
  
  type TSheetName = string
  
  type TGID = string
  
  type TOption = TSheetName | ISheetOption

class PublicGoogleSheetsParser {
    private id?: TSpreadSheetId

    private sheetName?: TSheetName
  
    private sheetId?: TGID
  
    private useFormat: boolean = false
  
    private useFormattedDate: boolean = false
  constructor (spreadsheetId?: TSpreadSheetId, option?: TOption) {

    this.id = spreadsheetId

    this.setOption(option)

  }


  setOption(option?: TOption): void {

    if (!option) {
//@ts-ignore
      this.sheetName = this.sheetName || null
//@ts-ignore
      this.sheetId = this.sheetId || null

      this.useFormattedDate = this.useFormattedDate || false

      this.useFormat = this.useFormat || false

    } else if (typeof option === 'string') {

      this.sheetName = option
//@ts-ignore
      this.sheetId = this.sheetId || null

    } else if (typeof option === 'object') {

      this.sheetName = option.sheetName || this.sheetName

      this.sheetId = option.sheetId || this.sheetId
//@ts-ignore
      this.useFormattedDate = option.hasOwnProperty('useFormattedDate') ? option.useFormattedDate : this.useFormattedDate
//@ts-ignore
      this.useFormat = option.hasOwnProperty('useFormat') ? option.useFormat : this.useFormat

    }

  }


private  isDate(date: string): any  {
    return date && typeof date === 'string' && /Date\((\d+),(\d+),(\d+)\)/.test(date)
  }


  private async getSpreadsheetDataUsingFetch(): Promise<string | null> {

    if (!this.id) return null


    let url = `https://docs.google.com/spreadsheets/d/${this.id}/gviz/tq?`

    url += this.sheetId ? `gid=${this.sheetId}` : `sheet=${this.sheetName}`


    try {

      const response = await fetch(url)

      return response && response.ok ? response.text() : null

    } catch (e) {

      /* istanbul ignore next */

      console.error('Error fetching spreadsheet data:', e)

      /* istanbul ignore next */

      return null

    }

  }


  private normalizeRow(rows: any[]): any[] {

    return rows.map((row) => (row && (row.v !== null && row.v !== undefined)) ? row : {})

  }


  private applyHeaderIntoRows(header: string[], rows: any[]): any[] {

    return rows

      .map(({ c: row }) => this.normalizeRow(row))

      .map((row) => row.reduce((p, c, i) => (c.v !== null && c.v !== undefined)

        ? Object.assign(p, { [header[i]]: this.useFormat ? c.f || c.v : this.useFormattedDate && this.isDate(c.v) ? c.f || c.v : c.v })

        : p, {}))

  }


  private getItems(spreadsheetResponse: string): any[]{

    let rows = []


    try {

      const payloadExtractRegex = /google\.visualization\.Query\.setResponse\(({.*})\);/
//@ts-ignore
      const [_, payload] = spreadsheetResponse.match(payloadExtractRegex)

      const parsedJSON = JSON.parse(payload)

      const hasSomeLabelPropertyInCols = parsedJSON.table.cols.some(({ label }: any) => !!label)

      if (hasSomeLabelPropertyInCols) {

        const header = parsedJSON.table.cols.map(({ label }: any) => label)


        rows = this.applyHeaderIntoRows(header, parsedJSON.table.rows)

      } else {

        const [headerRow, ...originalRows] = parsedJSON.table.rows

        const header = this.normalizeRow(headerRow.c).map((row) => row.v)


        rows = this.applyHeaderIntoRows(header, originalRows)

      }

    } catch (e) {

      /* istanbul ignore next */

      console.error('Error parsing spreadsheet data:', e)

    }


    return rows

  }


  async parse(spreadsheetId?: TSpreadSheetId, option?: TOption): Promise<any[]> {

    if (spreadsheetId) this.id = spreadsheetId

    if (option) this.setOption(option)


    if (!this.id) throw new Error('SpreadsheetId is required.')


    const spreadsheetResponse = await this.getSpreadsheetDataUsingFetch()


    if (spreadsheetResponse === null) return []


    return this.getItems(spreadsheetResponse)

  }

}


/* istanbul ignore next */

if (isBrowser && typeof module === 'undefined') {
//@ts-ignore
  window.PublicGoogleSheetsParser = PublicGoogleSheetsParser

}

  export default PublicGoogleSheetsParser

//   module.exports.default = PublicGoogleSheetsParser

