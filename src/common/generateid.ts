import * as shortid from 'shortid'

export const generateid = (prefix:string):string => `${prefix}-${shortid.generate()}`