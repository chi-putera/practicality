const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration))

const fetchSomething = async () => {
  await delay(1000)
}

async function *parallelAsyncGenerator () { 
  // When using `map`, the requestions will be done in parallel
  // it will start the next request without waiting the previous one to finish
  // You can also yield async map directly because Array has iterator mechanism: Array.prototype[@@iterator]()
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator
  yield* map(data.data, async (resource, index) => {
    const { data } = await fetchSomething(`${resourceName}/${resource.id}`)
    fetchedCount.value += 1

    return data.data
  })

  // do something after
}

async function *sequentialAsyncGenerator () { 
  // When using `for...of`, the requests will be done sequentially
  // it will wait for the previous request to finish before starting a new requests
  for (const resource of data.data) {
    const { data } = await axios.get<ThinkResponse<T>>(`${resourceName}/${resource.id}`)
    fetchedCount.value += 1

    yield data.data
  }

  // do something after
}


// Why do we need generator for this case?
// -------
// Well, we actually can use callback. Let's implement the same case with callback, as follows
async function parallelAsyncGenerator (callback) { 
  await Promise.all(map(data.data, async (resource, index) => {
    const { data } = await fetchSomething(`${resourceName}/${resource.id}`)
    fetchedCount.value += 1

    callback(resource)

    return data.data
  }))

  // do something after
}

// This way you don't need to use generator, but there are drawbacks of using callbacks
// To be continue...