const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration))

async function firstSource () {
  await delay(500)
  return 'burger'
}

async function secondSource () {
  await delay(500)
  return 'sausage'
}

async function thirdSource () {
  await delay(500)
  return 'drink'
}

// The Problem:
// we want to long polling fetch "something" from 3 sources of api that returns the same object, like "food"
// 


// With Classic Callback
async function startClassicStreaming (duration = 1000, callback) {
  await delay(duration)
  console.log(`fetching again after ${duration / 1000 } seconds`)

  callback(await firstSource())
  callback(await secondSource())
  callback(await thirdSource())
  startClassicStreaming(duration, callback)
}

startClassicStreaming(5000, (data) => {
  console.log('by callback: ', data)
})


// With Generators
async function *getTheSources (duration) {
  while (true) {
    await delay(duration)
    console.log(`fetching again after ${duration / 1000 } seconds`)

    yield firstSource()
    yield secondSource()
    yield thirdSource()
  }
}

async function startStreaming (duration = 1000) {
  for await(let x of getTheSources(duration)) {
    console.log('by generator: ', x)
  }
}

// startStreaming(5000)