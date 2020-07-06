// source https://swizec.com/blog/finally-a-practical-use-case-for-javascript-generators/swizec/9036
const UserRegex = new RegExp(/@(\w+)/, "g")

function* getUsernames(input: string): Generator<string[], any, undefined> {
    let match = null

    do {
        match = UserRegex.exec(input)
        if (match) {
            yield match.slice(0, 2);
        }
    } while (match)
}

const input: string = "this is a test with @swizec and @kyleshevlin, maybe @lukeed05"

for (const username of getUsernames(input)) {
  console.log(username)
}
