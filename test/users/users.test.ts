import app from '../../app/app'

import { agent as request } from 'supertest'
import { expect } from 'chai'


let firstUserIdTest = '';
let firstUserBody = {
  'name': 'Hong Gildong',
  'email': 'gd.h@fake.com',
  'password': 'do_not_hack_me'
}

it('should POST /users', async function () {
  const res = await request(app).post('/users').send(firstUserBody)
  expect(res.status).to.equal(201)
  expect(res.body).not.to.be.empty
  expect(res.body).to.be.an("object")
  expect(res.body._id).to.be.an("string")
  firstUserIdTest = res.body._id
})

it('should GET /users/:userId', async function () {
  const res = await request(app).get(`/users/${firstUserIdTest}`).send()
  expect(res.status).to.equal(200)
  expect(res.body).not.to.be.empty
  expect(res.body).to.be.an('object')
  expect(res.body._id).to.be.an('string')
  expect(res.body.name).to.be.equal(firstUserBody.name)
  expect(res.body.email).to.be.equal(firstUserBody.email)
  expect(res.body._id).to.be.equal(firstUserIdTest)
})

it(`should GET /users`, async function () {
  const res = await request(app).get(`/users`).send()
  expect(res.status).to.equal(200)
  expect(res.body).not.to.be.empty
  expect(res.body).to.be.an("array")
  expect(res.body[0]._id).to.be.an('string')
  expect(res.body[0].name).to.be.equals(firstUserBody.name)
  expect(res.body[0].email).to.be.equals(firstUserBody.email)
  expect(res.body[0]._id).to.be.equals(firstUserIdTest)
})

it('should PUT /users/:userId', async function () {
  const name = 'Kim GilDong'
  const res = await request(app).put(`/users/${firstUserIdTest}`).send({
    name: name,
    email: firstUserBody.email
  })
  expect(res.status).to.equal(204)
})

it(`should GET /users/:userId to have a new name`, async function () {
  const res = await request(app).get(`/users/${firstUserIdTest}`).send()
  expect(res.status).to.equal(200)
  expect(res.body).not.to.be.empty
  expect(res.body).to.be.an('object')
  expect(res.body._id).to.be.an('string')
  expect(res.body.name).to.be.not.equals(firstUserBody.name)
  expect(res.body.email).to.be.equals(firstUserBody.email)
  expect(res.body._id).to.be.equals(firstUserIdTest)
})

it('should PATCH /users/:userId', async function () {
  let newField = {description: 'First Korean'}
  const res = await request(app).patch(`/users/${firstUserIdTest}`).send(newField)
  expect(res.status).to.equal(204)
})

it(`should GET /users/:userId to have a new field called description`, async function () {
  const res = await request(app).get(`/users/${firstUserIdTest}`).send()
  expect(res.status).to.equal(200)
  expect(res.body).not.to.be.empty
  expect(res.body).to.be.an('object')
  expect(res.body._id).to.be.an('string')
  expect(res.body.description).to.be.equals('First Korean')
})

it('should DELETE /users/:userId', async function () {
  const res = await request(app).delete(`/users/${firstUserIdTest}`).send()
  expect(res.status).to.equal(204)
})

it(`should GET /users`, async function () {
  const res = await request(app).get(`/users`).send()
  expect(res.status).to.equal(200)
  expect(res.body).to.be.an('array')
  expect(res.body).to.be.empty  // empty same as []
})
