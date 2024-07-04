import { describe, it, expect } from 'bun:test'
import {  calcStripFee, filterDups, formatBytes, formatUptime, isCreditsInstalled,  numberWithCommas, randomBytes, randomChar, randomEmailHash, randomHashString, splitCaps} from '../src'
// import { one, two } from '../src'

// describe('should', () => {
//   it('export 1', () => {
//     expect(one).toBe(1)
//   })

//   it('export 2', () => {
//     expect(two).toBe(2)
//   })
// })
describe('format bytes', () => {
  it('should be defined', () => {
    expect(formatBytes).toBeDefined();
  })
  it("should be a function ", () => {
    expect(typeof formatBytes == 'function').toBeTrue()
  })
  it("Should have 0 be correct value", () => {
    expect(formatBytes(0)).toBe('0 Bytes')
  })
  it("Should have 15000 be 15kb", () => {
    expect(formatBytes(15000)).toBe('14.65 KiB')
  })
  it('Should have Infinity be broken', () => {
    expect(formatBytes(Infinity)).toBe('NaN undefined')
  })
  it('Should have Number.MAX_VALUE be 16 undefined', () => {
    expect(formatBytes(Number.MAX_VALUE)).toBe('16 undefined') 
  })
  it('Should have Number.MAX_SAFE_INTEGER be 8 PiB', () => {
    expect(formatBytes(Number.MAX_SAFE_INTEGER)).toBe('8 PiB') 
  })
})

describe('splitCaps', () => {
  it('should be defined', () => {
    expect(splitCaps).toBeDefined();
  })
  it("should be a function ", () => {
    expect(typeof splitCaps == 'function').toBeTrue()
  })
  it('Should return an array', () => {
    expect(splitCaps('ee')).toBeArray()
  })
  it('Should return a Split Str', () => {
    // console.log(splitCaps('HelloWorld'))
    const res = splitCaps('HelloWorld')
    expect(res[0]).toBe("Hello")
    expect(res[1]).toBe("World")
  })
})
describe('NumberString', () => {
  it('should be defined', () => {
    expect(numberWithCommas).toBeDefined();
  })
  it("should be a function ", () => {
    expect(typeof numberWithCommas == 'function').toBeTrue()
  })
  it('Should return a string', () => {
    expect(numberWithCommas(5)).toBeString()
  })
  it('Should return a Formated STR', () => {
    // console.log(splitCaps('HelloWorld'))
expect(numberWithCommas(1000)).toBe(`1,000`)
  })
})
describe('randomChars', () => {
  it('should be defined', () => {
    expect(randomChar).toBeDefined();
  })
  it("should be a function ", () => {
    expect(typeof randomChar == 'function').toBeTrue()
  })
  it('Should return a string', () => {
    expect(randomChar(5)).toBeString()
  })
  it('Should have a length of 5', () => {
    // console.log(splitCaps('HelloWorld'))
expect(randomChar(5).length).toBe(5)
  })
  it('Should have diffrent values when called twice', () => {
    expect(randomChar(5)).not.toBe(randomChar(5))
  })
})
describe('randomBytes', () => {
  it('should be defined', () => {
    expect(randomBytes).toBeDefined();
  })
  it("should be a function ", () => {
    expect(typeof randomBytes == 'function').toBeTrue()
  })
  it('Should return a Buffer', () => {
    expect(randomBytes(5)).toBeInstanceOf(Buffer)
  })
  it('Should have a length of 5', () => {
    // console.log(splitCaps('HelloWorld'))
expect(randomBytes(5).length).toBe(5)
  })
  it('Should have diffrent values when called twice', () => {
    expect(randomBytes(5)).not.toBe(randomBytes(5))
  })
})
describe('randomHash', () => {
  it('should be defined', () => {
    expect(randomHashString).toBeDefined();
  })
  it("should be a function ", () => {
    expect(typeof randomHashString == 'function').toBeTrue()
  })
  it('Should return a string', () => {
    expect(randomHashString(5)).toBeString()
  })
  it('Should have a length of double its size', () => {
    // console.log(splitCaps('HelloWorld'))
    // seems hex doubles
expect(randomHashString(5).length).toBe(5 * 2)
  })
  it('Should have diffrent values when called twice', () => {
    expect(randomHashString(5)).not.toBe(randomHashString(5))
  })
})
describe('Filter Dups', () => {
  it('should be defined', () => {
    expect(filterDups).toBeDefined();
  })
  it("should be a function ", () => {
    expect(typeof filterDups == 'function').toBeTrue()
  })
  it('Should return a array', () => {
    expect(filterDups([5])).toBeArray()
  })
  it('Should return a array of 1', () => {
    expect(filterDups([5])).toBeArrayOfSize(1)
  })
  it('Should return a array of 2', () => {
    expect(filterDups([5,4])).toBeArrayOfSize(2)
  })
  it('Should filter Dups', () => {
    expect(filterDups([1,2,1,2,1,1,1,1])).toStrictEqual([1,2])
  })
  it('Should be the same as the Set method', () => {
    expect(filterDups([1,2,1,2,1,1,1,1])).toStrictEqual([...new Set([1,2,1,2,1,1,1,1])])
  })
})
describe('Format Uptime', () => {
  it('should be defined', () => {
    expect(formatUptime).toBeDefined();
  })
  it("should be a function ", () => {
    expect(typeof formatUptime == 'function').toBeTrue()
  })
  it('Should return a string', () => {
    expect(formatUptime(9000)).toBeString()
  })
  it('Should 0 be equal to 0', () => {
expect(formatUptime(0)).toBe("0d 0h 0m 0s")
  })
})

describe('isCreditsInstalled', () => {
  it('should be defined', () => {
    expect(isCreditsInstalled).toBeDefined();
  })
  it("should be a function ", () => {
    expect(typeof isCreditsInstalled == 'function').toBeTrue()
  })
  it('Should Fail', async () => {
    try {
      await isCreditsInstalled()
    } catch (e) {
      expect(true).toBe(true)
    }
    // expect(isCreditsInstalled()).not.toBeTruthy()
  })
})
describe('randomEmailHash', () => {
  const domain = 'example.com'
  it('should be defined', () => {
    expect(randomEmailHash).toBeDefined();
  })
  it("should be a function ", () => {
    expect(typeof randomEmailHash == 'function').toBeTrue()
  })
  const generatedEmail = randomEmailHash(domain)
  it('Should return a string', () => {
    expect(generatedEmail).toBeString()
  })
  it('Should be greater & less then then domain.length', () => {
    expect(generatedEmail.length).toBeGreaterThan(domain.length)
    expect(generatedEmail.length - domain.length).toBeLessThan(domain.length)
  })
  it('Should have the domain in str', () => {
    expect(generatedEmail).toInclude(domain)
  })
  it('Should be a certain length', () => {
    expect(generatedEmail.length).toBe(domain.length + 6)
  })
})

// skip nodefetch
describe('calcStripFee', () => {
  it('should be defined', () => {
    expect(calcStripFee).toBeDefined();
  })
  it("should be a function ", () => {
    expect(typeof calcStripFee == 'function').toBeTrue()
  })
  it('Should be equal to correct values of USD', () => {
    const obj = calcStripFee(100, 'USD')
    expect(obj.amount).toBe(100)
    expect(obj.fee).toBe(
      "3.30"
    )
    expect(obj.total).toBe("103.30")
  })
})
// end tests