import { describe, it, expect } from 'bun:test'
import { ONE_BILLION, ONE_MILLION, THE_NUMBER_ONE, numberRegex, stringRegex, stripeFees } from '../src';
describe('String Regex', () => {
    it('should be defined', () => {
      expect(stringRegex).toBeDefined();
    })
    it('is a regex', () => {
      expect(stringRegex).toBeInstanceOf(RegExp)
    })
  })
  
  describe('Number Regex', () => {
    it('should be defined', () => {
      expect(numberRegex).toBeDefined();
    })
    it('is a regex', () => {
      expect(numberRegex).toBeInstanceOf(RegExp)
    })
  })
  describe(`Numbers`, () => {
    it('The Number One should be defined', () => {
      expect(THE_NUMBER_ONE).toBeDefined()
    })
    it('The Number One Million should be defined', () => {
      expect(ONE_MILLION).toBeDefined()
    })
    it('The Number One Billion should be defined', () => {
      expect(ONE_BILLION).toBeDefined()
    })
    it('The number one should be a number', () => {
      expect(THE_NUMBER_ONE).toBeNumber()
    })
    it('The number one million should be a number', () => {
      expect(ONE_MILLION).toBeNumber()
    })
    it('The number one billion should be a number', () => {
      expect(ONE_BILLION).toBeNumber()
    })
    it('The Number One should be 1', () => {
      expect(THE_NUMBER_ONE).toStrictEqual(1)
    })
    it('The Number One Million should be 1', () => {
      expect(ONE_MILLION).toStrictEqual(1_000_000)
    })
    it('The Number One Billion should be 1', () => {
      expect(ONE_BILLION).toStrictEqual(1_000_000_000)
    })
  })

  // stripe 
  describe('Stripe Values', () => {
    it('should be defined', () => {
        expect(stripeFees).toBeDefined()
    })
    it('should be an object', () => {
        expect(stripeFees).toBeTypeOf('object')
    })
    
    Object.entries(stripeFees).forEach(([key, value]) => {
        describe('for '+ key, () => {
            it('should be defined', () => {
                expect(value).toBeDefined()
            })
            it('should be an object', () => {
                expect(value).toBeTypeOf('object')
            })
            Object.entries(value).forEach(([keyy, vvalue]) => {
                describe('for '+ keyy, () => {
                    it('should be defined', () => {
                        expect(vvalue).toBeDefined()
                    })
                    it('should be a number', () => {
                        expect(vvalue).toBeNumber()
                    })
                })
            })
        })
    })
  })