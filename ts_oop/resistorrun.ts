//"c:\Program Files\nodejs\npm.cmd" install typescript ts-node
//npm i -D @types/node
//npx ts-node resistorrun.ts
class Resistor {
    r: number = 0;
    constructor(r: number) {
        this.r = r;
    }
    getCurrent(u: number): number {
        return u / this.r;
    }
    getPower(u: number): number {
        return u * this.getCurrent(u);
    }
    getHeat(u: number): number {
        return v ** 2 / this.r;
    }
    tempdiff(u: number): number {
        return watt / (waterheat * watermass);

    }
}

let v = 1000
let I = 220
let waterheat = 4186
let watermass = 1
let watt = 60000
let inittemp = 20
let r1 = new Resistor(v / I);
console.log(r1);
console.log(r1.getCurrent(220));
console.log(r1.getPower(1000));
console.log(r1.getHeat(5));
console.log(r1.tempdiff(5))
console.log(r1.tempdiff(5) + inittemp)

//lõpptemp = 34.3
// veekeedukannu takistus = 4.5
//