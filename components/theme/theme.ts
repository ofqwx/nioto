const ratio = 1.5;
const sizesFromRatioConstructor = {
  sm5: function () {
    return this.sm4() / ratio;
  },
  sm4: function () {
    return this.sm3() / ratio;
  },
  sm3: function () {
    return this.sm2() / ratio;
  },
  sm2: function () {
    return this.sm1() / ratio;
  },
  sm1: function () {
    return this.s0 / ratio;
  },
  s0: 1,
  s1: function () {
    return this.s0 * ratio;
  },
  s2: function () {
    return this.s1() * ratio;
  },
  s3: function () {
    return this.s2() * ratio;
  },
  s4: function () {
    return this.s3() * ratio;
  },
  s5: function () {
    return this.s4() * ratio;
  },
};

export const light = {
  sizes: {
    s0: `${sizesFromRatioConstructor.sm5()}rem`,
    s1: `${sizesFromRatioConstructor.sm4()}rem`,
    s2: `${sizesFromRatioConstructor.sm3()}rem`,
    s3: `${sizesFromRatioConstructor.sm2()}rem`,
    s4: `${sizesFromRatioConstructor.sm1()}rem`,
    s5: `${sizesFromRatioConstructor.s0}rem`,
    s6: `${sizesFromRatioConstructor.s1()}rem`,
    s7: `${sizesFromRatioConstructor.s2()}rem`,
    s8: `${sizesFromRatioConstructor.s3()}rem`,
    s9: `${sizesFromRatioConstructor.s4()}rem`,
    s10: `${sizesFromRatioConstructor.s5()}rem`,
  },
  colors: {
    fg: "#000",
    bg: "#fff",
  },
};

export const dark = {
  ...light,
  colors: {
    fg: "#fff",
    bg: "#000",
  },
};
