/**
 * Delegate/expose all attributes of the given model parameter,
 * so we don't have to assign the attributes manually
 */

interface BaseModel<T extends Object> {
  [x: `has_${string}`]: boolean
}

class BaseModel<T>{
 constructor (model: T) {
   // delegate all attributes to as getters
   Object.keys(model).forEach((attributeName) => {
     const value = model[attributeName as keyof T]

     Object.defineProperty(this, attributeName, {
       value: value,
       writable: false
     })
     
     Object.defineProperty(this, `has_${attributeName}`, {
       value: typeof value !== 'undefined' || value !== null,
       writable: false
     })
   })
 }
}

// Bird

interface Bird {
  name: string
  race: string
  wing_feather_color: string
  body_feather_color: string
  beak_color: string
  breeds_location: string
  age: number
}

interface BirdModel extends Bird {}

class BirdModel extends BaseModel<Bird> {
  flying?: Boolean

  constructor (bird: Bird) {
    super(bird)

    this.flying = false
  }

  get isOld () {
    return this.age >= 30
  }

  get isFlying () {
    return this.flying
  }

  fly () {
    this.flying = true
  }
}

const mrPelican: Bird = {
  name: 'Mr Pelican',
  race: 'Pelicanus occidentalis californicus',
  wing_feather_color: 'black',
  body_feather_color: 'white',
  beak_color: 'yellow',
  breeds_location: 'California (Channel Islands)',
  age: 1
}

const littleBird = new BirdModel(mrPelican)

console.log('bird name: ', littleBird.name) // bird name:  Mr Pelican
console.log('bird wings color: ', littleBird.wing_feather_color) // bird wings color:  black
console.log('bird has name: ', littleBird.has_age) // bird has name:  true

// Dog

interface Dog {
  name: string
  race: string
}

interface DogModel extends Dog {}
class DogModel extends BaseModel<Dog> {
  bark () {}
}

const mrDog = {
  name: 'Mr Dog',
  race: 'Dalmation',
  gender: 'male' // add unregistered attribute
}
const littleDog = new DogModel(mrDog)
console.log('dog name: ', littleDog.name) // dog name:  Mr Dog
console.log('dog has name: ', littleDog.has_name) // dog has name: true
// console.log('dog has name: ', littleDog.gender) // uncomment to fail. Property 'gender' does not exist on type 'DogModel'
