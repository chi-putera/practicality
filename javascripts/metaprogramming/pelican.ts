const capitalize = (name: string) => {
  return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase()
}

interface BaseModel<T> {
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

interface Dog {
  name: string,
  race: string
}

interface DogModel extends Dog {}
class DogModel extends BaseModel<Dog> {
  bark () {}
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

const mrDog: Dog = {
  name: 'Mr Dog',
  race: 'Dalmation'
}

const littleBird = new BirdModel(mrPelican)
const littleDog = new DogModel(mrDog)

console.log('bird name: ', littleBird.name)
console.log('bird has name: ', littleBird.has_age)
console.log('dog name: ', littleDog.name)
