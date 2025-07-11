import ProperSkipList from './../../proper-skip-list/index.js';

export default class EdgeKeys {

  constructor () {
    this.insertionOrders = new Map();
    this.counter = 0;
    // this.keys = []
    this.keys = new ProperSkipList({
      compare: this.createComparator()
    });
  }

  createComparator() {
    return (a, b) => {
      if (!a?.edge || !b?.edge) return 0;
      if (a.matchesOtherKey(b)) return 0;

      const aLessThanB = a.isLessThanOtherEdgeKey(b);
      const bLessThanA = b.isLessThanOtherEdgeKey(a);

      if (aLessThanB && !bLessThanA) return -1;
      if (!aLessThanB && bLessThanA) return 1;

      const orderA = this.insertionOrders.get(a.toString());
      const orderB = this.insertionOrders.get(b.toString());
      return orderB - orderA;
    };
  }

  addKey (edgekey, p) {
    // const lo = this.findKeyPosition(edgekey)
    // this.keys.splice(lo, 0, edgekey)
    this.insertionOrders.set(edgekey.toString(), this.counter++);
    this.keys.upsert(edgekey, 1);
  }
}
