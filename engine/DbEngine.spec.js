let DbEngine = require('./DbEngine')

describe('test DbEngine', () => {
  let data = {}

  beforeEach(() => {
    data = {
      "students": [
        { name: "Joe", age: 8, grade: 4 },
        { name: "Jane", age: 7, grade: 5 },
        { name: "Mike", age: 12, grade: 2 }
      ],
      "schools" : [
        { name: "Kossuth Lajos", distance: 4 },
        { name: "Mora Ferenc", distance: 14 }
      ]
    }
  })


  test('should return table names of db', () => {
    let e
    let db = new DbEngine(data)

    expect(db.getTablenames()).toEqual(['students','schools']);
  });

  test('should return a tables data by table name', ()=>{
    let db = new DbEngine(data)

    expect(db.getTableData('students')).toEqual(data.students);
  })

  test('should return column names', ()=>{
    let db = new DbEngine(data)

    expect(db.getColumnNames('students')).toEqual(["name", "age", "grade"]);
  })

  test('should return an object containing processed query', ()=>{
    let db = new DbEngine(data)

    expect(db.parse("SELECT name FROM students WHERE grade > 3")).toEqual({
      select: ['name'],
      from: 'students',
      where: {
        column: 'grade',
        operand: '>',
        value: '3'
      }
    });
  })

  test('should return an object containing processed query', ()=>{
    let db = new DbEngine(data)

    expect(db.parse("SELECT name FROM schools")).toEqual({
      select: ['name'],
      from: 'schools',
      where: null
    });
  })

  test('should return query result', ()=>{
    let db = new DbEngine(data)

    expect(db.query("SELECT * FROM schools")).toEqual(data.schools);
  })

  test('should return query result', ()=>{
    let db = new DbEngine(data)

    expect(db.query("SELECT name FROM schools")).toEqual([
      { name: "Kossuth Lajos" },
      { name: "Mora Ferenc" }
    ]);
  })
});