/* MAP() hasmaps take care of converting any input into a key that represents
an index in the memory.
this conversion needs to happen within the limits or boundaries of the 
data structure like an array.

lets say the array 100 spaces.
indexes can be only from 1 - 99.

any larger number needs to be reduced to any 1 - 99.
for that we use the module number % (remainder of division of the target number)

so if a key is 1080, its index is set to 1080 % 100 = 80
index will be 80.
the same way any character is binary converted to a number.

HOLA = any12412321 % 100 = (any within 1 - 99)




EXERCISES:
Exercises
1- Find the most repeated element in an array of integers. 
What is the time complexity of this method? 
(A variation of this exercise is finding the most repeated word 
    in a sentence. The algorithm is the same. 
    Here we use an array of numbers for simplicity.)  
    Input: [1, 2, 2, 3, 3, 3, 4] 
    Output: 3 
    Solution: HashTableExercises.mostFrequent() 
    
2- Given an array of integers, count the number of unique pairs of
 integers that have difference k. 
 Input: [1, 7, 5, 9, 2, 12, 3] 
 K=2 
 Output: 4 
 We have four pairs with difference 2: (1, 3), (3, 5), (5, 7), (7, 9). 
 Note that we only want the number of these pairs, 
 not the pairs themselves. 
 Solution: HashTableExercises.countPairsWithDiff()

 3- Given an array of integers, return indices of the
  two numbers such that they add up to a specific target.
  Input: [2, 7, 11, 15] - target = 9O
  utput: [0, 1] (because 2 + 7 = 9)
  Assume that each input has exactly one solution, 
  and you may not use the same element twice.
  olution: HashTableExercises.twoSum()

  4- Build a hash table from scratch. 
  Use linear probing strategy for handling collisions. 
  Implement the following operations:  
  -put(int, String) 
  -get(int) 
  -remove(int) 
  -size() 
  Solution: HashMap 

*/
