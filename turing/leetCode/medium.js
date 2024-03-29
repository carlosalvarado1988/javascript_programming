/* You start with an initial power of power, C
an initial score of 0, and a bag of tokens given as an integer array tokens, 
where each tokens[i] denotes the value of tokeni.

Your goal is to maximize the total score by strategically playing these tokens. 
In one move, you can play an unplayed token in one of the two ways 
(but not both for the same token):

Face-up: If your current power is at least tokens[i], you may play tokeni, losing tokens[i] power and gaining 1 score.
Face-down: If your current score is at least 1, you may play tokeni, gaining tokens[i] power and losing 1 score.
Return the maximum possible score you can achieve after playing any number of tokens.


Example 1:

Input: tokens = [100], power = 50

Output: 0

Explanation: Since your score is 0 initially, you cannot play the token face-down. You also cannot play it face-up since your power (50) is less than tokens[0] (100).

Example 2:

Input: tokens = [200,100], power = 150

Output: 1

Explanation: Play token1 (100) face-up, reducing your power to 50 and increasing your score to 1.

There is no need to play token0, since you cannot play it face-up to add to your score. The maximum score achievable is 1.

Example 3:

Input: tokens = [100,200,300,400], power = 200

Output: 2

Explanation: Play the tokens in this order to get a score of 2:

Play token0 (100) face-up, reducing power to 100 and increasing score to 1.
Play token3 (400) face-down, increasing power to 500 and reducing score to 0.
Play token1 (200) face-up, reducing power to 300 and increasing score to 1.
Play token2 (300) face-up, reducing power to 0 and increasing score to 2.
The maximum score achievable is 2.

 

Constraints:

0 <= tokens.length <= 1000
0 <= tokens[i], power < 104

*/
export const bagOfTokensScore = function (tokens, power) {
  // iterate on tokens
  let iterations = tokens.length;

  let tokensArray = tokens.sort();
  let score = 0;
  const scoreTrack = [0];

  while (iterations > 0) {
    let minValue = Math.min(...tokensArray); // try to point 0
    let maxValue = Math.max(...tokensArray); // try to point .length
    // let minValue = tokensArray[0];
    // let maxValue = tokensArray[tokensArray.length - 1];
    // strategy:
    // attemp face-up first: compare current power to the min value on tokens.
    // face up - power >= tokens[i], power -= tokens[i], score += 1
    if (power > 0 && power >= minValue) {
      // you can do face up
      power -= minValue;
      score += 1;
      scoreTrack.push(score);

      // remove minValue from tokensArray
      const indexToRemove = tokensArray.indexOf(minValue);
      tokensArray.splice(indexToRemove, 1);
    }
    // attemp face-down if possible: take max value in tokens to add power and decrese scrore by 1
    // face down - score >= 1, power += tokens[i], score -= 1
    else if (score >= 1 && tokensArray.length > 0) {
      power += maxValue;
      score -= 1;
      scoreTrack.push(score);
      const indexToRemove = tokensArray.indexOf(maxValue);
      tokensArray.splice(indexToRemove, 1);
    }
    iterations--;
  }

  // here we are interested in the maximun score posible,
  // it let the algorithm to continue explore all posible card play
  // to find if another higher score is found
  return Math.max(...scoreTrack);
};

export const bagOfTokensScoreMutatingParamArray = function (tokens, power) {
  // order items
  tokens.sort();

  // max iterate on tokens to only try unplayed
  let iterations = tokens.length;

  let score = 0;
  const scoreTrack = [score];

  while (iterations > 0) {
    // let minValue = Math.min(...tokens); // try to point 0
    // let maxValue = Math.max(...tokens); // try to point .length

    let minValue = tokens[0];
    let maxValue = tokens[tokens.length - 1];
    // strategy:
    // attemp face-up first: compare current power to the min value on tokens.
    // face up - power >= tokens[i], power -= tokens[i], score += 1
    if (power > 0 && power >= tokens[0]) {
      // you can do face up
      power -= tokens[0];
      score += 1;
      scoreTrack.push(score);

      // remove minValue from tokensArray
      // const indexToRemove = tokensArray.indexOf(minValue);
      // tokensArray.splice(indexToRemove, 1);
      tokens.splice(0, 1);
    }
    // attemp face-down if possible: take max value in tokens to add power and decrese scrore by 1
    // face down - score >= 1, power += tokens[i], score -= 1
    else if (score >= 1 && tokens.length > 0) {
      power += tokens[tokens.length - 1];
      score -= 1;
      scoreTrack.push(score);
      // const indexToRemove = tokensArray.indexOf(maxValue);
      // tokensArray.splice(indexToRemove, 1);
      tokens.splice(tokens.length - 1, 1);
    }
    iterations--;
  }

  // here we are interested in the maximun score posible,
  // it let the algorithm to continue explore all posible card play
  // to find if another higher score is found
  return Math.max(...scoreTrack);
};

export function maxScoreChatGPT(tokens, power) {
  // We first sort the tokens array to optimize our strategy.
  // We iterate through the array using two pointers (left and right).
  // We check if we can play the token face-up (incrementing score and decrementing power) or face-down (incrementing power and decrementing score) based on the current values of power and score.
  // We continue this process until we can't make any more moves.
  // Finally, we return the maximum score achieved.

  // This soluion fails in test #2, it finishig taking score from 1 to 0.
  // the maximun possible was 1, but this algorithm runs all to the final while iteration to bring score = 0
  //

  tokens.sort((a, b) => a - b); // Sort tokens to optimize the strategy
  let score = 0;
  let left = 0;
  let right = tokens.length - 1;

  // adding the tracking score, not included in ChatGPT solution
  const trackingScore = [score];

  while (left <= right) {
    if (power >= tokens[left]) {
      power -= tokens[left];
      score++;
      left++;
    } else if (score > 0) {
      power += tokens[right];
      score--;
      right--;
    } else {
      break; // No more moves possible
    }
    trackingScore.push(score);
  }

  // return score;
  return Math.max(...trackingScore);
}

/*
  You are playing a video game where you are defending your city from a group of n monsters. You are given a 0-indexed integer array dist of size n, where dist[i] is the initial distance in kilometers of the ith monster from the city.

  The monsters walk toward the city at a constant speed. The speed of each monster is given to you in an integer array speed of size n, where speed[i] is the speed of the ith monster in kilometers per minute.

  You have a weapon that, once fully charged, can eliminate a single monster. However, the weapon takes one minute to charge. The weapon is fully charged at the very start.

  You lose when any monster reaches your city. If a monster reaches the city at the exact moment the weapon is fully charged, it counts as a loss, and the game ends before you can use your weapon.

  Return the maximum number of monsters that you can eliminate before you lose, or n if you can eliminate all the monsters before they reach the city.

  Example 1:

Input: dist = [1,3,4], speed = [1,1,1]
Output: 3
Explanation:
In the beginning, the distances of the monsters are [1,3,4]. You eliminate the first monster.
After a minute, the distances of the monsters are [X,2,3]. You eliminate the second monster.
After a minute, the distances of the monsters are [X,X,2]. You eliminate the third monster.
All 3 monsters can be eliminated.
Example 2:

Input: dist = [1,1,2,3], speed = [1,1,1,1]
Output: 1
Explanation:
In the beginning, the distances of the monsters are [1,1,2,3]. You eliminate the first monster.
After a minute, the distances of the monsters are [X,0,1,2], so you lose.
You can only eliminate 1 monster.
Example 3:

Input: dist = [3,2,4], speed = [5,3,2]
Output: 1
Explanation:
In the beginning, the distances of the monsters are [3,2,4]. You eliminate the first monster.
After a minute, the distances of the monsters are [X,0,2], so you lose.
You can only eliminate 1 monster.


n == dist.length == speed.length
1 <= n <= 105
1 <= dist[i], speed[i] <= 105
  */
export const eliminateMaximum = function (dist, speed) {
  // dsit[i] = distance in kms of the i monster
  // speed is an array: speed[i] for each i monster in kilometers per minute.

  // weapon takes one minute to charge
  // If a monster reaches the city at the exact moment the weapon is fully charged,
  // it counts as a loss, and the game ends before you can use your weapon.

  // Return the maximum number of monsters that you can eliminate before you lose, or n if you can
  // eliminate all the monsters before they reach the city.

  const n = dist.length;
  let eliminated = 0;

  for (let i = 0; i <= n - 1; i++) {
    dist[0] = "100";
    eliminated++;
    for (let j = 1; j <= n - 1; j++) {
      dist[j] -= speed[j];
    }
    if (Math.min(...dist) <= 0) return eliminated;
  }
  return eliminated;
};
