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
    getResistance(): number {
        return this.r;
    }
}

class SeriesCircuit {
    resistors: Resistor[] = []
    push(r: Resistor) {
        this.resistors.push(r);
    }
    getTotalResistance() {
        let sum: number = 0;
        this.resistors.forEach((r: Resistor) => { sum += r.getResistance() });
        return sum;
    }
    getTotalCurrent(u: number) {
        return u / this.getTotalResistance();
    }

    getTotalvoltage(u: number) {
        return (this.getTotalCurrent(u) * 100);
    }
    getTotalPower(u: number) {
        return this.getTotalvoltage(u) * this.getTotalCurrent(u)
    }
}

let sc1: SeriesCircuit = new SeriesCircuit();
sc1.push(new Resistor(220));
sc1.push(new Resistor(220));
sc1.push(new Resistor(110));
console.log(sc1.getTotalResistance());
console.log(sc1.getTotalCurrent(12));
// get voltage u = getCurrent u 
console.log(sc1.getTotalvoltage(12))
console.log(sc1.getTotalPower(12))