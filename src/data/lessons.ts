export type SubjectKey =
  | 'Quantitative Techniques'
  | 'Logical Reasoning'
  | 'Language Comprehension'
  | 'General Awareness'
  | 'Innovation & Entrepreneurship';

export type TopicStatus = 'not_started' | 'viewed' | 'quiz_attempted' | 'quiz_passed' | 'mastered';
export type Tab = 'dashboard' | 'learn' | 'plan' | 'practice';

export interface Topic {
  id: string;
  dayNumber: number;
  subject: SubjectKey;
  title: string;
  summary: string;
  keyConcepts: string[];
  estimatedMinutes: number;
  lessons: { heading: string; body: string }[];
  example: { question: string; steps: string[]; answer: string };
}

export interface QuizQ {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subtitle: string;
  subject: SubjectKey;
  topicId: string;
  examFormat: string;
  timeLimitMinutes: number;
  passingPercent: number;
  questions: QuizQ[];
}

export interface Progress {
  topicId: string;
  subject: SubjectKey;
  status: TopicStatus;
  bestScore: number;
  totalQuestions: number;
  attemptsCount: number;
}

export interface Attempt {
  id: string;
  quizId: string;
  title: string;
  subject: SubjectKey;
  score: number;
  total: number;
  accuracyPercent: number;
  passed: boolean;
  createdAt: string;
}

const STARTER_TOPICS: Topic[] = [
  {
    id: 'qt-1', dayNumber: 1, subject: 'Quantitative Techniques', title: 'Percentages & Profit-Loss',
    summary: 'Build percentage arithmetic from fractions through successive changes, reverse percentages and profit-loss applications.',
    keyConcepts: ['Percent as a fraction', 'Percentage change', 'Successive change', 'Profit, loss and discount'], estimatedMinutes: 55,
    lessons: [
      { heading: 'Level 0 · Percent means “out of 100”', body: 'A percent is a fraction with denominator 100: 25% = 25/100 = 1/4. To find p% of N, calculate pN/100. Convert a percent to a decimal by dividing by 100, or to a fraction and simplify. For example, 15% of 240 = 0.15×240 = 36. Always identify the base quantity: 20% of 50 is not the same amount as 20% of 80.' },
      { heading: 'Level 1 · Change and reverse percentages', body: 'Percentage change = (new−old)/old×100; the old value is the base. A rise of r% multiplies by 1+r/100; a fall multiplies by 1−r/100. To reverse a change, divide by that factor: after a 20% rise, the original is new/1.2. An increase from 80 to 100 is 25%, while a decrease from 100 to 80 is 20%; the base changes.' },
      { heading: 'Level 2 · Successive changes and exam applications', body: 'Multiply factors for successive changes. A 10% rise then a 10% fall gives 1.10×0.90=0.99, a 1% net fall. Profit/loss percentages use cost price (CP); discount uses marked price (MP). If a consignment is partly lost, calculate total revenue on the surviving quantity and compare it with the original total cost. A 25% rise in price does not cancel a 25% loss of stock.' },
      { heading: 'Level 3 · Avoid base and margin traps', body: 'If an item costs ₹800 and sells for ₹1,000, profit is ₹200/₹800=25%, not 20%. If a marked price is discounted by 10%, selling price is 90% of MP. Keep the price chain explicit (CP→MP→discount→SP), write each percentage’s base, and verify the final rupee amount. In a question about “how much greater,” divide the difference by the comparison quantity named in the question.' },
    ],
    example: {
      question: 'An article is sold at ₹120 after 20% profit. Find CP.',
      steps: ['Profit percentage is calculated on cost price, so SP = CP×(1+20/100).', 'Substitute the known selling price: 120 = CP×1.2.', 'Divide both sides by 1.2 and check: 100×1.2 = 120.'],
      answer: '₹100',
    },
  },
  {
    id: 'lr-1', dayNumber: 1, subject: 'Logical Reasoning', title: 'Blood Relations & Directions',
    summary: 'Puzzle basics — family trees, facing, left-right turns.',
    keyConcepts: ['family tree', 'facing', 'turns'], estimatedMinutes: 35,
    lessons: [
      { heading: 'Blood relations approach', body: 'Draw a family tree. Generations go top to bottom. Use + male, − female, = marriage.' },
      { heading: 'Classic pattern', body: 'Only daughter of my mother usually means the speaker herself (if female). Read carefully.' },
      { heading: 'Directions', body: 'Face North: left = West, right = East. Sketch arrows for multi-turn problems.' },
    ],
    example: {
      question: 'A is B’s brother. C is A’s mother. How is C related to B?',
      steps: ['A and B are siblings', 'C is mother of A', 'Therefore C is also mother of B'],
      answer: 'Mother',
    },
  },
  {
    id: 'lc-1', dayNumber: 2, subject: 'Language Comprehension', title: 'Reading Comprehension Basics',
    summary: 'How to approach RC passages — main idea, tone, inference.',
    keyConcepts: ['main idea', 'tone', 'inference'], estimatedMinutes: 40,
    lessons: [
      { heading: 'First pass', body: 'Read first and last paragraph carefully. Note the author’s main claim.' },
      { heading: 'Main idea vs detail', body: 'Main idea asks what the passage is primarily about. Avoid options that are true but too narrow.' },
      { heading: 'Inference', body: 'Must be strongly supported by the text — not outside knowledge.' },
      { heading: 'Tone', body: 'Match the author’s attitude: critical, optimistic, neutral, sceptical, analytical.' },
    ],
    example: {
      question: 'A passage argues urban parks improve mental health with survey data. Best main idea?',
      steps: ['Focus on the author’s claim', 'Eliminate options about only one city', 'Choose parks + mental health + evidence'],
      answer: 'Urban parks are linked to better mental health, as suggested by survey evidence.',
    },
  },
  {
    id: 'gk-1', dayNumber: 2, subject: 'General Awareness', title: 'Indian Economy Snapshot',
    summary: 'High-yield economy GK — GDP, RBI, budget basics.',
    keyConcepts: ['GDP', 'RBI', 'budget'], estimatedMinutes: 30,
    lessons: [
      { heading: 'GDP', body: 'Market value of all final goods and services produced within a country in a period.' },
      { heading: 'RBI', body: 'Central bank: monetary policy (repo, CRR, SLR), issues currency, regulates banks.' },
      { heading: 'Budget basics', body: 'Fiscal deficit = total expenditure − total receipts excluding borrowings.' },
    ],
    example: {
      question: 'Who sets the repo rate in India?',
      steps: ['Repo rate is a monetary policy tool', 'Conducted by the central bank', 'RBI via the MPC'],
      answer: 'Reserve Bank of India (Monetary Policy Committee)',
    },
  },
  {
    id: 'ie-1', dayNumber: 3, subject: 'Innovation & Entrepreneurship', title: 'Startup Ecosystem India',
    summary: 'Schemes and terminology — DPIIT, unicorn, bootstrapping.',
    keyConcepts: ['DPIIT', 'unicorn', 'bootstrapping'], estimatedMinutes: 30,
    lessons: [
      { heading: 'Startup definition (India)', body: 'DPIIT recognition matters for tax and scheme benefits.' },
      { heading: 'Unicorn', body: 'Privately held startup valued at USD 1 billion or more.' },
      { heading: 'Bootstrapping', body: 'Building with personal funds or revenue, without external VC.' },
    ],
    example: {
      question: 'What is a unicorn startup?',
      steps: ['Valuation threshold', 'USD 1 billion private valuation'],
      answer: 'A privately held startup valued at $1 billion or more',
    },
  },
  {
    id: 'qt-2', dayNumber: 3, subject: 'Quantitative Techniques', title: 'Averages & Mixtures',
    summary: 'Weighted averages and alligation method.',
    keyConcepts: ['weighted avg', 'alligation'], estimatedMinutes: 40,
    lessons: [
      { heading: 'Simple average', body: 'Average = Sum / Count. Average of 5 numbers is 20 → sum = 100.' },
      { heading: 'Weighted average', body: '(n1×a1 + n2×a2) / (n1+n2). Weight by count or quantity.' },
      { heading: 'Alligation', body: 'Ratio of quantities = inverse ratio of differences from mean concentration.' },
    ],
    example: {
      question: 'Average of 5 numbers is 20. One number 30 removed. New average?',
      steps: ['Sum of 5 = 100', 'Remove 30 → 70', '70/4 = 17.5'],
      answer: '17.5',
    },
  },
  {
    id: 'lr-2', dayNumber: 4, subject: 'Logical Reasoning', title: 'Syllogisms & Venn',
    summary: 'Standard syllogism patterns with Venn diagrams.',
    keyConcepts: ['all/some/none', 'Venn'], estimatedMinutes: 35,
    lessons: [
      { heading: 'Statements', body: 'All / Some / No / Some not. Draw circles; do not assume some means not all.' },
      { heading: 'Conclusions', body: 'Follows only if true in every possible diagram.' },
      { heading: 'Exam tip', body: 'For possibility questions, one valid diagram is enough.' },
    ],
    example: {
      question: 'All cats are animals. Some animals are wild. Some cats are wild?',
      steps: ['Cats inside Animals', 'Wild may not overlap Cats', 'Does not necessarily follow'],
      answer: 'No — does not necessarily follow',
    },
  },
  {
    id: 'lc-2', dayNumber: 4, subject: 'Language Comprehension', title: 'Vocabulary in Context',
    summary: 'Synonyms, antonyms, and usage from context clues.',
    keyConcepts: ['context clues', 'roots'], estimatedMinutes: 30,
    lessons: [
      { heading: 'Context first', body: 'Read the full sentence; tone and nearby words constrain meaning.' },
      { heading: 'Roots & affixes', body: 'bene- (good), mal- (bad), -able (can be).' },
      { heading: 'Elimination', body: 'Remove options that change intensity or polarity.' },
    ],
    example: {
      question: 'The CEO’s speech was laconic but effective. Meaning of laconic?',
      steps: ['But effective → brevity is fine', 'Laconic = using few words'],
      answer: 'Brief / concise in speech',
    },
  },
];

type DeepTopicSeed = Omit<Topic, 'lessons'> & {
  foundation: string;
  method: string;
  examUse: string;
  trap: string;
};

/** A full learn path: build the idea, learn a repeatable method, apply it, then avoid a common trap. */
function deepTopic(seed: DeepTopicSeed): Topic {
  const { foundation, method, examUse, trap, ...topic } = seed;
  return {
    ...topic,
    lessons: [
      { heading: 'Level 0 · Build the idea', body: foundation },
      { heading: 'Level 1 · Learn the method', body: method },
      { heading: 'Level 2 · Apply it under exam conditions', body: examUse },
      { heading: 'Level 3 · Check the common trap', body: trap },
    ],
  };
}

const DEEP_TOPICS: Topic[] = [
  // Quantitative Techniques and Data Interpretation: arithmetic, algebra, geometry, counting and DI.
  deepTopic({ id: 'qt-number-system', dayNumber: 5, subject: 'Quantitative Techniques', title: 'Number System, HCF-LCM & Remainders', summary: 'Build integer, divisibility, factors, HCF/LCM, units digit and remainder reasoning from first principles.', keyConcepts: ['Factors and multiples', 'Divisibility', 'HCF and LCM', 'Remainders and cyclicity'], estimatedMinutes: 55,
    foundation: 'Natural numbers count; integers add zero and negatives; rational numbers are fractions a/b with b ≠ 0. A factor divides exactly, while a multiple is the product of a number and an integer. Prime factorisation writes a positive integer as a product of primes and is the reliable starting point for HCF and LCM.',
    method: 'For HCF, use the common prime factors with the smaller exponents. For LCM, use every prime with the larger exponents. For a remainder question, write N = dq + r, where 0 ≤ r < d. Reduce powers modulo d; if the remainders repeat, record the cycle and reduce the exponent by the cycle length.',
    examUse: 'Example: find the remainder when 7^103 is divided by 5. Since 7 ≡ 2 (mod 5), powers of 2 have cycle 2, 4, 3, 1 of length 4. Now 103 = 4×25 + 3, so use the third term of the cycle: remainder 3. Check that the answer is smaller than the divisor.',
    trap: 'Do not confuse HCF with LCM, or use the larger exponent for HCF. A remainder is never equal to or larger than the divisor. In cyclicity questions reduce the exponent using the cycle length; do not simply take the exponent’s last digit.' , example: { question: 'Find the least number divisible by 12, 18 and 30.', steps: ['12 = 2²×3; 18 = 2×3²; 30 = 2×3×5.', 'For LCM take each prime at its highest exponent: 2²×3²×5.', '4×9×5 = 180, and 180 is divisible by all three numbers.'], answer: '180' } }),
  deepTopic({ id: 'qt-surds-indices', dayNumber: 5, subject: 'Quantitative Techniques', title: 'Indices, Surds & Comparing Radicals', summary: 'Simplify powers and roots, rationalise denominators and compare close surd expressions without guessing.', keyConcepts: ['Index laws', 'Square-root simplification', 'Conjugates', 'Comparing surds'], estimatedMinutes: 45,
    foundation: 'An index is repeated multiplication: a^m a^n=a^(m+n), and (a^m)^n=a^(mn). A surd is an irrational root such as √2. Simplify √(ab) as √a√b for nonnegative a,b, and take perfect-square factors outside the radical: √72=6√2.',
    method: 'For comparing √a and √b with nonnegative values, compare a and b. For differences such as √(n+1)−√n, multiply by the conjugate: the expression equals 1/(√(n+1)+√n). This reveals that the difference decreases as n grows. Rationalise 1/(√a+√b) by multiplying numerator and denominator by √a−√b.',
    examUse: 'Compare √401−√399 with √301−√299. Rationalise each as 2/(√401+√399) and 2/(√301+√299). The first denominator is larger, so its difference is smaller. This compares values exactly without decimal approximation.',
    trap: 'Do not distribute a square root over addition: √(a+b)≠√a+√b. Squaring both sides is safe only after noting both sides are nonnegative. Keep the conjugate identity (√a−√b)(√a+√b)=a−b visible to avoid sign errors.', example: { question: 'Simplify √75 and rationalise 1/√3.', steps: ['√75 = √(25×3) = 5√3.', 'Multiply 1/√3 by √3/√3.', 'The denominator becomes 3.'], answer: '5√3; √3/3' } }),
  deepTopic({ id: 'qt-ratio-variation', dayNumber: 5, subject: 'Quantitative Techniques', title: 'Ratio, Proportion & Variation', summary: 'Compare quantities, chain ratios, scale shares and solve direct or inverse variation.', keyConcepts: ['Equivalent ratios', 'Proportion', 'Partnership', 'Direct and inverse variation'], estimatedMinutes: 50,
    foundation: 'A ratio a:b compares quantities in the same units and represents a/b. Multiplying or dividing both terms by the same non-zero number keeps the ratio unchanged. A proportion a:b = c:d means the two fractions are equal, so ad = bc.',
    method: 'To combine A:B and B:C, make the shared B equal using the LCM, then read off A:B:C. To divide a total in ratio m:n, first count m+n equal parts; each part is total/(m+n). For direct variation y∝x, use a constant y/x; for inverse variation y∝1/x, use a constant xy.',
    examUse: 'If A:B=3:5 and B:C=10:7, double the first ratio to 6:10. Therefore A:B:C=6:10:7. If ₹2,300 is shared in 6:10:7, there are 23 parts worth ₹100 each, giving ₹600, ₹1,000 and ₹700.',
    trap: 'Convert unlike units before making a ratio. A:B=2:3 does not mean A is 2/3 of the total; A is 2/5 of the combined total. Confirm whether a situation is direct or inverse before applying a proportion.', example: { question: 'A and B share ₹840 in the ratio 3:4. Find each share.', steps: ['Total parts = 3+4 = 7.', 'One part = 840/7 = ₹120.', 'Shares are 3×120 and 4×120.'], answer: '₹360 and ₹480' } }),
  deepTopic({ id: 'qt-2', dayNumber: 5, subject: 'Quantitative Techniques', title: 'Averages, Weighted Mean & Mixtures', summary: 'Use totals and weighted averages for changing groups, mixtures, replacement and alligation.', keyConcepts: ['Average as equal share', 'Weighted mean', 'Replacement', 'Alligation'], estimatedMinutes: 50,
    foundation: 'Average = total ÷ number of observations, so total = average × count. When groups have different sizes, the overall average is weighted by their counts; it is not generally the simple average of the group averages.',
    method: 'For a changed average, find the old total, add or remove the known values, then divide by the new count. For two ingredients priced or concentrated at L and H mixed to mean M, quantities are in ratio (H−M):(M−L). For repeated replacement, the fraction of original liquid left after n operations is (1−x/V)^n.',
    examUse: 'A class of 20 averages 60 and a class of 30 averages 70. Combined mean = (20×60 + 30×70)/50 = 66. The larger group contributes more to the mean because it carries more weight.',
    trap: 'Do not average two averages unless the group sizes are equal. Alligation gives a quantity ratio, not a price difference. In replacement questions use the volume removed divided by total volume, and raise the remaining fraction to the number of rounds.', example: { question: 'Mix 20 L at ₹30/L with 30 L at ₹50/L. Find mean cost per litre.', steps: ['Total cost = 20×30 + 30×50 = ₹2,100.', 'Total volume = 50 L.', 'Mean cost = 2,100/50.'], answer: '₹42 per litre' } }),
  deepTopic({ id: 'qt-interest-discount', dayNumber: 5, subject: 'Quantitative Techniques', title: 'Interest, Mark-up, Discount & Partnership', summary: 'Connect cost, marked price, selling price, simple/compound interest and time-weighted capital.', keyConcepts: ['Simple and compound interest', 'Successive discounts', 'Markup and margin', 'Partnership'], estimatedMinutes: 55,
    foundation: 'Simple interest is calculated on original principal: SI=PRT/100. Compound interest adds each period’s interest to the balance: A=P(1+r/100)^t. Profit percentage is based on cost price; discount percentage is based on marked price.',
    method: 'Draw the price chain MP → discount → SP and compare SP with CP. For successive percentage changes, multiply the change factors (1±r/100). In a partnership, profit shares are proportional to capital × time; convert each partner’s investment period to the same units.',
    examUse: 'A ₹1,000 item has a 20% markup then a 10% discount. SP = 1,000×1.20×0.90 = ₹1,080, so profit is 8%, not 10%. ₹1,000 at 10% compounded annually for two years grows to ₹1,210. For partial stock loss, if 25% is lost and the remaining units sell at 20% above a normal 25%-profit price, revenue is 0.75×1.25×1.20=1.125 of total cost: 12.5% profit.',
    trap: 'Use CP as the base for profit %, MP for discount %, and principal only for simple interest. A 20% rise followed by a 20% fall is not zero net change. Check whether compounding is annual, half-yearly or otherwise before selecting t and the period rate.', example: { question: 'A sum of ₹5,000 earns 8% simple interest for 3 years. Find the amount.', steps: ['SI = 5,000×8×3/100 = ₹1,200.', 'Amount = principal + interest.', 'A = ₹5,000 + ₹1,200.'], answer: '₹6,200' } }),
  deepTopic({ id: 'qt-time-work-pipes', dayNumber: 5, subject: 'Quantitative Techniques', title: 'Time & Work, Wages and Pipes', summary: 'Translate work into rates, combine workers, account for efficiency and handle filling/leaking tanks.', keyConcepts: ['Work rate', 'LCM units', 'Efficiency', 'Pipes and leaks'], estimatedMinutes: 50,
    foundation: 'If a worker completes one job in x days, the rate is 1/x job per day. Rates add when people work together and subtract when a leak or opposing process undoes work. For the same job, time is inversely proportional to rate.',
    method: 'Choose total work as the LCM of the individual times. Divide by each time to get integer daily rates. Add rates for joint work, multiply by the number of days, and divide remaining work by the final rate. For wages on equal productivity, divide pay in proportion to work completed.',
    examUse: 'A finishes in 12 days, B in 18. Let work=36 units: rates are 3 and 2 units/day. Together they complete 5 units/day, so time is 36/5=7.2 days. If a pipe fills 6 units/h and a leak drains 2 units/h, net rate is 4 units/h.',
    trap: 'Do not add completion times; add rates. When someone leaves, subtract the work already completed before recalculating. Make sure all rates use the same time unit, and treat a leak as negative work.', example: { question: 'A does a job in 10 days, B in 15. How long together?', steps: ['LCM work = 30 units.', 'Rates: A=3 and B=2 units/day.', 'Together: 30/(3+2).'], answer: '6 days' } }),
  deepTopic({ id: 'qt-speed-distance', dayNumber: 5, subject: 'Quantitative Techniques', title: 'Time, Speed & Distance', summary: 'Solve travel, relative speed, trains, boats and average-speed questions with consistent units.', keyConcepts: ['Distance=speed×time', 'Relative speed', 'Train crossing', 'Boats and streams'], estimatedMinutes: 50,
    foundation: 'Distance = speed×time. Use km/h and hours together, or m/s and seconds together; multiply km/h by 5/18 to convert to m/s. Relative speed is the sum when objects move toward each other and the difference when they move in the same direction.',
    method: 'For a train crossing a pole, distance is the train length. Crossing a platform uses train length + platform length. For a round trip over equal distances, average speed is 2uv/(u+v), not (u+v)/2. In still water, boat speed is (downstream+upstream)/2 and stream speed is their difference/2.',
    examUse: 'A 150 m train at 54 km/h moves at 15 m/s. Crossing a 250 m platform takes (150+250)/15 = 26⅔ seconds. For 30 and 60 km/h over equal distances, average speed = 2×30×60/90 = 40 km/h.',
    trap: 'Convert units before combining values. Equal-time journeys use the arithmetic mean of speeds; equal-distance journeys use the harmonic mean. Account for the length of both objects when two trains cross.', example: { question: 'A 120 m train travels at 72 km/h. Time to cross a pole?', steps: ['72 km/h = 72×5/18 = 20 m/s.', 'Distance to clear the pole = 120 m.', 'Time = 120/20.'], answer: '6 seconds' } }),
  deepTopic({ id: 'qt-algebra-equations', dayNumber: 5, subject: 'Quantitative Techniques', title: 'Algebra, Equations & Inequalities', summary: 'Build expressions, solve linear and quadratic equations, use identities and interpret inequalities.', keyConcepts: ['Expressions and identities', 'Linear equations', 'Quadratics', 'Inequalities'], estimatedMinutes: 55,
    foundation: 'A variable represents an unknown number; an equation says two expressions have equal values. Whatever operation is applied to one side must be applied to the other. An identity is true for all allowed values, while an equation is true only for its solutions.',
    method: 'Translate words into an equation, collect like terms, isolate the variable and substitute back to check. For ax²+bx+c=0, factor when possible or use the quadratic formula; the sum of roots is −b/a and product is c/a. When multiplying an inequality by a negative number, reverse its direction.',
    examUse: 'If x+y=11 and x−y=3, add the equations: 2x=14, so x=7 and y=4. For x²−5x+6=0, factor to (x−2)(x−3)=0, giving roots 2 and 3. Check both in the original expression.',
    trap: 'Keep signs when moving terms, and do not divide by an expression that might be zero without checking that case. A square root can have two signs in equations. Reverse the inequality only when multiplying or dividing by a negative number.', example: { question: 'Solve 3x+7=25.', steps: ['Subtract 7 from both sides: 3x=18.', 'Divide both sides by 3.', 'Check: 3×6+7=25.'], answer: 'x=6' } }),
  deepTopic({ id: 'qt-geometry-mensuration', dayNumber: 5, subject: 'Quantitative Techniques', title: 'Geometry & Mensuration', summary: 'Use angle facts, triangles, polygons, circles, perimeter, area, surface area and volume.', keyConcepts: ['Angles and triangles', 'Similarity', 'Circle theorems', 'Area and volume'], estimatedMinutes: 60,
    foundation: 'Angles on a straight line total 180° and around a point total 360°. Triangle angles total 180°. Similar figures have equal corresponding angles and proportional sides; their area ratio is the square of the side ratio and volume ratio is the cube.',
    method: 'Sketch and label the shape before calculating. Write the needed formula and identify its units: perimeter is linear, area is squared, volume is cubed. For circles use circumference 2πr and area πr². Split composite figures into familiar shapes, then add or subtract areas.',
    examUse: 'A 3-4-5 triangle is right angled. Its area is (1/2)×3×4=6 square units. If similar figures have side ratio 2:3, their area ratio is 4:9. If a rectangle’s length rises 25% but area stays fixed, width is multiplied by 1/1.25=0.8, so it falls 20%. For circles, circumference ratio equals radius ratio, while area ratio is the square of that ratio. A cylinder’s volume is πr²h.',
    trap: 'Do not mix radius and diameter. Perimeter and area answer different questions. Similarity scales area quadratically, not linearly. Convert all lengths to one unit before finding area or volume and include the correct squared/cubed units.', example: { question: 'Find the area of a circle of radius 7 cm. Use π=22/7.', steps: ['Area = πr².', 'Substitute 22/7 × 7 × 7.', 'Cancel one factor of 7.'], answer: '154 cm²' } }),
  deepTopic({ id: 'qt-counting-probability', dayNumber: 5, subject: 'Quantitative Techniques', title: 'Permutations, Combinations & Probability', summary: 'Count arrangements and selections, then convert favourable outcomes into probability.', keyConcepts: ['Factorials', 'Permutations', 'Combinations', 'Complementary probability'], estimatedMinutes: 55,
    foundation: 'The multiplication rule says sequential independent choices multiply. n! counts orders of n distinct items. Permutation nPr selects and arranges r items; combination nCr selects an unordered group. Around a round table, rotations are equivalent, so n distinct people have (n−1)! circular arrangements. Probability is favourable outcomes divided by equally likely total outcomes.',
    method: 'Ask whether order matters: if yes, arrange; if no, select. Account for repeated objects by dividing by repeated factorials. For “at least one” events, use 1−P(none). For circular seating, fix one person to remove rotations and count relative arrangements. For mutually exclusive outcomes add probabilities; for independent events multiply them.',
    examUse: 'Choose 3 people from 8: 8C3=56 because order does not matter. Arrange 3 of 8 in roles: 8P3=336. Around a table, 5 people have 4!=24 arrangements. For a circular-gap probability, fix A, count all arrangements of the remaining people, then count the arrangements satisfying the gap condition.',
    trap: 'Do not use permutations when order is irrelevant. Outcomes must be equally likely for the simple favourable/total formula. “At least one” is often easier through the complement, but define the complement carefully.', example: { question: 'How many ways can 2 students be chosen from 5?', steps: ['The two selected students have no distinct roles, so order does not matter.', 'Use 5C2 = 5!/(2!3!).', 'Evaluate 5×4/2.'], answer: '10 ways' } }),
  deepTopic({ id: 'qt-data-interpretation', dayNumber: 5, subject: 'Quantitative Techniques', title: 'Data Interpretation: Tables, Charts & Caselets', summary: 'Read tables, bar/line/pie charts and caselets; calculate shares, changes, ratios and weighted averages efficiently.', keyConcepts: ['Units and legends', 'Percentage change', 'Pie-chart angles', 'Approximation and comparison'], estimatedMinutes: 60,
    foundation: 'Data Interpretation tests accurate reading before arithmetic. First identify the unit, time period, category and chart scale. A pie chart’s full 360° represents the total, so a sector of θ° represents θ/360 of that total.',
    method: 'For change from old to new use (new−old)/old×100. For a share use part/whole. Translate a question into one expression before calculating. Estimate to eliminate impossible options, then compute exactly only when close options require it.',
    examUse: 'A firm’s sales rise from 240 to 300: growth is 60/240=25%. If a 720-person survey assigns 90° to one category, that category contains 90/360×720=180 people. Compare ratios using cross multiplication to avoid unnecessary decimals.',
    trap: 'Use the original value as the denominator for percentage change. Check whether chart values are absolute figures, percentages, thousands or indices. Do not round intermediate values too early, and do not mistake percentage points for percent change.', example: { question: 'Sales are 80 in Q1 and 100 in Q2. What is the percentage increase?', steps: ['Change = 100−80 = 20.', 'Base is Q1 sales: 80.', 'Increase % = 20/80×100.'], answer: '25%' } }),
  // Logical Reasoning: pattern recognition, formal deduction, arrangements and critical reasoning.
  deepTopic({ id: 'lr-series-analogy', dayNumber: 6, subject: 'Logical Reasoning', title: 'Series, Analogy & Classification', summary: 'Find number/letter patterns and explain the exact relationship in analogy or odd-one-out tasks.', keyConcepts: ['Differences and ratios', 'Alternating patterns', 'Letter positions', 'Relationship testing'], estimatedMinutes: 45,
    foundation: 'A series is a sequence generated by a rule. Look at first differences, second differences, ratios, alternating positions, squares/cubes, primes, or combined operations. For letters, map A=1 through Z=26 and note whether positions wrap after 26.',
    method: 'Write the change between adjacent terms before guessing. Split odd and even positions if one rule fails. For an analogy, state the relationship in a sentence, then test whether the same direction and specificity fit the second pair. For classification, find the property shared by three items.',
    examUse: 'In 2, 6, 12, 20, 30, differences are 4, 6, 8, 10, so the next difference is 12 and the next term is 42. In letter series, test shifts numerically and verify the wrap-around rule.',
    trap: 'Many short series fit several imaginable rules; choose the simplest rule that explains every term. Do not infer only from the last pair. For analogies, preserve the direction (cause→effect differs from effect→cause).', example: { question: 'Find the next number: 5, 9, 15, 23, 33, __.', steps: ['Differences are 4, 6, 8, 10.', 'The differences rise by 2.', 'Next difference is 12; add to 33.'], answer: '45' } }),
  deepTopic({ id: 'lr-coding-decoding', dayNumber: 6, subject: 'Logical Reasoning', title: 'Coding-Decoding & Alphabet Tests', summary: 'Decode shifts, reversals, substitutions, letter positions and mixed letter-number codes.', keyConcepts: ['Alphabet positions', 'Uniform shifts', 'Reverse alphabet', 'Position-wise rules'], estimatedMinutes: 40,
    foundation: 'Assign A=1, B=2, …, Z=26. A code may shift each letter by a fixed amount, reverse the alphabet, reverse the word, swap positions, or combine a letter change with a number. Treat each position as evidence for a rule.',
    method: 'Compare each original letter with its coded partner and record the shift. Test the rule on every letter and on a second example before applying it to a new word. For reverse alphabet mapping use A↔Z, B↔Y, C↔X.',
    examUse: 'If CAT becomes DBU, each letter moves forward by one, so DOG becomes EPH. If shifts alternate +1, −1, +1, preserve that pattern by position rather than applying one shift to the whole word.',
    trap: 'Do not rely on a rule that explains just one letter. Check whether the word is reversed before or after substitution. When shifts pass Z, wrap around to A only if the examples demonstrate cyclic alphabet movement.', example: { question: 'With each letter shifted +2, code MAP.', steps: ['M shifts to O.', 'A shifts to C.', 'P shifts to R.'], answer: 'OCR' } }),
  deepTopic({ id: 'lr-1', dayNumber: 6, subject: 'Logical Reasoning', title: 'Directions, Distance & Blood Relations', summary: 'Track orientation and displacement, and translate family statements into clear diagrams.', keyConcepts: ['Compass turns', 'Net displacement', 'Family tree', 'Generation and gender'], estimatedMinutes: 45,
    foundation: 'For direction questions, fix North at the top and rotate the person’s facing direction after every turn. For relationships, draw one generation per row and mark known gender only when stated. The “speaker” and pronouns in a sentence must be tracked carefully.',
    method: 'Represent each move as horizontal and vertical displacement; opposite directions cancel. The shortest distance is found with Pythagoras when the final displacement is perpendicular. Draw family edges before naming the relationship, and separate “A is B’s parent” from “A is B’s sibling.”',
    examUse: 'Walk 6 m east then 8 m north: net distance from start is √(6²+8²)=10 m, and direction is northeast. If P is Q’s mother and Q is R’s brother, P is R’s mother only if Q and R are confirmed siblings; “brother of” provides that link.',
    trap: 'Left/right depends on the person’s current facing, not the page. Travelled distance is not the same as shortest distance. Avoid assuming gender, marriage, or sibling links that the statements do not establish.', example: { question: 'Walk 3 km east and then 4 km north. How far from the start?', steps: ['The path makes a right triangle.', 'Use displacement = √(3²+4²).', 'The resulting direction is northeast.'], answer: '5 km northeast' } }),
  deepTopic({ id: 'lr-2', dayNumber: 6, subject: 'Logical Reasoning', title: 'Syllogisms, Venn Diagrams & Conclusions', summary: 'Test “all”, “some”, “no” and “some not” claims without adding assumptions.', keyConcepts: ['Quantifiers', 'Venn models', 'Possibility', 'Conclusion validity'], estimatedMinutes: 45,
    foundation: '“All A are B” places A inside B. “No A is B” separates the sets. “Some A are B” requires an overlap. “Some A are not B” requires at least one A outside B. “Some” means at least one; it does not automatically mean “some but not all.”',
    method: 'Translate each statement into a diagram or set relation. Test a proposed conclusion against every valid arrangement. If one valid arrangement makes the conclusion false, it does not follow. For possibility, show that at least one arrangement satisfies all statements and the proposed relation.',
    examUse: 'All cats are animals; some animals are wild. The wild animals could be cats, but they could also lie outside cats. Therefore “some cats are wild” is possible, but it is not guaranteed. With three-set diagrams, count only the requested intersection: the central region belongs to all three sets; pairwise regions outside the centre do not.',
    trap: 'Do not reverse “all A are B” into “all B are A.” Do not turn “some B are C” into “some A are C” merely because A is inside B. Use only information in the statements, not real-world knowledge.', example: { question: 'All roses are flowers. No flower is metal. Can any rose be metal?', steps: ['Roses are contained within flowers.', 'Flowers do not overlap metals.', 'Therefore roses cannot overlap metals.'], answer: 'No; no rose can be metal.' } }),
  deepTopic({ id: 'lr-seating-puzzles', dayNumber: 6, subject: 'Logical Reasoning', title: 'Seating Arrangements & Logic Puzzles', summary: 'Solve linear/circular seating, ordering, floors and multi-condition puzzles systematically.', keyConcepts: ['Fixed anchors', 'Relative positions', 'Case splitting', 'Constraint tables'], estimatedMinutes: 55,
    foundation: 'A puzzle is a set of constraints. “Immediately left” is stronger than “somewhere left.” In a circle, left and right depend on whether people face the centre or outward. A linear row has fixed ends; a circle has rotational symmetry.',
    method: 'List entities and positions, place the most restrictive clue first, then add direct relations. Mark confirmed placements separately from possibilities. Split into cases only when a clue creates alternatives, and reject a case as soon as it contradicts any condition.',
    examUse: 'For five people in a row, anchor a person at an end if the clues permit it. If B is immediately right of A, place them as a block [A,B], then position remaining people against other constraints. In a circle, fix one person to remove equivalent rotations.',
    trap: 'Never treat “left of” as “immediately left of.” In circular puzzles, do not compare positions before fixing a reference orientation. Keep tentative cases visible so an early guess does not silently become a fact.', example: { question: 'A sits immediately left of B. C is at the far left. What is the first safe diagramming step?', steps: ['Draw the number of seats and mark the far-left position.', 'Place C there only.', 'Keep the A-B block together but unplaced until other clues anchor it.'], answer: 'Anchor C; represent A-B as an ordered block.' } }),
  deepTopic({ id: 'lr-statement-argument', dayNumber: 6, subject: 'Logical Reasoning', title: 'Statement, Assumption, Argument & Inference', summary: 'Separate given facts from assumptions and evaluate relevance, strength, cause and conclusion.', keyConcepts: ['Premise and conclusion', 'Assumption', 'Strong arguments', 'Inference and cause-effect'], estimatedMinutes: 50,
    foundation: 'A premise is information supplied; a conclusion is a claim supported by it. An assumption is an unstated bridge that must be true for an argument to work. An inference must be supported by the statement, whereas an opinion may go beyond it.',
    method: 'Identify the exact question word: assume, conclude, strengthen or weaken. For an assumption, negate the candidate: if the argument collapses, it is likely necessary. Strong arguments are relevant, practical and focused on the issue; correlation alone does not establish causation.',
    examUse: 'Claim: install shaded bus stops to increase ridership. Necessary assumption: passengers value shade enough for it to affect their choice. Evidence that ridership rose in a similar city strengthens the claim. In an assertion–reason item, judge whether each statement is true first, then ask whether the reason actually explains the assertion; two true statements do not automatically form an explanation.',
    trap: 'Do not import facts or personal preferences. A statement being plausible is not enough for an inference. Distinguish a necessary assumption from a statement that merely makes the conclusion more likely.', example: { question: 'All surveyed students preferred evening classes. What follows?', steps: ['The statement is limited to the surveyed students.', 'It does not establish what every student prefers.', 'It supports a conclusion about the sample only.'], answer: 'The surveyed group preferred evening classes; a universal claim does not follow.' } }),
  deepTopic({ id: 'lr-data-sufficiency', dayNumber: 6, subject: 'Logical Reasoning', title: 'Data Sufficiency & Decision Questions', summary: 'Decide whether given facts determine one answer; do not solve beyond the sufficiency test.', keyConcepts: ['One unique answer', 'Statements separately', 'Combined information', 'Boundary cases'], estimatedMinutes: 40,
    foundation: 'A data-sufficiency item asks whether information is enough to determine an answer, not necessarily what the answer is. Sufficient means one unique answer is forced; several possible answers mean insufficient.',
    method: 'Test statement I alone, then II alone, then both together. Use variables and check whether unknowns remain. For yes/no questions, a definite yes or definite no is sufficient; “sometimes yes, sometimes no” is not.',
    examUse: 'Question: is x positive? I: x²=9 gives x=3 or −3, so insufficient. II: x>0 is sufficient. Statement II alone settles the yes/no question without computing x.',
    trap: 'Do not combine the statements before checking them separately. Do not assume unstated constraints such as integer values. For geometry, a diagram may not be to scale unless the problem says so.', example: { question: 'Is integer n even? I: n is divisible by 4. II: n is divisible by 2.', steps: ['I alone: every multiple of 4 is even; sufficient.', 'II alone: every multiple of 2 is even; sufficient.', 'Each statement independently answers yes.'], answer: 'Each statement alone is sufficient.' } }),
  deepTopic({ id: 'lr-ordering-ranking', dayNumber: 6, subject: 'Logical Reasoning', title: 'Ordering, Ranking & Meaningful Sequences', summary: 'Arrange events and words into a logical order, rank positions, and reason about digit-position constraints.', keyConcepts: ['Before and after', 'Rank from both ends', 'Process sequence', 'Digit-position constraints'], estimatedMinutes: 45,
    foundation: 'Ordering questions ask for a consistent sequence from clues such as before, after, older, taller, or first. Ranking uses a person’s position from one end; if the same person is rth from the left and sth from the right, total people = r+s−1.',
    method: 'Translate each clue into an arrow or inequality (A before B means A→B). Join chains and look for contradictions. For meaningful word sequences, identify the real-world process first. For digit rearrangement, write the original positions and compare each digit’s final position after applying the stated sorting rule.',
    examUse: 'A legal process might follow crime → police investigation → court → judgement → punishment, subject to how the question frames the sequence. If a person is 7th from the left and 9th from the right, the row has 7+9−1=15 people.',
    trap: 'Do not reverse “before” and “after.” Rank totals subtract one because the person is counted from both sides. If a question asks about pairs of digits, define what counts as a pair and track positions instead of relying on visual intuition.', example: { question: 'Ravi is 8th from the left and 11th from the right. How many people are in the row?', steps: ['Add the two ranks.', 'Subtract one because Ravi is counted twice.', '8+11−1=18.'], answer: '18 people' } }),
  // Language Comprehension: reading, vocabulary, grammar, sentence logic and verbal reasoning.
  deepTopic({ id: 'lc-1', dayNumber: 7, subject: 'Language Comprehension', title: 'Reading Comprehension: Structure, Inference & Tone', summary: 'Read actively, map argument structure and answer main-idea, detail, inference and tone questions.', keyConcepts: ['Main claim', 'Paragraph function', 'Evidence vs inference', 'Tone'], estimatedMinutes: 55,
    foundation: 'A passage is an argument or explanation with a main subject and a controlling claim. Each paragraph has a job: introduce, support, contrast, exemplify or conclude. Read to understand relationships, not to memorise every line.',
    method: 'After each paragraph, write a 3–6 word margin label. For main idea, combine subject + author’s central point. For detail, return to the relevant lines. For inference, select the smallest conclusion supported by the text. For tone, infer attitude from word choice and qualification.',
    examUse: 'If a passage says urban trees lower heat but maintenance varies by species, the balanced main idea is that tree benefits depend partly on planning and care. “All trees always solve heat” is too broad; “one city planted 20 trees” is too narrow.',
    trap: 'A true statement can still be the wrong answer if the passage does not support it. Beware extreme words (always, never), outside knowledge and options that repeat a detail while missing the main claim.', example: { question: 'A passage praises remote work’s flexibility but notes isolation risks. Best summary?', steps: ['Keep both the benefit and qualification.', 'Do not make the author wholly for or against remote work.', 'State the balanced central relationship.'], answer: 'Remote work offers flexibility, but its social costs require attention.' } }),
  deepTopic({ id: 'lc-2', dayNumber: 7, subject: 'Language Comprehension', title: 'Vocabulary, Roots, Synonyms & Usage', summary: 'Infer meaning from context, build word families and distinguish near-synonyms by tone and usage.', keyConcepts: ['Context clues', 'Roots and affixes', 'Connotation', 'Collocations'], estimatedMinutes: 45,
    foundation: 'A word’s dictionary meaning is only part of meaning; connotation and grammatical role matter too. Prefixes change meaning, roots carry a core idea, and suffixes often signal part of speech. Context clues include contrast, restatement, examples and cause-effect.',
    method: 'Cover the answer choices and substitute a plain-language meaning into the sentence. Use surrounding clauses to infer polarity and intensity. Then compare options by part of speech, collocation and connotation before selecting.',
    examUse: '“The manager was frugal, reusing supplies and tracking every expense” signals careful spending. “Miserly” is more negative; “economical” is usually neutral or positive. Pick the word that matches both meaning and tone.',
    trap: 'Do not choose a synonym based only on one shared meaning. Check whether the word fits the sentence’s grammar and emotional tone. Avoid memorising a root as an absolute definition; words can develop specialised meanings.', example: { question: 'In “Her concise note contained every key decision,” concise most nearly means?', steps: ['The note contains all essential points.', 'Concise describes a communication style.', 'Choose brevity without loss of essentials.'], answer: 'Brief and clear' } }),
  deepTopic({ id: 'lc-grammar-sva-tenses', dayNumber: 7, subject: 'Language Comprehension', title: 'Grammar Foundations: Agreement, Tense & Pronouns', summary: 'Identify clause subjects, keep tense consistent and make pronouns precise.', keyConcepts: ['Subject-verb agreement', 'Tense sequence', 'Pronoun antecedent', 'Parallel structure'], estimatedMinutes: 55,
    foundation: 'A sentence needs a subject and a finite verb. The subject controls verb agreement even when a phrase separates them. Pronouns should have a clear antecedent and agree in number. Tense communicates when events happen and should shift only when the timeline shifts.',
    method: 'Bracket prepositional phrases to find the true subject. Match singular subjects to singular verbs. For pronouns, point to one unambiguous noun. In lists, make grammatical forms parallel: “to plan, to budget and to execute.”',
    examUse: '“The list of proposals is ready”: subject is list, not proposals. “Each of the candidates has submitted a form”: each is singular in formal test grammar. In reported speech, sequence tenses consistently unless the statement remains generally true.',
    trap: 'Do not let the nearest noun control the verb. Collective nouns and “either/neither” need attention to the intended subject and test convention. Avoid pronouns like “it” or “they” when two antecedents compete.', example: { question: 'Choose: “The bouquet of roses (smell/smells) sweet.”', steps: ['Ignore the “of roses” phrase.', 'The subject is singular “bouquet.”', 'Use the singular verb form.'], answer: 'smells' } }),
  deepTopic({ id: 'lc-sentence-correction', dayNumber: 7, subject: 'Language Comprehension', title: 'Sentence Correction, Modifiers & Prepositions', summary: 'Repair dangling modifiers, faulty comparisons, articles, prepositions and common usage errors.', keyConcepts: ['Modifier attachment', 'Articles', 'Prepositions', 'Comparison and parallelism'], estimatedMinutes: 50,
    foundation: 'A modifier should sit next to the word it describes. A dangling opening phrase lacks a logical subject. Articles a/an introduce a nonspecific singular count noun; the introduces a specific one. Prepositions express relationships and are often fixed by idiomatic usage.',
    method: 'Read the whole sentence for meaning first. Find subject and verb, then inspect modifier attachment, agreement, parallel forms and comparison pairs. Prefer the shortest option that preserves the intended meaning and fixes all errors.',
    examUse: 'Incorrect: “Walking to class, the rain began.” The rain is not walking. Correct: “Walking to class, I was caught in the rain.” Compare like with like: “The revenue of A is higher than that of B.”',
    trap: 'A grammatically possible option may change meaning. Avoid “more better” and incomplete comparisons. Do not use “an” based only on spelling; it depends on the following sound (an hour, a university).', example: { question: 'Correct the modifier: “After reading the report, the decision was clear.”', steps: ['The opening phrase needs a reader.', 'The decision cannot read the report.', 'Name the person who read it.'], answer: 'After reading the report, Maya found the decision clear.' } }),
  deepTopic({ id: 'lc-parajumbles-summary', dayNumber: 7, subject: 'Language Comprehension', title: 'Para-jumbles, Coherence & Summarising', summary: 'Order sentences through opening statements, references, transitions, chronology and conclusion cues.', keyConcepts: ['Opening sentence', 'Pronoun reference', 'Transition signals', 'Summary scope'], estimatedMinutes: 45,
    foundation: 'A coherent paragraph introduces its subject before using unexplained pronouns or examples. Sentences connect through repeated key terms, pronouns, contrast words, cause-effect and chronology. A summary preserves the central idea while removing examples and repetition.',
    method: 'Find a sentence that can stand alone as an introduction. Pair pronouns with their antecedents and examples with the claim they illustrate. Track contrast markers (however), sequence (then), cause (therefore) and conclusion cues. Validate the complete order by reading it aloud mentally.',
    examUse: 'If one sentence introduces a policy, a later sentence says “This measure…”, and a final sentence gives its outcome, the policy sentence must precede “This measure.” Transitional words establish the remaining relation.',
    trap: 'Do not order by topic similarity alone. “This/they/it” usually points backward to an already introduced idea. A summary should not add an opinion or preserve a minor example at the expense of the main claim.', example: { question: 'Order: (A) This reduced waiting time. (B) The clinic introduced online appointments. (C) Patients could book before arriving.', steps: ['B introduces the change.', 'C explains how the change works.', 'A reports its result.'], answer: 'B → C → A' } }),
  deepTopic({ id: 'lc-cloze-verbal-logic', dayNumber: 7, subject: 'Language Comprehension', title: 'Cloze, Fill-in-the-blanks & Verbal Logic', summary: 'Use grammar, collocation, logic and context to complete sentences and short passages.', keyConcepts: ['Grammar clues', 'Collocations', 'Transition logic', 'Elimination'], estimatedMinutes: 45,
    foundation: 'A blank can test grammar, vocabulary, collocation or the logic between clauses. Contrast markers predict an opposing idea; cause markers predict an effect; addition markers continue a point. Read the entire sentence before choosing.',
    method: 'Predict the type of missing word, check the part of speech and polarity, then test each option in context. For two blanks, solve the relationship between the ideas before choosing a pair. Read the completed sentence once to ensure meaning and grammar both work.',
    examUse: '“The plan was initially ___; however, later evidence made it ___” signals a contrast in evaluation. The first blank should fit the initial state and the second the changed one; grammatical fit alone cannot determine the pair.',
    trap: 'Do not choose a familiar phrase without checking the sentence’s logic. Ensure conjunctions connect compatible clause structures. If two options are synonyms, compare register and collocation in the exact sentence.', example: { question: '“The evidence was ___, so the committee postponed its decision.” Choose: conclusive / inconclusive.', steps: ['Postponing a decision suggests uncertainty.', 'The causal connector “so” links the evidence to that uncertainty.', 'Choose the word with the matching meaning.'], answer: 'inconclusive' } }),
  // General Awareness: durable foundations plus a repeatable current-affairs study method.
  deepTopic({ id: 'gk-polity-governance', dayNumber: 8, subject: 'General Awareness', title: 'Indian Constitution, Polity & Governance', summary: 'Learn constitutional structure, rights, Parliament, executive, judiciary and core institutions.', keyConcepts: ['Constitutional framework', 'Fundamental Rights and Duties', 'Parliament and executive', 'Federalism'], estimatedMinutes: 55,
    foundation: 'The Constitution is the framework for public power and citizen rights. Article 14 concerns equality before law; Article 21 protects life and personal liberty; Article 24 prohibits employment of children in specified hazardous work; Article 50 directs separation of the judiciary from the executive. India is a parliamentary democracy: the Council of Ministers is collectively responsible to the Lok Sabha.',
    method: 'Study institutions by asking: who selects members, what powers they have, how long they serve and who checks them. Separate Fundamental Rights (enforceable claims), Directive Principles (goals for the state) and Fundamental Duties (citizen responsibilities).',
    examUse: 'For a matching question, connect each article to its core idea before reading the options: 14→equality; 21→life and personal liberty; 24→child employment prohibition; 50→separation of judiciary and executive. Parliament legislates, the executive administers, and courts interpret law and review constitutionality.',
    trap: 'Do not confuse the ceremonial constitutional head with the elected political executive. A bill, an act and an ordinance are different stages/instruments. Verify article numbers and current officeholders from reliable sources during revision.', example: { question: 'Which branch interprets laws and adjudicates disputes?', steps: ['Legislatures make laws.', 'The executive administers them.', 'Courts interpret laws and decide cases.'], answer: 'The judiciary' } }),
  deepTopic({ id: 'gk-1', dayNumber: 8, subject: 'General Awareness', title: 'Indian Economy, Banking & Budget Basics', summary: 'Understand GDP, inflation, fiscal policy, RBI, monetary tools, banking and public finance.', keyConcepts: ['GDP and growth', 'Inflation', 'RBI and monetary policy', 'Fiscal deficit'], estimatedMinutes: 55,
    foundation: 'GDP measures the value of final goods and services produced within a country over a period. Inflation is a sustained rise in the general price level, reducing purchasing power. Monetary policy influences credit and liquidity; fiscal policy uses government taxes and spending.',
    method: 'Keep stock vs flow clear: debt is measured at a point in time, deficit over a period. The RBI is India’s central bank; repo-related rates influence bank funding conditions. Fiscal deficit is expenditure minus receipts excluding borrowings, with borrowing used to finance the gap.',
    examUse: 'If inflation rises, a central bank may tighten monetary conditions to moderate demand. If government spending exceeds non-borrowed receipts, the difference must be financed. Read the wording carefully: nominal GDP includes price changes; real GDP adjusts for them.',
    trap: 'Do not confuse GDP with government revenue, national income with exports, or fiscal deficit with total debt. Economic figures and officeholders change; use dated sources and distinguish a fact’s reference year from its publication date.', example: { question: 'What does a fiscal deficit broadly measure?', steps: ['Take total government expenditure.', 'Subtract receipts other than borrowings.', 'The remaining financing gap is the fiscal deficit.'], answer: 'Expenditure minus non-borrowing receipts' } }),
  deepTopic({ id: 'gk-history-geography-science', dayNumber: 8, subject: 'General Awareness', title: 'History, Geography, Science & Culture', summary: 'Build a static-GK framework for Indian history, physical geography, science and cultural institutions.', keyConcepts: ['Historical chronology', 'Indian geography', 'Basic science', 'Culture and heritage'], estimatedMinutes: 55,
    foundation: 'Static GK is best organised into timelines and systems. For history, connect period → movement/event → people → consequence. Geography links location, climate, rivers, resources and economy; learn landmark-to-city and monument-to-region pairs. Basic science often tests physical quantities, SI units and the principle behind familiar applications (length→metre, mass→kilogram, temperature→kelvin, current→ampere).',
    method: 'Make short comparison tables rather than isolated lists: era and feature, river and basin, instrument and use, award and field. Use maps for states, neighbours, rivers and physical regions. Revisit facts with spaced recall rather than rereading.',
    examUse: 'For a science match, connect the quantity to its SI unit before looking at the answer combinations: length→metre, mass→kilogram, temperature→kelvin, electric current→ampere. For history, place an event on a timeline before matching a leader or organisation; for heritage questions, locate the city on a map.',
    trap: 'Avoid learning disconnected facts without dates or context. Similar names and institutions are easy to mix up. Static facts may be stable, but awards, officeholders, rankings and recent discoveries must be checked for date and source.', example: { question: 'How should a learner approach a question about a river’s basin?', steps: ['Locate the river’s source and flow direction on a map.', 'Identify major tributaries and states crossed.', 'Connect the basin to its sea or inland outlet.'], answer: 'Use a map-based basin chain: source → course → tributaries → outlet.' } }),
  deepTopic({ id: 'gk-current-affairs', dayNumber: 8, subject: 'General Awareness', title: 'Current Affairs, Awards, Sports & Reports', summary: 'Create a reliable rolling revision system for time-sensitive national and global events.', keyConcepts: ['Source checking', 'Date and context', 'Who/what/where', 'Spaced revision'], estimatedMinutes: 45,
    foundation: 'Current affairs becomes outdated, so record the event date and the source publication date. Prioritise national policy, economy, science, international bodies, major awards, sports championships and significant appointments.',
    method: 'For each item capture: what happened, who was involved, where, when, why it matters and one reliable source. Keep a weekly one-page digest and revisit it after 1, 3 and 7 days. Separate confirmed facts from projections or commentary.',
    examUse: 'For awards, learn the recipient, field and edition/year. Pulitzer Prizes cover journalism and also books, drama and music; the exact category matters. For a report, note issuing organisation and theme. For sports, distinguish event, host, winner and edition. Update close to the exam using current primary sources.',
    trap: 'Do not treat an old mock’s “latest” answer as current. Social posts and headlines may omit context. Never memorise a ranking or officeholder without noting its date and source.', example: { question: 'What four fields should a current-affairs note always include?', steps: ['Identify the claim/event.', 'Record when it happened and who was involved.', 'Save a trustworthy source and one-line significance.'], answer: 'Event, people/organisation, date, and source/context' } }),
  // Innovation & Entrepreneurship: venture concepts, finance, markets, policy and intellectual property.
  deepTopic({ id: 'ie-1', dayNumber: 9, subject: 'Innovation & Entrepreneurship', title: 'Entrepreneurship, Opportunity & Business Models', summary: 'Move from customer problem to value proposition, business model and measurable validation.', keyConcepts: ['Customer problem', 'Value proposition', 'Business model', 'Revenue and costs'], estimatedMinutes: 50,
    foundation: 'Entrepreneurship organises resources under uncertainty to create value. A business model explains who the customer is, what value is offered, how it is delivered and how the venture earns more than it spends. A problem is not yet an opportunity until a reachable customer values a solution.',
    method: 'State the target user and unmet need; test whether the need is frequent, urgent and costly. Map channels, key activities, partners, revenue streams and cost drivers. Write assumptions explicitly and test the riskiest one with customer interviews or a small experiment.',
    examUse: 'A subscription app may create value through convenience, deliver via mobile software and earn recurring revenue. The key question is whether retention and willingness to pay exceed acquisition, support and delivery costs.',
    trap: 'A clever product is not automatically a viable business. Do not confuse revenue with profit or a user with a paying customer. Validate real behaviour, not only compliments or hypothetical interest.', example: { question: 'What is the first question in validating a startup idea?', steps: ['Name a specific user group.', 'Describe a costly or frequent problem they face.', 'Check evidence that they already spend time or money solving it.'], answer: 'Who has the problem, and what evidence shows they need a solution?' } }),
  deepTopic({ id: 'ie-lean-mvp-innovation', dayNumber: 9, subject: 'Innovation & Entrepreneurship', title: 'Innovation, Design Thinking & Lean Startup', summary: 'Use user research, prototypes, MVP experiments and learning loops to reduce uncertainty.', keyConcepts: ['Empathy and problem framing', 'Prototype', 'MVP', 'Build-measure-learn'], estimatedMinutes: 50,
    foundation: 'Innovation can improve a product, process, service or business model. Design thinking starts with users and reframes the real problem. An MVP is the smallest experiment that tests a key assumption; it is not simply a low-quality final product.',
    method: 'Observe users, define a narrow problem, generate alternatives, prototype cheaply and test. In Lean Startup, build a test, measure meaningful behaviour, and learn whether to persevere or pivot. Choose a metric linked to the assumption, not a vanity metric.',
    examUse: 'Before building a full delivery platform, a founder can manually match a few customers and providers. If customers repeat and providers fulfil reliably, the evidence supports further investment; if not, the team learns where the model fails.',
    trap: 'Downloads and page views may not show value. A pivot changes a core hypothesis based on learning; it is not random feature switching. Collect consent and avoid experiments that mislead or harm users.', example: { question: 'What does an MVP primarily test?', steps: ['Identify one risky business assumption.', 'Design the smallest safe experiment that can produce evidence.', 'Measure actual user behaviour against a success threshold.'], answer: 'Whether a key assumption is supported by evidence' } }),
  deepTopic({ id: 'ie-funding-finance', dayNumber: 9, subject: 'Innovation & Entrepreneurship', title: 'Startup Finance, Funding Stages & Unit Economics', summary: 'Compare bootstrapping, debt, angels, VC and grants; understand runway, burn and contribution margin.', keyConcepts: ['Bootstrapping', 'Equity and debt', 'Runway', 'Unit economics'], estimatedMinutes: 55,
    foundation: 'Bootstrapping uses founder resources and operating revenue. Debt must be repaid with interest; equity sells ownership and usually some control. Angels invest personal capital, while venture funds invest pooled capital in ventures with high-growth potential.',
    method: 'Runway = available cash ÷ monthly net burn, using consistent periods. Contribution margin per unit = selling price minus variable cost. Compare funding by amount, cost, dilution, repayment obligations, control and fit with the business stage.',
    examUse: 'Venture capital is private equity invested in high-risk, high-growth ventures, often from seed or early stages; it is not a guaranteed-return deposit or a loan. A startup with ₹24 lakh cash and monthly net burn of ₹3 lakh has about 8 months of runway. If each order earns ₹500 and variable costs are ₹350, contribution is ₹150 before fixed costs.',
    trap: 'Valuation is not cash in the bank. Funding received is not revenue. Gross margin, contribution margin and net profit differ. A high-growth venture can still fail if it runs out of cash before reaching sustainable economics.', example: { question: 'A startup has ₹12 lakh cash and burns ₹2 lakh/month. Estimate runway.', steps: ['Use the cash available.', 'Divide by monthly net burn.', '12/2 = 6 months, assuming burn stays constant.'], answer: 'Approximately 6 months' } }),
  deepTopic({ id: 'ie-marketing-growth', dayNumber: 9, subject: 'Innovation & Entrepreneurship', title: 'Marketing, Segmentation & Go-to-Market', summary: 'Choose a target segment, position an offer and track acquisition, conversion and retention.', keyConcepts: ['Segmentation', 'Target market', 'Positioning', 'Customer acquisition and retention'], estimatedMinutes: 50,
    foundation: 'Segmentation groups customers with similar needs. Targeting selects the group a venture can serve; positioning states why that group should choose it. A go-to-market plan links product, price, channel and promotion to the customer’s buying process.',
    method: 'Define the ideal customer, alternatives they use, purchase trigger and decision-maker. Test one acquisition channel at a time. Track conversion and retention by cohort; compare customer acquisition cost with lifetime contribution, not just revenue.',
    examUse: 'A low-cost accounting tool for independent shops might acquire customers through accountant referrals. If referrals bring customers who remain longer and cost less than paid ads, that channel may be the stronger fit.',
    trap: '“Everyone” is not a useful target segment. High awareness is not the same as conversion or retention. A large lifetime-value estimate is misleading if churn, gross margin and service costs are ignored.', example: { question: 'Name the four classic elements of the marketing mix.', steps: ['Identify what is offered.', 'How it is priced and made available.', 'How customers learn about it.'], answer: 'Product, price, place and promotion' } }),
  deepTopic({ id: 'ie-ipr-schemes', dayNumber: 9, subject: 'Innovation & Entrepreneurship', title: 'Intellectual Property, Startup Policy & Ethics', summary: 'Distinguish patents, trademarks and copyright; understand policy support and responsible venture practice.', keyConcepts: ['Patent', 'Trademark', 'Copyright', 'Startup support and ethics'], estimatedMinutes: 50,
    foundation: 'A patent protects a qualifying invention for a limited term under applicable law. A trademark identifies the source of goods or services. Copyright protects original expression, not the underlying idea. Trade secrets protect confidential business information while secrecy is maintained.',
    method: 'Match the asset to the protection: technical invention→patent; brand name/logo→trademark; original text/art/software expression→copyright; confidential formula/process→trade secret. For government schemes, verify purpose, eligibility, implementing body and current rules from official sources.',
    examUse: 'A startup may trademark its brand, copyright its original marketing copy and code expression, and evaluate patent protection for a novel technical invention. It must also obtain consent, protect personal data and avoid deceptive claims.',
    trap: 'Do not say a copyright protects an abstract idea or that every startup automatically qualifies for benefits. Scheme names and eligibility can change. Protection differs by jurisdiction; legal registration and enforcement steps are not interchangeable.', example: { question: 'Which IP category is primarily used to protect a distinctive brand name?', steps: ['A brand name identifies the commercial source.', 'Source identifiers are the function of trademarks.', 'A patent protects inventions instead.'], answer: 'Trademark' } }),
];

const deepById = new Map(DEEP_TOPICS.map((topic) => [topic.id, topic]));
export const TOPICS: Topic[] = [
  ...STARTER_TOPICS.map((topic) => deepById.get(topic.id) || topic),
  ...DEEP_TOPICS.filter((topic) => !STARTER_TOPICS.some((starter) => starter.id === topic.id)),
].sort((a, b) => a.dayNumber - b.dayNumber);

export const QUIZZES: Quiz[] = [
  {
    id: 'quiz-qt-1', title: 'Percentages Drill', subtitle: 'Topic quiz · Quant', subject: 'Quantitative Techniques', topicId: 'qt-1',
    examFormat: 'topic_quiz', timeLimitMinutes: 12, passingPercent: 50,
    questions: [
      { id: 'q1', questionText: 'What is 20% of 150?', options: ['20', '30', '25', '35'], correctOptionIndex: 1, explanation: '0.2 × 150 = 30.' },
      { id: 'q2', questionText: 'A price rises 10% then falls 10%. Net change?', options: ['0%', '−1%', '+1%', '−10%'], correctOptionIndex: 1, explanation: '1.1 × 0.9 = 0.99 → −1%.' },
      { id: 'q3', questionText: 'SP is ₹120 after 20% profit. CP is?', options: ['₹100', '₹96', '₹144', '₹110'], correctOptionIndex: 0, explanation: 'CP = 120 / 1.2 = 100.' },
    ],
  },
  {
    id: 'quiz-lr-1', title: 'Blood Relations Drill', subtitle: 'Topic quiz · LR', subject: 'Logical Reasoning', topicId: 'lr-1',
    examFormat: 'topic_quiz', timeLimitMinutes: 10, passingPercent: 50,
    questions: [
      { id: 'q1', questionText: 'A is B’s brother. C is A’s mother. How is C related to B?', options: ['Sister', 'Mother', 'Aunt', 'Grandmother'], correctOptionIndex: 1, explanation: 'C is mother of both.' },
      { id: 'q2', questionText: 'His mother is the only daughter of my mother. The man is her?', options: ['Brother', 'Son', 'Uncle', 'Father'], correctOptionIndex: 1, explanation: 'Man is her son.' },
    ],
  },
  {
    id: 'quiz-sectional-qt', title: 'Quant Sectional', subtitle: 'Sectional style', subject: 'Quantitative Techniques', topicId: 'qt-1',
    examFormat: 'sectional', timeLimitMinutes: 20, passingPercent: 50,
    questions: [
      { id: 'q1', questionText: 'Average of 5 numbers is 20. One number 30 removed. New average?', options: ['17.5', '18', '16', '19'], correctOptionIndex: 0, explanation: '70/4 = 17.5.' },
      { id: 'q2', questionText: 'SI on ₹1000 at 10% for 2 years?', options: ['₹200', '₹100', '₹220', '₹180'], correctOptionIndex: 0, explanation: 'P×R×T/100 = 200.' },
      { id: 'q3', questionText: 'Ratio 2:3; +4 each → 3:4. Original numbers?', options: ['8 and 12', '6 and 9', '4 and 6', '10 and 15'], correctOptionIndex: 0, explanation: 'x=4 → 8 and 12.' },
    ],
  },
];
