/**
 * @author Tappointment Kft. on 2019-08-30
 * Copyright © 2019. Trustchain Systems Kft. All rights reserved.
 */

const keyWords = {
  SELECT: 'SELECT',
  FROM: 'FROM',
  WHERE: 'WHERE',
  ASTERISK: '*'
}

class DbEngine {
  // readonly keyWords = ['SELECT', 'FROM', 'WHERE']
  constructor(data) {
    if(!data){
      throw new Error('no data is given')
    }
    this.data = data
  }
  getTablenames(){
    return Object.keys(this.data)
  }

  getTableData(tableName){
    return this.data[tableName]
  }

  getColumnNames(tableName){
    return Object.keys(this.data[tableName][0])
  }

  parse(query){
    const splittedQuery = query.split(' ')
    const result = {}
    const selectIndex = splittedQuery.indexOf(keyWords.SELECT)
    if(selectIndex > -1){
      result.select = [splittedQuery[selectIndex + 1]]
    }

    const fromIndex = splittedQuery.indexOf(keyWords.FROM)
    if(fromIndex > -1){
      result.from = splittedQuery[fromIndex + 1]
    }

    const whereIndex = splittedQuery.indexOf(keyWords.WHERE)
    if(whereIndex > -1){
      result.where = {
        column: splittedQuery[whereIndex + 1],
        operand: splittedQuery[whereIndex + 2],
        value: splittedQuery[whereIndex + 3]
      }
    }else{
      result.where = null
    }

    return result
  }

  query(query){
    const queryParams = this.parse(query)
    if(queryParams.select[0] === keyWords.ASTERISK ){
      return this.data[queryParams.from];
    }
    let result = []
    for(const school of this.data[queryParams.from]){
      let row = {}
      for(let i = 0; i < queryParams.select.length; i++){
        row[queryParams.select[i]] = school[queryParams.select[i]]
      }
      result.push(row)
    }

    return result;
  }
}

module.exports = DbEngine
