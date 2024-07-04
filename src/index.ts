import crypto from "crypto"
import path from "path"
import fs from "fs"
export const convertToPercent = (n: number) => {
return n * 100
}
/**
 * 
 * @param bytes {number}
 * @param decimals {number}
 * @returns 
 * @see https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 */
export function formatBytes(bytes:number, decimals:number = 2): string {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
export const stringRegex = /([A-Z]+)/g
export const numberRegex = /\B(?=(\d{3})+(?!\d))/g
export function splitCaps(str: string): string[] { 
    let result = str.replace(/([A-Z]+)/g, ",$1").replace(/^,/, "");
    return result.split(","); 
}
export function numberWithCommas(x: number) {
    return x.toString().replace(numberRegex, ",");
}
export function randomChar(length: number = 10): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
export const randomBytes = ( length: number = 10 ) => crypto.randomBytes(length)
export const randomHashString = (length: number = 11, format: BufferEncoding = "hex"):string => randomBytes(length).toString(format) 
export function filterDups(obj: any[]) {
return obj.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t == value
    ))
  )
}
export function formatUptime (uptime: number = process.uptime()) {
    const seconds = Math.floor(uptime % 60)
    const minutes = Math.floor((uptime / 60) % 60)
    const hours = Math.floor((uptime / (60 * 60)) % 24)
    const days = Math.floor(uptime / (60 * 60 * 24))
  
    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }

export const isPropValuesEqual = (subject: any, target: any, propNames: any[]) =>
    propNames.every(propName => subject[propName] === target[propName]);

// peak coding right here
export const THE_NUMBER_ONE = 1;
export const ONE_MILLION = 1_000_000
export const ONE_BILLION = 1_000_000_000

export function isCreditsInstalled(): Promise<void> {
    // fun fact: this package has 0 deps
    return new Promise((res,rej) => {
        try {
            require('@neongamerbot/credits')
            res()
        } catch (e) {
            rej()
        }
    })
}
// export * from 
// export * from "fs"
export function randomEmailHash(domain: string, suffix: string = "") {
    return `${suffix ? suffix+'+' : ""}`+randomChar(5)+`@${domain}`    
}
/**
 * 
 * @param url {string}
 * @returns {}
 */
export const nodeFetch = async (url:string ) => {
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
  export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
/**
 * Calculate stripe fee from amount
 * so you can charge stripe fee to customers
 * lafif <hello@lafif.me>
 */
export const stripeFees = { 
	USD: { Percent: 2.9, Fixed: 0.30 } as StripeFee,
	GBP: { Percent: 2.4, Fixed: 0.20 } as StripeFee,
	EUR: { Percent: 2.4, Fixed: 0.24 }  as StripeFee,
	CAD: { Percent: 2.9, Fixed: 0.30 } as StripeFee,
	AUD: { Percent: 2.9, Fixed: 0.30 } as StripeFee,
	NOK: { Percent: 2.9, Fixed: 2 } as StripeFee,
	DKK: { Percent: 2.9, Fixed: 1.8 } as StripeFee,
	SEK: { Percent: 2.9, Fixed: 1.8 } as StripeFee,
	JPY: { Percent: 3.6, Fixed: 0 } as StripeFee,
	MXN: { Percent: 3.6, Fixed: 3 } as StripeFee
};
export type StripeFee  = {
Percent: number;
Fixed: number
}
export function calcStripFee(amount:number, currency:string) {
    //@ts-ignore
	const _fee = stripeFees[currency] as StripeFee;
	// amount = parseFloat(amount);
	let total = (amount + _fee.Fixed) / (1 - _fee.Percent / 100);
	var fee = total - amount;

	return {
		amount: amount,
		fee: fee.toFixed(2),
		total: total.toFixed(2)
	};
}
export async function* walk(dir: string):any {
    //@ts-ignore it DOES exist infact
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* walk(entry);
        else if (d.isFile()) yield entry;
    }
}
export function volume_area_sphere(r: number) {
    let volume = (4/3) * Math.PI * Math.pow(r, 3);
    let area = 4 * Math.PI * Math.pow(r, 2);
    return [volume, area];
}

// var charge_data = calcFee(100, 'USD');
// alert('You should ask: ' + charge_data.total + ' to customer, to cover ' + charge_data.fee + ' fee from ' + charge_data.amount );
// console.log(charge_data);

  //exports
  export * as EmojiHash from "./pkgs/emoji-hash";
  export * as FormatMoney from "./pkgs/format-money"
  export * as PublicGoogleSheets  from './pkgs/public-google-sheet'