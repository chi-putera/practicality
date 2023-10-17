const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration))

// Requirements
// - each factory can only produce next product after the previous one finished (depends on the time of production)
// - I want to ship any product whenever its ready
// - 20 seconds worth of production will be packed in 1 truck and will be proceed to shipment

class Factory {
  name = ''
  stocks = []
  product = {}
  productionTime = 0

  constructor (name, product, productionTime) {
    this.name = name
    this.product = product
    this.productionTime = productionTime
  }

  async produce (stock) {
    await delay(this.productionTime)

    this.stocks = [
      ...this.stocks,
      this.product
    ]
  }

  getStock () {
    const nextItem = this.stocks[0]
    this.stocks = this.stocks.slice(1)

    return nextItem
  }
}

const sausageFactory = new Factory('SausageFactory', { type: 'sausage', uom: 'piece' }, 10000) // 10 seconds
const breadFactory = new Factory('BreadFactory', { type: 'bread', uom: 'slice' }, 5000) // 5 seconds
const raisinsFactory = new Factory('RaisinsFactory', { type: 'raisins', uom: 'bag' }, 2000) // 3 seconds
const eggFactory = new Factory('EggFactory', { type: 'egg', uom: 'item' }, 1000) // 1 seconds

// Production for 20 seconds:
// 20 eggs
// 10 bags of raisins
// 4 slices of bread
// 2 sausages

// Start working on the solution
async function startProduction (factory) {
  await factory.produce()
  startProduction(factory)
}

async function *factoryProduction () {
  while (true) {
    // get production for every seconds
    await delay(1000)
    yield sausageFactory.getStock()
    yield breadFactory.getStock()
    yield raisinsFactory.getStock()
    yield eggFactory.getStock()
  }
}

async function itemLoading () {
  let shippingDeadline = 20000 // 20 seconds
  let truckBox = []
  let time = 0

  // start shipping engine
  for await(let item of factoryProduction()) {
    if (time === 20000) {
      console.log('start shipping', truckBox)
      truckBox = []
    }
    if (item) {
      truckBox = [...truckBox, item]
      time += 1000
    }
  }
}

// start production of 3 factories
startProduction(sausageFactory)
startProduction(breadFactory)
startProduction(raisinsFactory)
startProduction(eggFactory)

// create non blocking engine
itemLoading()

// result

const truckBox = [
  { type: 'egg', uom: 'item' }, 
  { type: 'raisins', uom: 'bag' }, 
  { type: 'egg', uom: 'item' }, 
  { type: 'egg', uom: 'item' }, 
  { type: 'raisins', uom: 'bag' }, 
  { type: 'egg', uom: 'item' }, 
  { type: 'bread', uom: 'slice' }, 
  { type: 'egg', uom: 'item' }, 
  { type: 'raisins', uom: 'bag' }, 
  { type: 'egg', uom: 'item' }, 
  { type: 'egg', uom: 'item' }, 
  { type: 'raisins', uom: 'bag' }, 
  { type: 'egg', uom: 'item' }, 
  { type: 'egg', uom: 'item' }, 
  { type: 'sausage', uom: 'piece' }, 
  { type: 'bread', uom: 'slice' }, 
  { type: 'raisins', uom: 'bag' }, 
  { type: 'egg', uom: 'item' }, 
  { type: 'egg', uom: 'item' }, 
  { type: 'raisins', uom: 'bag' }
]
