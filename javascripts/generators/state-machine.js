function awakeReducer (state, action) {
  const { type, payload } = action

  switch (type) {
    // ACTIVITIES
    case 'run':
      return {
        ...state,
        hunger: state.hunger - 30,
        energy: state.energy - 10,
        hygiene: state.hygiene - 30
      }
    // NEEDS
    case 'eat':
      return {
        ...state,
        bladder: state.bladder - 10,
        hunger: 100
      }
    case 'pee':
      return {
        ...state,
        bladder: 100
      }
    case 'shower':
      return {
        ...state,
        energy: state.energy - 2,
        hygiene: 100
      }
    case 'sleep':
      return {
        ...state,
        status: 'sleep',
        hunger: state.hunger - 20
      }
    default:
      return state
  }
}

function sleepReducer (state, action) {
  const { type, payload } = action

  switch (type) {
    case 'wake_up':
      return {
        ...state,
        status: 'awake',
        energy: 100
      }
    default:
      return state
  }
}

function brainReducer (state, action) {
  switch (state.status) {
    case 'awake':
      return awakeReducer(state, action)
    case 'sleep':
      return sleepReducer(state, action)
    default:
      return state
  }
}

class Person {
  state = {
    status: 'awake',
    energy: 100,
    bladder: 100,
    hygiene: 100,
    hunger: 100
  }
  humanEngine = null

  constructor (initialState = {}) {
    this.state = {
      ...this.state,
      initialState
    }

    this.humanEngine = this.createHumanEngine()
    // start living (run generator until the first yield. Run the infinite loop!)
    this.humanEngine.next()
  }

  createHumanEngine = function *() {
    while (true) {
      this.state = brainReducer(this.state, yield)
    }
  }

  do (action) {
    this.humanEngine.next(action)
  }
}

const chi = new Person()

chi.do({ type: 'run' })
chi.do({ type: 'sleep' })
chi.do({ type: 'eat' }) // while sleeping, you won't be able to eat. Maybe it's just a dream.
chi.do({ type: 'wake_up' })

console.log('state', chi.state)
