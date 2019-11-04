const faker = require('faker')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient

/*
 * --- Script documentation:
 * To add fixtures to database, run `npm run-script test-generate-fixtures`.
 * Generated fixtures are stored in `./src/tests/fixtures/<item>.json` and added in database.
 *
 * --- Improvements:
 *  - Sprint's startDate, endDate and sprintId's properties can be not consistent.
 */

var dbUri = 'mongodb://localhost:27017'
var dbName = 'cdp'

const FIXTURES_DIR = './src/tests/fixtures/'

const AMOUNT_PROJECTS = 10
const AMOUNT_SPRINTS = AMOUNT_PROJECTS * 3
const AMOUNT_ISSUES = AMOUNT_PROJECTS * 10

// --- Generate Fixtures

function selectRandomInArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function generateRandomIntegerLT(x) {
  return Math.floor(Math.random() * x)
}

const projectIds = []
const sprintIds = []

function createProjectFixtures(amount = AMOUNT_PROJECTS) {
  const projects = []
  const MAX_DURATION = 1825
  for (let i = 1; i <= amount; i++) {
    let prId = faker.random.uuid()
    projectIds.push(prId)
    projects.push({
      id: prId,
      createdAt: faker.date.between(2010, 2019),
      title: faker.lorem.words(),
      description: faker.lorem.sentences(),
      repositoryURL: faker.internet.url() + '/' + faker.lorem.word() + '.git',
      duration: generateRandomIntegerLT(MAX_DURATION)
    })
  }
  return projects
}

function createSprintFixtures(amount = AMOUNT_SPRINTS) {
  const sprints = []
  const MAX_SPRINT_NUMBER = 10
  for (let i = 1; i <= amount; i++) {
    sprints.push({
      projectId: selectRandomInArray(projectIds),
      sprintId: generateRandomIntegerLT(MAX_SPRINT_NUMBER),
      title: faker.lorem.words(),
      startDate: faker.date.past(),
      endDate: faker.date.recent()
    })
  }
  return sprints
}

function createIssueFixtures(amount = AMOUNT_ISSUES) {
  const issues = []
  const STATES = ['TODO', 'DOING', 'DONE']
  const PRIORITIES = ['LOW', 'HIGH', 'MEDIUM']
  const MAX_DIFFICULTY = 42
  for (let i = 1; i <= amount; i++) {
    issues.push({
      projectId: selectRandomInArray(projectIds),
      sprintId: selectRandomInArray(sprintIds),
      description: faker.lorem.sentences(),
      state: selectRandomInArray(STATES),
      difficulty: generateRandomIntegerLT(MAX_DIFFICULTY),
      priority: selectRandomInArray(PRIORITIES)
    })
  }
  return issues
}

// --- Add fixtures in database

function exportFixture(filename, fixtures) {
  fs.writeFileSync(filename, JSON.stringify(fixtures, null, '\t'))
}

// Note that array order is significant
const FIXTURES_GENERATOR = [
  ['projects', createProjectFixtures],
  ['sprints', createSprintFixtures],
  ['issues', createIssueFixtures]
]

MongoClient.connect(
  dbUri,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err
    const db = client.db(dbName)
    FIXTURES_GENERATOR.forEach(function(generator) {
      let [collection, callback] = generator
      let fixtures = callback()
      exportFixture(FIXTURES_DIR + collection + '.json', fixtures)
      db.collection(collection).insertMany(fixtures, function(err, res) {
        if (err) throw err
        console.log(
          res.insertedCount + ' documents inserted in collection ' + collection
        )
      })
    })
  }
)
