import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useState } from "react";
import seedrandom from "seedrandom";
import { countriesWithImage, Country } from "../domain/countries";
import { Guess, loadAllGuesses, saveGuesses } from "../domain/guess";

const countryCodePopulations: any = {
  af: 38041.754,
  al: 2880.917,
  dz: 43053.054,
  as: 55.312,
  ad: 77.142,
  ao: 31825.295,
  ai: 14.869,
  ag: 97.118,
  ar: 44780.677,
  am: 2957.731,
  aw: 106.314,
  au: 25203.198,
  at: 8955.102,
  az: 10047.718,
  bs: 389.482,
  bh: 1641.172,
  bd: 163046.161,
  bb: 287.025,
  by: 9452.411,
  be: 11539.328,
  bz: 390.353,
  bj: 11801.151,
  bm: 62.506,
  bt: 763.092,
  bo: 11513.1,
  ba: 3301.0,
  bw: 2303.697,
  br: 211049.527,
  vg: 30.03,
  bn: 433.285,
  bg: 7000.119,
  bf: 20321.378,
  bi: 11530.58,
  kh: 16486.542,
  cm: 25876.38,
  ca: 37411.047,
  cv: 549.935,
  ky: 64.948,
  cf: 4745.185,
  td: 15946.876,
  cl: 18952.038,
  cn: 1433783.686,
  co: 50339.443,
  km: 850.886,
  ck: 17.548,
  cr: 5047.561,
  hr: 4130.304,
  cu: 11333.483,
  cw: 163.424,
  cy: 1198.575,
  cz: 10689.209,
  dk: 5771.876,
  dj: 973.56,
  dm: 71.808,
  do: 10738.958,
  cd: 86790.567,
  ec: 17373.662,
  eg: 100388.073,
  sv: 6453.553,
  gq: 1355.986,
  er: 3497.117,
  ee: 1325.648,
  et: 112078.73,
  fk: 3.377,
  fo: 48.678,
  fj: 889.953,
  fi: 5532.156,
  fr: 65129.728,
  gf: 290.832,
  pf: 279.287,
  ga: 2172.579,
  gm: 2347.706,
  ge: 3996.765,
  de: 83517.045,
  gh: 30417.856,
  gi: 33.701,
  gr: 10473.455,
  gl: 56.672,
  gd: 112.003,
  gp: 400.056,
  gu: 167.294,
  gt: 17581.472,
  gn: 12771.246,
  gw: 1920.922,
  gy: 782.766,
  ht: 11263.077,
  hn: 9746.117,
  hk: 7436.154,
  hu: 9684.679,
  is: 339.031,
  in: 1366417.754,
  id: 270625.568,
  ir: 82913.906,
  iq: 39309.783,
  ie: 4882.495,
  im: 84.584,
  il: 8519.377,
  it: 60550.075,
  ci: 25716.544,
  jm: 2948.279,
  jp: 126860.301,
  jo: 10101.694,
  kz: 18551.427,
  ke: 52573.973,
  ki: 117.606,
  kw: 4207.083,
  kg: 6415.85,
  la: 7169.455,
  lv: 1906.743,
  lb: 6855.713,
  ls: 2125.268,
  lr: 4937.374,
  ly: 6777.452,
  li: 38.019,
  lt: 2759.627,
  lu: 615.729,
  mo: 640.445,
  mk: 2083.459,
  mg: 26969.307,
  mw: 18628.747,
  my: 31949.777,
  mv: 530.953,
  ml: 19658.031,
  mt: 440.372,
  mq: 375.554,
  mr: 4525.696,
  mu: 1269.668,
  yt: 266.15,
  mx: 127575.529,
  md: 4043.263,
  mc: 38.964,
  mn: 3225.167,
  me: 627.987,
  ms: 4.989,
  ma: 36471.769,
  mz: 30366.036,
  mm: 54045.42,
  na: 2494.53,
  nr: 10.756,
  np: 28608.71,
  nl: 17097.13,
  nc: 282.75,
  nz: 4783.063,
  ni: 6545.502,
  ne: 23310.715,
  ng: 200963.599,
  nu: 1.615,
  kp: 25666.161,
  no: 5378.857,
  om: 4974.986,
  pk: 216565.318,
  pw: 18.008,
  pa: 4246.439,
  pg: 8776.109,
  py: 7044.636,
  pe: 32510.453,
  ph: 108116.615,
  pl: 37887.768,
  pt: 10226.187,
  pr: 2933.408,
  qa: 2832.067,
  cg: 5380.508,
  re: 888.927,
  ro: 19364.557,
  ru: 145872.256,
  rw: 12626.95,
  bl: 9.847,
  kn: 52.823,
  lc: 182.79,
  mf: 38.002,
  pm: 5.822,
  vc: 110.589,
  ws: 197.097,
  sm: 33.86,
  st: 215.056,
  sa: 34268.528,
  sn: 16296.364,
  rs: 8772.235,
  sc: 97.739,
  sl: 7813.215,
  sg: 5804.337,
  sx: 42.388,
  sk: 5457.013,
  si: 2078.654,
  sb: 669.823,
  so: 15442.905,
  za: 58558.27,
  kr: 51225.308,
  ss: 11062.113,
  es: 46736.776,
  lk: 21323.733,
  sd: 42813.238,
  sr: 581.372,
  sz: 1148.13,
  se: 10036.379,
  ch: 8591.365,
  sy: 17070.135,
  tw: 23773.876,
  tj: 9321.018,
  tz: 58005.463,
  th: 69625.582,
  tl: 1293.119,
  tg: 8082.366,
  tk: 1.34,
  to: 104.494,
  tt: 1394.973,
  tn: 11694.719,
  tr: 83429.615,
  tm: 5942.089,
  tc: 38.191,
  ug: 44269.594,
  ua: 43993.638,
  ae: 9770.529,
  gb: 67530.172,
  us: 329064.917,
  vi: 104.578,
  uy: 3461.734,
  uz: 32981.716,
  vu: 299.882,
  va: 0.799,
  ve: 28515.829,
  vn: 96462.106,
  wf: 11.432,
  eh: 582.463,
  ye: 29161.922,
  zm: 17861.03,
  zw: 14645.468,
};

const forcedCountries: Record<string, string> = {
  "2022-02-02": "TD",
  "2022-02-03": "PY",
};

export function getDayString(shiftDayCount?: number) {
  return DateTime.now()
    .plus({ days: shiftDayCount ?? 0 })
    .toFormat("yyyy-MM-dd");
}

export function useTodays(dayString: string): [
  {
    country?: Country;
    guesses: Guess[];
  },
  (guess: Guess) => void,
  number,
  number
] {
  const [todays, setTodays] = useState<{
    country?: Country;
    guesses: Guess[];
  }>({ guesses: [] });

  const addGuess = useCallback(
    (newGuess: Guess) => {
      if (todays == null) {
        return;
      }

      const newGuesses = [...todays.guesses, newGuess];

      setTodays((prev) => ({ country: prev.country, guesses: newGuesses }));
      saveGuesses(dayString, newGuesses);
    },
    [dayString, todays]
  );

  useEffect(() => {
    // const guesses = loadAllGuesses()[dayString] ?? [];
    const guesses: Guess[] = [];
    const country = getCountry(dayString);

    setTodays({ country, guesses });
  }, [dayString]);

  const randomAngle = useMemo(
    () => seedrandom.alea(dayString)() * 360,
    [dayString]
  );

  const imageScale = useMemo(() => {
    const normalizedAngle = 45 - (randomAngle % 90);
    const radianAngle = (normalizedAngle * Math.PI) / 180;
    return 1 / (Math.cos(radianAngle) * Math.sqrt(2));
  }, [randomAngle]);

  return [todays, addGuess, randomAngle, imageScale];
}

function getCountry(dayString: string) {
  const forcedCountryCode = forcedCountries[dayString];
  const forcedCountry =
    forcedCountryCode != null
      ? countriesWithImage.find((country) => country.code === forcedCountryCode)
      : undefined;

  let diffIndex = 0;
  if (window.localStorage.getItem("difficulty") != null) {
    diffIndex = JSON.parse(window.localStorage.getItem("difficulty")!).index;
  }
  const popMin = [
    58005.463, // Top 25 countries
    28515.829, // Top 50 countries
    1906.743, // Top 150 countries
    0, // No minimum
  ][diffIndex];
  const popMax = [
    Infinity, // No maximum
    Infinity, // No maximum
    28515.829, // Below top 50
    1906.743, // Below top 150
  ][diffIndex];
  const validCountries = [];
  for (const country of countriesWithImage) {
    const pop: number = countryCodePopulations[country.code.toLowerCase()];
    if (pop >= popMin && pop <= popMax) {
      validCountries.push(country);
    }
  }
  const country =
    validCountries[Math.floor(Math.random() * validCountries.length)];
  console.log(validCountries.length);
  console.log(country.name);

  return country;
}
